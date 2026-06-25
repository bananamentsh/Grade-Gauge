// Grade labels are free text, set by whoever creates the assessment
// (e.g. "A", "B", "Pass", "Fail") so they're just strings, not a fixed enum.
export type Grade = string;

export interface GradeBand {
  grade: Grade;
  min: number;
  max: number;
  description: string;
}

export interface ClassPage {
  id: string;
  slug: string;
  name: string;
  subject: string;
  code: string;
  memberCount: number;
  description: string;
  accent: string;
  inviteCode: string;
}

export interface Assessment {
  id: string;
  slug: string;
  classId: string;
  classSlug: string;
  title: string;
  type: string;
  topic: string;
  dueDate: string;
  weighting: string;
  markedOutOf: number;
  passThreshold: number;
  usesLetterGrades: boolean;
  gradingScale?: GradeBand[];
  description: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  createdAt: string;
}

export interface Submission {
  id: string;
  userId?: string | null;
  studentName: string;
  anonymous: boolean;
  marker: string;
  score: number;
  grade: Grade | null;
  feedback?: string | null;
  responseExcerpt?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  submittedAt: string;
}
