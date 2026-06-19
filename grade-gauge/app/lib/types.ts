export type Grade = "A" | "B" | "C" | "D" | "E" | "0";

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
}

export interface Assessment {
  id: string;
  slug: string;
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
  createdAt: string;
}

export interface Submission {
  id: string;
  studentName: string;
  anonymous: boolean;
  marker: string;
  score: number;
  grade: Grade | null;
  feedback?: string | null;
  responseExcerpt?: string | null;
  submittedAt: string;
}
