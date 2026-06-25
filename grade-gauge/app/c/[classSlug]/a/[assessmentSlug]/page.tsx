import Link from "next/link";
import { notFound } from "next/navigation";
import CreateSubmissionForm from "../../../../components/CreateSubmissionForm";
import GradeBadge from "../../../../components/GradeBadge";
import StatsSummary from "../../../../components/StatsSummary";
import SubmissionCard from "../../../../components/SubmissionCard";
import { getAssessmentBySlug, getClassBySlug } from "../../../../lib/classes";
import { getMembershipRole } from "../../../../lib/profile";
import { getSubmissionsForAssessment } from "../../../../lib/submissions";
import { getAssessmentStats } from "../../../../lib/stats";

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ classSlug: string; assessmentSlug: string }>;
}) {
  const { classSlug, assessmentSlug } = await params;
  const classPage = await getClassBySlug(classSlug);
  const assessment = await getAssessmentBySlug(classSlug, assessmentSlug);

  if (!classPage || !assessment) {
    notFound();
  }

  const [submissions, { isMember }] = await Promise.all([
    getSubmissionsForAssessment(assessment.id),
    getMembershipRole(classPage.id),
  ]);
  const stats = getAssessmentStats(
    submissions,
    assessment.markedOutOf,
    assessment.passThreshold,
    assessment.usesLetterGrades ? assessment.gradingScale : undefined
  );
  const sortedSubmissions = [...submissions].sort((a, b) => b.score - a.score);
  const knownMarkers = Array.from(new Set(submissions.map((s) => s.marker))).sort();

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <nav className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-teal-600">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/c/${classPage.slug}`} className="hover:text-teal-600">
          {classPage.code}
        </Link>
      </nav>

      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="rounded-full bg-teal-50 px-2 py-0.5 font-medium text-teal-700">
              {assessment.type}
            </span>
            <span>&middot;</span>
            <span>{assessment.weighting}</span>
            <span>&middot;</span>
            <span>Due: {assessment.dueDate}</span>
          </div>
          <h1 className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100">{assessment.title}</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{assessment.description}</p>

          {assessment.attachmentUrl && (
            <a
              href={assessment.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm font-medium text-teal-700 hover:bg-teal-50"
            >
              View attachment{assessment.attachmentName ? `: ${assessment.attachmentName}` : ""}
            </a>
          )}

          {assessment.usesLetterGrades && assessment.gradingScale && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    <th className="py-1 pr-4 font-medium">Grade</th>
                    <th className="py-1 pr-4 font-medium">Marks</th>
                    <th className="py-1 pr-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {assessment.gradingScale.map((band) => (
                    <tr key={band.grade}>
                      <td className="py-1.5 pr-4">
                        <GradeBadge grade={band.grade} />
                      </td>
                      <td className="py-1.5 pr-4 text-gray-600 dark:text-gray-400">
                        {band.min === band.max ? band.min : `${band.min}-${band.max}`}
                      </td>
                      <td className="py-1.5 pr-4 text-gray-500 dark:text-gray-400">{band.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <StatsSummary assessment={assessment} stats={stats} />

        {isMember && (
          <CreateSubmissionForm
            classId={classPage.id}
            classSlug={classPage.slug}
            assessmentId={assessment.id}
            assessmentSlug={assessment.slug}
            markedOutOf={assessment.markedOutOf}
            knownMarkers={knownMarkers}
          />
        )}

        <div>
          <h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-gray-100">
            Submissions ({submissions.length})
          </h2>
          <div className="space-y-2">
            {sortedSubmissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} assessment={assessment} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
