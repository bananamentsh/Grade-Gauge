import Link from "next/link";
import { notFound } from "next/navigation";
import AssessmentCard from "../../components/AssessmentCard";
import DeleteClassButton from "../../components/DeleteClassButton";
import InviteLinkBox from "../../components/InviteLinkBox";
import MemberStatsWidget from "../../components/MemberStatsWidget";
import PendingRequestsList from "../../components/PendingRequestsList";
import { accentBgClass } from "../../lib/accent";
import { getPendingJoinRequests } from "../../lib/actions/joinRequests";
import { getAssessmentsForClass, getClassBySlug } from "../../lib/classes";
import { getClassAdmin, getMembershipRole } from "../../lib/profile";
import { getSubmissionsForAssessment } from "../../lib/submissions";
import { getMemberCourseStats } from "../../lib/stats";
import { createClient } from "../../lib/supabase/server";

export default async function ClassPage({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}) {
  const { classSlug } = await params;
  const classPage = await getClassBySlug(classSlug);

  if (!classPage) {
    notFound();
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const currentUserId = userData.user?.id ?? null;

  const [assessments, { isAdmin, isMember }, classAdmin] = await Promise.all([
    getAssessmentsForClass(classSlug),
    getMembershipRole(classPage.id),
    getClassAdmin(classPage.id),
  ]);
  const submissionsByAssessment = await Promise.all(
    assessments.map((assessment) => getSubmissionsForAssessment(assessment.id))
  );
  const pendingRequests = isAdmin ? await getPendingJoinRequests(classPage.id) : [];
  const adminLabel = classAdmin?.username
    ? `@${classAdmin.username}`
    : classAdmin?.displayName || classAdmin?.email || null;

  const memberStats =
    isMember && !isAdmin && currentUserId
      ? getMemberCourseStats(assessments, submissionsByAssessment, currentUserId)
      : null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className={`h-16 ${accentBgClass(classPage.accent)}`} />
        <div className="flex flex-wrap items-center gap-4 p-4">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white text-base font-bold text-white -mt-10 ${accentBgClass(
              classPage.accent
            )}`}
          >
            {classPage.subject.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{classPage.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {classPage.memberCount} members &middot; {classPage.subject}
            </p>
          </div>
          <Link
            href="/"
            className="ml-auto rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Back to classes
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <section className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Assessments</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Pick an assessment to see submissions, marks and class-wide statistics.
              </p>
            </div>
            {isAdmin && (
              <Link
                href={`/c/${classSlug}/assessments/new`}
                className="rounded-md bg-teal-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-700"
              >
                Add assessment
              </Link>
            )}
          </div>

          <div className="space-y-3">
            {assessments.map((assessment, index) => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                submissions={submissionsByAssessment[index] ?? []}
                mySubmission={
                  currentUserId
                    ? (submissionsByAssessment[index] ?? []).find((s) => s.userId === currentUserId)
                    : undefined
                }
              />
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">About {classPage.code}</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{classPage.description}</p>
            <dl className="mt-3 space-y-1 text-sm">
              {adminLabel && (
                <div className="flex justify-between">
                  <dt className="text-gray-400 dark:text-gray-500">Admin</dt>
                  <dd className="font-medium text-gray-700 dark:text-gray-300">{adminLabel}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-400 dark:text-gray-500">Members</dt>
                <dd className="font-medium text-gray-700 dark:text-gray-300">{classPage.memberCount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400 dark:text-gray-500">Assessments</dt>
                <dd className="font-medium text-gray-700 dark:text-gray-300">{assessments.length}</dd>
              </div>
            </dl>
          </div>

          {memberStats && <MemberStatsWidget stats={memberStats} />}

          {isAdmin && (
            <>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Invite link</h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Anyone with this link can request to join. You approve each request.
                </p>
                <div className="mt-2">
                  <InviteLinkBox
                    classId={classPage.id}
                    classSlug={classPage.slug}
                    inviteCode={classPage.inviteCode}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Pending requests
                  {pendingRequests.length > 0 && (
                    <span className="ml-1.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                      {pendingRequests.length}
                    </span>
                  )}
                </h2>
                <div className="mt-2">
                  <PendingRequestsList requests={pendingRequests} classSlug={classPage.slug} />
                </div>
              </div>

              <div className="rounded-lg border border-rose-200 dark:border-rose-800 bg-white dark:bg-gray-800 p-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Danger zone</h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Permanently delete this class and everything in it.
                </p>
                <div className="mt-2">
                  <DeleteClassButton classId={classPage.id} classCode={classPage.code} />
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </main>
  );
}
