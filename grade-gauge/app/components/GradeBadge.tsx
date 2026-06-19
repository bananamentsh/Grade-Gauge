import { Grade } from "../lib/types";

const GRADE_STYLES: Record<Grade, string> = {
  A: "bg-emerald-100 text-emerald-700",
  B: "bg-teal-100 text-teal-700",
  C: "bg-amber-100 text-amber-700",
  D: "bg-orange-100 text-orange-700",
  E: "bg-rose-100 text-rose-700",
  "0": "bg-gray-200 text-gray-600",
};

export default function GradeBadge({ grade }: { grade: Grade }) {
  return (
    <span
      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-xs font-semibold ${GRADE_STYLES[grade]}`}
    >
      {grade}
    </span>
  );
}
