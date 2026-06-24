"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { getMembershipRole } from "../profile";
import { Grade, GradeBand } from "../types";

const GRADES: Grade[] = ["A", "B", "C", "D", "E", "0"];

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40) || "assessment"
  );
}

function parseGradingScale(formData: FormData): GradeBand[] | null {
  const bands: GradeBand[] = [];

  for (const grade of GRADES) {
    const minRaw = (formData.get(`grade_${grade}_min`) as string)?.trim();
    const maxRaw = (formData.get(`grade_${grade}_max`) as string)?.trim();
    if (!minRaw || !maxRaw) continue;

    const min = Number(minRaw);
    const max = Number(maxRaw);
    if (Number.isNaN(min) || Number.isNaN(max)) continue;

    bands.push({
      grade,
      min,
      max,
      description: ((formData.get(`grade_${grade}_desc`) as string) ?? "").trim(),
    });
  }

  return bands.length > 0 ? bands : null;
}

export interface CreateAssessmentState {
  error: string | null;
}

export async function createAssessment(
  _prevState: CreateAssessmentState,
  formData: FormData
): Promise<CreateAssessmentState> {
  const classId = formData.get("classId") as string;
  const classSlug = formData.get("classSlug") as string;
  const title = (formData.get("title") as string)?.trim();
  const type = (formData.get("type") as string)?.trim();
  const topic = (formData.get("topic") as string)?.trim();
  const dueDate = (formData.get("dueDate") as string)?.trim() || null;
  const weighting = (formData.get("weighting") as string)?.trim() || null;
  const markedOutOfRaw = (formData.get("markedOutOf") as string)?.trim();
  const passThresholdRaw = (formData.get("passThreshold") as string)?.trim();
  const usesLetterGrades = formData.get("usesLetterGrades") === "on";
  const description = (formData.get("description") as string)?.trim() || null;
  const attachment = formData.get("attachment") as File | null;

  if (!classId || !classSlug) {
    return { error: "Missing class context. Reload the page and try again." };
  }
  if (!title || !type || !topic || !markedOutOfRaw || !passThresholdRaw) {
    return { error: "Title, type, topic, marked out of, and pass threshold are all required." };
  }

  const markedOutOf = Number(markedOutOfRaw);
  const passThreshold = Number(passThresholdRaw);
  if (!Number.isFinite(markedOutOf) || markedOutOf <= 0) {
    return { error: "Marked out of must be a positive number." };
  }
  if (!Number.isFinite(passThreshold) || passThreshold < 0) {
    return { error: "Pass threshold must be a non-negative number." };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { error: "You need to be signed in to add an assessment." };
  }

  const { isAdmin } = await getMembershipRole(classId);
  if (!isAdmin) {
    return { error: "Only the class admin can add assessments." };
  }

  const assessmentId = randomUUID();
  const slug = `${slugify(title)}-${assessmentId.slice(0, 6)}`;
  const gradingScale = usesLetterGrades ? parseGradingScale(formData) : null;

  let attachmentPath: string | null = null;
  let attachmentName: string | null = null;

  if (attachment && attachment.size > 0) {
    const path = `${classId}/assessments/${randomUUID()}-${attachment.name}`;
    const { error: uploadError } = await supabase.storage.from("attachments").upload(path, attachment);
    if (uploadError) {
      return { error: `Failed to upload attachment: ${uploadError.message}` };
    }
    attachmentPath = path;
    attachmentName = attachment.name;
  }

  const { error } = await supabase.from("assessments").insert({
    id: assessmentId,
    slug,
    class_id: classId,
    title,
    type,
    topic,
    due_date: dueDate,
    weighting,
    marked_out_of: markedOutOf,
    pass_threshold: passThreshold,
    uses_letter_grades: usesLetterGrades,
    grading_scale: gradingScale,
    description,
    attachment_path: attachmentPath,
    attachment_name: attachmentName,
  });

  if (error) {
    return { error: `Failed to create assessment: ${error.message}` };
  }

  revalidatePath(`/c/${classSlug}`);
  redirect(`/c/${classSlug}/a/${slug}`);
}
