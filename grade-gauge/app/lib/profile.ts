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
