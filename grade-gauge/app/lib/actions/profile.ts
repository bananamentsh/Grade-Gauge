"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

// Anything but whitespace is allowed, including capitals, dashes and slashes.
const USERNAME_PATTERN = /^\S{3,20}$/;

export async function setUsername(
  _prevState: { error: string | null },
  formData: FormData
) {
  const raw = (formData.get("username") as string)?.trim();

  if (!raw || !USERNAME_PATTERN.test(raw)) {
    return {
      error: "Username must be 3-20 characters with no spaces.",
    };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { error: "You need to be signed in to set a username." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ username: raw })
    .eq("id", userData.user.id);

  if (error) {
    if (error.code === "23505") {
      return { error: "That username is already taken." };
    }
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/account");
  return { error: null };
}

export interface DeleteAccountState {
  error: string | null;
}

export async function deleteOwnAccount(
  _prevState: DeleteAccountState,
  formData: FormData
): Promise<DeleteAccountState> {
  void formData; // unused — useActionState requires this exact signature
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { error: "You need to be signed in to delete your account." };
  }

  // delete_own_account() is SECURITY DEFINER so it can remove the row from
  // auth.users, which the authenticated role can't touch directly. Profile,
  // memberships, and submissions cascade off that delete (see schema.sql).
  const { error } = await supabase.rpc("delete_own_account");

  if (error) {
    return { error: `Failed to delete account: ${error.message}` };
  }

  await supabase.auth.signOut();
  redirect("/login");
}
