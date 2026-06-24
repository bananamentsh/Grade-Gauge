"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

const ACCENTS = ["rose", "sky", "amber", "emerald", "violet", "blue"];

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40) || "class"
  );
}

function inviteCode(): string {
  return randomUUID().replace(/-/g, "").slice(0, 10);
}

export async function createClass(
  _prevState: { error: string | null },
  formData: FormData
) {
  const name = (formData.get("name") as string)?.trim();
  const subject = (formData.get("subject") as string)?.trim();
  const code = (formData.get("code") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;

  if (!name || !subject || !code) {
    return { error: "Name, subject, and class code are all required." };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { error: "You need to be signed in to create a class." };
  }

  const classId = randomUUID();
  const baseSlug = slugify(name);
  const slug = `${baseSlug}-${classId.slice(0, 6)}`;
  const accent = ACCENTS[Math.floor(Math.random() * ACCENTS.length)];

  const { error: classError } = await supabase.from("classes").insert({
    id: classId,
    slug,
    name,
    subject,
    code,
    description,
    accent,
    member_count: 1,
    invite_code: inviteCode(),
  });

  if (classError) {
    return { error: `Failed to create class: ${classError.message}` };
  }

  const { error: membershipError } = await supabase.from("memberships").insert({
    user_id: userData.user.id,
    class_id: classId,
    is_admin: true,
  });

  if (membershipError) {
    return { error: `Class created, but failed to add you as admin: ${membershipError.message}` };
  }

  redirect(`/c/${slug}`);
}

export async function regenerateInviteCode(classId: string, classSlug: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("classes")
    .update({ invite_code: inviteCode() })
    .eq("id", classId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/c/${classSlug}`);
  return { error: null };
}
