-- ============================================================
-- Grade Gauge — Row Level Security Policies
-- Run AFTER schema.sql. Applies membership-based access control.
-- ============================================================

-- Helper functions (SECURITY DEFINER so they can read `memberships`
-- without triggering recursive RLS checks on that same table)
CREATE OR REPLACE FUNCTION is_member_of_class(p_class_id text) RETURNS boolean
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM memberships WHERE user_id = auth.uid() AND class_id = p_class_id);
$$;

CREATE OR REPLACE FUNCTION is_admin_of_class(p_class_id text) RETURNS boolean
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM memberships WHERE user_id = auth.uid() AND class_id = p_class_id AND is_admin = true);
$$;

CREATE OR REPLACE FUNCTION is_member_of_assessment_class(p_assessment_id text) RETURNS boolean
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM assessments a WHERE a.id = p_assessment_id AND is_member_of_class(a.class_id)
  );
$$;

REVOKE EXECUTE ON FUNCTION is_member_of_class(text) FROM anon;
REVOKE EXECUTE ON FUNCTION is_admin_of_class(text) FROM anon;
REVOKE EXECUTE ON FUNCTION is_member_of_assessment_class(text) FROM anon;

-- profiles: visible to any signed-in user (needed for admin lookup-by-username),
-- but you can only insert/update your own row.
CREATE POLICY "profiles_select_all" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE TO authenticated USING (id = auth.uid());
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());

-- memberships: see your own rows, or any row in a class you belong to.
-- NOTE: membership rows are only ever created by a class admin directly,
-- or by approve_join_request() (SECURITY DEFINER, bypasses this policy on
-- purpose). There is deliberately no self-insert clause — that previously
-- let any authenticated user join any class by guessing its id, bypassing
-- the invite/approval flow entirely. See join_requests below.
CREATE POLICY "memberships_select" ON memberships FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR is_member_of_class(class_id));
CREATE POLICY "memberships_insert_admin" ON memberships FOR INSERT TO authenticated
  WITH CHECK (is_admin_of_class(class_id));
CREATE POLICY "memberships_update_admin" ON memberships FOR UPDATE TO authenticated
  USING (is_admin_of_class(class_id));
CREATE POLICY "memberships_delete" ON memberships FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR is_admin_of_class(class_id));

-- classes: visible only to members. Any signed-in user can create one
-- (and should insert a matching admin membership row right after).
-- Only class admins can update.
CREATE POLICY "classes_select_members" ON classes FOR SELECT TO authenticated
  USING (is_member_of_class(id));
CREATE POLICY "classes_insert_any_authenticated" ON classes FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY "classes_update_admin" ON classes FOR UPDATE TO authenticated
  USING (is_admin_of_class(id));

-- assessments: visible to class members, managed by class admins only.
CREATE POLICY "assessments_select_members" ON assessments FOR SELECT TO authenticated
  USING (is_member_of_class(class_id));
CREATE POLICY "assessments_insert_admin" ON assessments FOR INSERT TO authenticated
  WITH CHECK (is_admin_of_class(class_id));
CREATE POLICY "assessments_update_admin" ON assessments FOR UPDATE TO authenticated
  USING (is_admin_of_class(class_id));
CREATE POLICY "assessments_delete_admin" ON assessments FOR DELETE TO authenticated
  USING (is_admin_of_class(class_id));

-- submissions: visible to class members, insertable by class members.
-- NOTE: no author/user_id column exists on submissions yet, so update/delete
-- policies are intentionally omitted — editing is blocked until that column
-- is added (planned for Phase 6: Submissions).
CREATE POLICY "submissions_select_members" ON submissions FOR SELECT TO authenticated
  USING (is_member_of_assessment_class(assessment_id));
CREATE POLICY "submissions_insert_members" ON submissions FOR INSERT TO authenticated
  WITH CHECK (is_member_of_assessment_class(assessment_id));

-- Lock down the pre-existing event-trigger helper function so it isn't
-- publicly callable via the REST API.
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon, authenticated;

-- ============================================================
-- Function EXECUTE grants — Postgres grants EXECUTE to PUBLIC by
-- default (and Supabase additionally auto-grants EXECUTE on new
-- public-schema functions directly to anon/authenticated), so the
-- REVOKEs above weren't sufficient on their own. Lock these all the
-- way down. `is_*` helpers must stay callable by `authenticated`
-- since RLS policies evaluate as that role.
-- ============================================================
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;

REVOKE EXECUTE ON FUNCTION public.is_member_of_class(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin_of_class(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_member_of_assessment_class(text) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.is_member_of_class(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_of_class(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_member_of_assessment_class(text) TO authenticated;

-- ============================================================
-- Invites / join requests (Phase 4)
-- classes.invite_code is a shareable per-class link. Following it does
-- NOT grant access — it creates a pending join_requests row that the
-- class admin must approve. Approval is done via approve_join_request(),
-- which is the only path (besides a direct admin insert) that can ever
-- write to memberships, since memberships_insert_admin above blocks
-- everyone else.
-- ============================================================
CREATE POLICY "join_requests_select_own_or_admin" ON join_requests FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR is_admin_of_class(class_id));
CREATE POLICY "join_requests_insert_own" ON join_requests FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "join_requests_update_admin" ON join_requests FOR UPDATE TO authenticated
  USING (is_admin_of_class(class_id));
CREATE POLICY "join_requests_delete_own_or_admin" ON join_requests FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR is_admin_of_class(class_id));

CREATE OR REPLACE FUNCTION approve_join_request(p_request_id text) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_class_id text;
  v_user_id uuid;
BEGIN
  SELECT class_id, user_id INTO v_class_id, v_user_id
  FROM join_requests WHERE id = p_request_id AND status = 'pending';

  IF v_class_id IS NULL THEN
    RAISE EXCEPTION 'Join request not found or already decided';
  END IF;

  IF NOT is_admin_of_class(v_class_id) THEN
    RAISE EXCEPTION 'Not authorized to approve requests for this class';
  END IF;

  INSERT INTO memberships (user_id, class_id, is_admin)
  VALUES (v_user_id, v_class_id, false)
  ON CONFLICT (user_id, class_id) DO NOTHING;

  UPDATE join_requests SET status = 'approved', decided_at = NOW(), decided_by = auth.uid()
  WHERE id = p_request_id;

  UPDATE classes SET member_count = member_count + 1 WHERE id = v_class_id;
END;
$$;

CREATE OR REPLACE FUNCTION deny_join_request(p_request_id text) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_class_id text;
BEGIN
  SELECT class_id INTO v_class_id FROM join_requests WHERE id = p_request_id AND status = 'pending';

  IF v_class_id IS NULL THEN
    RAISE EXCEPTION 'Join request not found or already decided';
  END IF;

  IF NOT is_admin_of_class(v_class_id) THEN
    RAISE EXCEPTION 'Not authorized to deny requests for this class';
  END IF;

  UPDATE join_requests SET status = 'denied', decided_at = NOW(), decided_by = auth.uid()
  WHERE id = p_request_id;
END;
$$;

CREATE OR REPLACE FUNCTION get_class_preview_by_invite_code(p_code text)
RETURNS TABLE(id text, slug text, name text, subject text)
LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT id, slug, name, subject FROM classes WHERE invite_code = p_code;
$$;

REVOKE EXECUTE ON FUNCTION approve_join_request(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION deny_join_request(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION get_class_preview_by_invite_code(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION approve_join_request(text) TO authenticated;
GRANT EXECUTE ON FUNCTION deny_join_request(text) TO authenticated;
GRANT EXECUTE ON FUNCTION get_class_preview_by_invite_code(text) TO authenticated;
