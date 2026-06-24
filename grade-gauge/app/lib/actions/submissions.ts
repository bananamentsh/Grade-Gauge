"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { getCurrentProfile, getMembershipRole } from "../profile";
import { getAssessmentBySlug } from "../classes";
import { Grade } from "../types";

export interface CreateSubmissionState {
  error: string | null;
  success: boolean;
}

function deriveGrade(score: number, gradingScale: { grade: Grade; min: number; max: number }[] | undefined): Grade | null {
  if (!gradingScale) return null;
  const band = gradingScale.find((b) => score >= b.min && score <= b.max);
  return band?.grade ?? null;
}

export async function createSubmission(
  _prevState: CreateSubmissionState,
  formData: FormData
): Promise<CreateSubmissionState> {
  const classId = formData.get("classId") as string;
  const classSlug = formData.get("classSlug") as string;
  const assessmentId = formData.get("assessmentId") as string;
  const assessmentSlug = formData.get("assessmentSlug") as string;
  const marker = (formData.get("marker") as string)?.trim();
  const scoreRaw = (formData.get("score") as string)?.trim();
  const feedback = (formData.get("feedback") as string)?.trim() || null;
  const responseExcerpt = (formData.get("responseExcerpt") as string)?.trim() || null;
  const anonymous = formData.get("anonymous") === "on";
  const file = formData.get("file") as File | null;

  if (!classId || !classSlug || !assessmentId || !assessmentSlug) {
    return { error: "Missing assessment context. Reload the page and try again.", success: false };
  }
  if (!marker || !scoreRaw) {
    return { error: "Marker and score are required.", success: false };
  }

  const score = Number(scoreRaw);
  if (!Number.isFinite(score) || score < 0) {
    return { error: "Score must be a non-negative number.", success: false };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { error: "You need to be signed in to post a submission.", success: false };
  }

  const { isMember } = await getMembershipRole(classId);
  if (!isMember) {
    return { error: "Only members of this class can post submissions.", success: false };
  }

  const [profile, assessment] = await Promise.all([
    getCurrentProfile(),
    getAssessmentBySlug(classSlug, assessmentSlug),
  ]);

  if (!assessment) {
    return { error: "Couldn't find that assessment.", success: false };
  }
  if (score > assessment.markedOutOf) {
    return { error: `Score can't be higher than ${assessment.markedOutOf}.`, success: false };
  }

  const studentName = profile?.displayName || profile?.username || profile?.email || "Member";
  const grade = assessment.usesLetterGrades ? deriveGrade(score, assessment.gradingScale) : null;

  let filePath: string | null = null;
  let fileName: string | null = null;

  if (file && file.size > 0) {
    const path = `${classId}/submissions/${randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("attachments").upload(path, file);
    if (uploadError) {
      return { error: `Failed to upload file: ${uploadError.message}`, success: false };
    }
    filePath = path;
    fileName = file.name;
  }

  const { error } = await supabase.from("submissions").insert({
    id: randomUUID(),
    assessment_id: assessmentId,
    student_name: studentName,
    anonymous,
    marker,
    score,
    grade,
    feedback,
    response_excerpt: responseExcerpt,
    user_id: userData.user.id,
    file_path: filePath,
    file_name: fileName,
  });

  if (error) {
    return { error: `Failed to post submission: ${error.message}`, success: false };
  }

  revalidatePath(`/c/${classSlug}/a/${assessmentSlug}`);
  return { error: null, success: true };
}
