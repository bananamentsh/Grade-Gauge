import { Grade } from "../lib/types";

const KNOWN_STYLES: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  B: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  C: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  D: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  E: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  F: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "0": "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  PASS: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  FAIL: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

const FALLBACK_STYLE = "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300";

export default function GradeBadge({ grade }: { grade: Grade }) {
  const style = KNOWN_STYLES[grade.toUpperCase()] ?? FALLBACK_STYLE;
  return (
    <span
      className={`inline-flex h-6 min-w-6 items-center justify-center whitespace-nowrap rounded-md px-1.5 text-xs font-semibold ${style}`}
    >
      {grade}
    </span>
  );
}
