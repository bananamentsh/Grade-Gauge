"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export interface ClassPreview {
  id: string;
  slug: string;
  name: string;
  subject: string;
}

export async function getClassPreviewByInviteCode(code: string): Promise<ClassPreview | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_class_preview_by_invite_code", {
    p_code: code,
  });

  if (error) {
    throw new Error(`Failed to look up invite: ${error.message}`);
  }

  const row = (data as ClassPreview[] | null)?.[0];
  return row ?? null;
}

export async function getOwnJoinRequestStatus(
  classId: string
): Promise<"pending" | "approved" | "denied" | null> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return null;
  }

  const { data, error } = await supabase
    .from("join_requests")
    .select("status")
    .eq("class_id", classId)
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load join request status: ${error.message}`);
  }

  return (data?.status as "pending" | "approved" | "denied" | undefined) ?? null;
}

export interface JoinRequestState {
  error: string | null;
  alreadyMember: boolean;
  alreadyRequested: boolean;
}

export async function requestToJoin(
  _prevState: JoinRequestState,
  formData: FormData
): Promise<JoinRequestState> {
  const classId = formData.get("classId") as string;
  const code = formData.get("code") as string;

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { error: "You need to be signed in to request access.", alreadyMember: false, alreadyRequested: false };
  }

  // Already a member? Nothing to do.
  const { data: existingMembership } = await supabase
    .from("memberships")
    .select("class_id")
    .eq("class_id", classId)
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (existingMembership) {
    return { error: null, alreadyMember: true, alreadyRequested: false };
  }

  const { error } = await supabase.from("join_requests").insert({
    id: randomUUID(),
    class_id: classId,
    user_id: userData.user.id,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: null, alreadyMember: false, alreadyRequested: true };
    }
    return {
      error: `Failed to send request: ${error.message}`,
      alreadyMember: false,
      alreadyRequested: false,
    };
  }

  revalidatePath(`/join/${code}`);
  return { error: null, alreadyMember: false, alreadyRequested: false };
}

export interface PendingJoinRequest {
  id: string;
  createdAt: string;
  userId: string;
  username: string | null;
  displayName: string | null;
  email: string | null;
}

export async function getPendingJoinRequests(classId: string): Promise<PendingJoinRequest[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("join_requests")
    .select("id, created_at, user_id, profiles!join_requests_user_id_fkey(username, display_name, email)")
    .eq("class_id", classId)
    .eq("status", "pending")
    .order("created_at");

  if (error) {
    throw new Error(`Failed to load join requests: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
    return {
      id: row.id,
      createdAt: row.created_at,
      userId: row.user_id,
      username: profile?.username ?? null,
      displayName: profile?.display_name ?? null,
      email: profile?.email ?? null,
    };
  });
}

export async function approveJoinRequest(requestId: string, classSlug: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("approve_join_request", { p_request_id: requestId });

  if (error) {
    throw new Error(`Failed to approve request: ${error.message}`);
  }

  revalidatePath(`/c/${classSlug}`);
}

export async function denyJoinRequest(requestId: string, classSlug: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("deny_join_request", { p_request_id: requestId });

  if (error) {
    throw new Error(`Failed to deny request: ${error.message}`);
  }

  revalidatePath(`/c/${classSlug}`);
}
