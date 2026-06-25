import { Assessment, Submission } from "../lib/types";
import GradeBadge from "./GradeBadge";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function SubmissionCard({
  submission,
  assessment,
}: {
  submission: Submission;
  assessment: Assessment;
}) {
  const displayName = submission.anonymous ? "Anonymous" : submission.studentName;

  return (
    <div className="flex gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          submission.anonymous ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400" : "bg-teal-100 text-teal-700"
        }`}
      >
        {submission.anonymous ? "?" : initials(displayName)}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <span className="font-semibold text-gray-900 dark:text-gray-100">{displayName}</span>
          <span className="text-gray-400 dark:text-gray-500">&middot;</span>
          <span className="text-gray-500 dark:text-gray-400">Marked by {submission.marker}</span>
          <span className="text-gray-400 dark:text-gray-500">&middot;</span>
          <span className="text-gray-400 dark:text-gray-500">{formatDate(submission.submittedAt)}</span>
        </div>

        {submission.responseExcerpt && (
          <blockquote className="mt-2 border-l-2 border-gray-200 dark:border-gray-700 pl-3 text-sm text-gray-600 dark:text-gray-400">
            {submission.responseExcerpt}
          </blockquote>
        )}

        {submission.feedback && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-600 dark:text-gray-400">Feedback: </span>
            {submission.feedback}
          </p>
        )}

        {submission.fileUrl && (
          <a
            href={submission.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:underline"
          >
            View file{submission.fileName ? `: ${submission.fileName}` : ""}
          </a>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {submission.score}/{assessment.markedOutOf}
        </span>
        {submission.grade && <GradeBadge grade={submission.grade} />}
      </div>
    </div>
  );
}
