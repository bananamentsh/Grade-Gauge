import Link from "next/link";
import { Assessment, Submission } from "../lib/types";
import { mean } from "../lib/stats";

export default function AssessmentCard({
  assessment,
  submissions,
}: {
  assessment: Assessment;
  submissions: Submission[];
}) {
  const scores = submissions.map((s) => s.score);
  const avg = mean(scores);

  return (
    <Link
      href={`/c/${assessment.classSlug}/a/${assessment.slug}`}
      className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-teal-300 hover:shadow-sm"
    >
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="rounded-full bg-teal-50 px-2 py-0.5 font-medium text-teal-700">
          {assessment.type}
        </span>
        <span>&middot;</span>
        <span>{assessment.weighting}</span>
      </div>
      <h3 className="text-base font-semibold text-gray-900">{assessment.title}</h3>
      <p className="line-clamp-2 text-sm text-gray-500">{assessment.description}</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
        <span>Due: {assessment.dueDate}</span>
        <span>Marked out of {assessment.markedOutOf}</span>
        <span className="font-medium text-gray-700">
          {submissions.length} submission{submissions.length === 1 ? "" : "s"}
        </span>
        {submissions.length > 0 && (
          <span className="font-medium text-gray-700">
            Avg: {avg.toFixed(1)} / {assessment.markedOutOf}
          </span>
        )}
      </div>
    </Link>
  );
}
