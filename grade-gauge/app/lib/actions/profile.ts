"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/;

export async function setUsername(
  _prevState: { error: string | null },
  formData: FormData
) {
  const raw = (formData.get("username") as string)?.trim().toLowerCase();

  if (!raw || !USERNAME_PATTERN.test(raw)) {
    return {
      error: "Username must be 3-20 characters: lowercase letters, numbers, and underscores only.",
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
  return { error: null };
}
