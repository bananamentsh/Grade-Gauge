import { createClient } from "./supabase/server";
import { Grade, Submission } from "./types";

interface SubmissionRow {
  id: string;
  assessment_id: string;
  student_name: string;
  anonymous: boolean;
  marker: string;
  score: number;
  grade: Grade | null;
  feedback: string | null;
  response_excerpt: string | null;
  submitted_at: string;
}

function mapSubmission(row: SubmissionRow): Submission {
  return {
    id: row.id,
    studentName: row.student_name,
    anonymous: row.anonymous,
    marker: row.marker,
    score: row.score,
    grade: row.grade,
    feedback: row.feedback,
    responseExcerpt: row.response_excerpt,
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

  return (data as SubmissionRow[]).map(mapSubmission);
}
