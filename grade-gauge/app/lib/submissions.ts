import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";
import { Grade, Submission } from "./types";

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour

interface SubmissionRow {
  id: string;
  assessment_id: string;
  user_id: string | null;
  student_name: string;
  anonymous: boolean;
  marker: string;
  score: number;
  grade: Grade | null;
  feedback: string | null;
  response_excerpt: string | null;
  file_path: string | null;
  file_name: string | null;
  submitted_at: string;
}

async function mapSubmission(supabase: SupabaseClient, row: SubmissionRow): Promise<Submission> {
  let fileUrl: string | null = null;
  if (row.file_path) {
    const { data } = await supabase.storage
      .from("attachments")
      .createSignedUrl(row.file_path, SIGNED_URL_TTL_SECONDS);
    fileUrl = data?.signedUrl ?? null;
  }

  return {
    id: row.id,
    userId: row.user_id,
    studentName: row.student_name,
    anonymous: row.anonymous,
    marker: row.marker,
    score: row.score,
    grade: row.grade,
    feedback: row.feedback,
    responseExcerpt: row.response_excerpt,
    fileUrl,
    fileName: row.file_name,
    submittedAt: row.submitted_at,
  };
}

export async function getSubmissionsForAssessment(assessmentId: string): Promise<Submission[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("assessment_id", assessmentId)
    .order("submitted_at");

  if (error) {
    throw new Error(`Failed to load submissions for assessment "${assessmentId}": ${error.message}`);
  }

  return Promise.all((data as SubmissionRow[]).map((row) => mapSubmission(supabase, row)));
}
