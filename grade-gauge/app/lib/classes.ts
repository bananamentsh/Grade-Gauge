import { createClient } from "./supabase/server";
import { Assessment, ClassPage, GradeBand } from "./types";

interface ClassRow {
  id: string;
  slug: string;
  name: string;
  subject: string;
  code: string;
  member_count: number;
  description: string | null;
  accent: string;
  invite_code: string;
}

interface AssessmentRow {
  id: string;
  slug: string;
  class_id: string;
  title: string;
  type: string;
  topic: string;
  due_date: string | null;
  weighting: string | null;
  marked_out_of: number;
  pass_threshold: number;
  uses_letter_grades: boolean;
  grading_scale: GradeBand[] | null;
  description: string | null;
  created_at: string;
}

function mapClass(row: ClassRow): ClassPage {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    subject: row.subject,
    code: row.code,
    memberCount: row.member_count,
    description: row.description ?? "",
    accent: row.accent,
    inviteCode: row.invite_code,
  };
}

function mapAssessment(row: AssessmentRow, classSlug: string): Assessment {
  return {
    id: row.id,
    slug: row.slug,
    classSlug,
    title: row.title,
    type: row.type,
    topic: row.topic,
    dueDate: row.due_date ?? "",
    weighting: row.weighting ?? "",
    markedOutOf: row.marked_out_of,
    passThreshold: row.pass_threshold,
    usesLetterGrades: row.uses_letter_grades,
    gradingScale: row.grading_scale ?? undefined,
    description: row.description ?? "",
    createdAt: row.created_at,
  };
}

export async function getClasses(): Promise<ClassPage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("classes").select("*").order("name");

  if (error) {
    throw new Error(`Failed to load classes: ${error.message}`);
  }

  return (data as ClassRow[]).map(mapClass);
}

export async function getClassBySlug(slug: string): Promise<ClassPage | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("classes").select("*").eq("slug", slug).maybeSingle();

  if (error) {
    throw new Error(`Failed to load class "${slug}": ${error.message}`);
  }

  return data ? mapClass(data as ClassRow) : undefined;
}

export async function getAssessmentsForClass(classSlug: string): Promise<Assessment[]> {
  const classPage = await getClassBySlug(classSlug);
  if (!classPage) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("class_id", classPage.id)
    .order("created_at");

  if (error) {
    throw new Error(`Failed to load assessments for "${classSlug}": ${error.message}`);
  }

  return (data as AssessmentRow[]).map((row) => mapAssessment(row, classSlug));
}

export async function getAssessmentBySlug(
  classSlug: string,
  assessmentSlug: string
): Promise<Assessment | undefined> {
  const classPage = await getClassBySlug(classSlug);
  if (!classPage) {
    return undefined;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("class_id", classPage.id)
    .eq("slug", assessmentSlug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load assessment "${assessmentSlug}": ${error.message}`);
  }

  return data ? mapAssessment(data as AssessmentRow, classSlug) : undefined;
}

export async function getAssessmentIdBySlug(
  classSlug: string,
  assessmentSlug: string
): Promise<string | undefined> {
  const assessment = await getAssessmentBySlug(classSlug, assessmentSlug);
  return assessment?.id;
}
