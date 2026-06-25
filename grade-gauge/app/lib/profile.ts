import { createClient } from "./supabase/server";

export interface Profile {
  id: string;
  username: string | null;
  displayName: string | null;
  email: string | null;
}

export async function getCurrentProfile(): Promise<Profile | undefined> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return undefined;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, email")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load profile: ${error.message}`);
  }

  if (!data) {
    return undefined;
  }

  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    email: data.email,
  };
}

export async function getMembershipRole(
  classId: string
): Promise<{ isMember: boolean; isAdmin: boolean }> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { isMember: false, isAdmin: false };
  }

  const { data, error } = await supabase
    .from("memberships")
    .select("is_admin")
    .eq("class_id", classId)
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load membership: ${error.message}`);
  }

  return { isMember: !!data, isAdmin: !!data?.is_admin };
}

export interface ClassAdmin {
  username: string | null;
  displayName: string | null;
  email: string | null;
}

export async function getClassAdmin(classId: string): Promise<ClassAdmin | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("memberships")
    .select("profiles(username, display_name, email)")
    .eq("class_id", classId)
    .eq("is_admin", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load class admin: ${error.message}`);
  }

  const profile = (data?.profiles ?? null) as
    | { username: string | null; display_name: string | null; email: string | null }
    | null;

  if (!profile) {
    return undefined;
  }

  return {
    username: profile.username,
    displayName: profile.display_name,
    email: profile.email,
  };
}

export interface ProfileStats {
  classCount: number;
  submissionCount: number;
}

export async function getProfileStats(userId: string): Promise<ProfileStats> {
  const supabase = await createClient();

  const [{ count: classCount, error: classError }, { count: submissionCount, error: subError }] =
    await Promise.all([
      supabase.from("memberships").select("*", { count: "exact", head: true }).eq("user_id", userId),
      supabase.from("submissions").select("*", { count: "exact", head: true }).eq("user_id", userId),
    ]);

  if (classError) {
    throw new Error(`Failed to load class count: ${classError.message}`);
  }
  if (subError) {
    throw new Error(`Failed to load submission count: ${subError.message}`);
  }

  return { classCount: classCount ?? 0, submissionCount: submissionCount ?? 0 };
}
