import { notFound, redirect } from "next/navigation";
import JoinRequestForm from "../../components/JoinRequestForm";
import { getClassPreviewByInviteCode, getOwnJoinRequestStatus } from "../../lib/actions/joinRequests";
import { getMembershipRole } from "../../lib/profile";

export default async function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const preview = await getClassPreviewByInviteCode(code);

  if (!preview) {
    notFound();
  }

  const { isMember } = await getMembershipRole(preview.id);
  if (isMember) {
    redirect(`/c/${preview.slug}`);
  }

  const status = await getOwnJoinRequestStatus(preview.id);

  return (
    <main className="mx-auto max-w-md px-4 py-10 sm:px-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
        <p className="text-sm text-gray-500">You&apos;ve been invited to join</p>
        <h1 className="mt-1 text-lg font-semibold text-gray-900">{preview.name}</h1>
        <p className="mt-1 text-sm text-gray-500">{preview.subject}</p>

        {status === "pending" ? (
          <p className="mt-4 text-sm text-amber-700">
            Your request is waiting on the class admin to approve it.
          </p>
        ) : status === "denied" ? (
          <p className="mt-4 text-sm text-red-600">
            Your request to join was denied. Contact the class admin if you think this is a mistake.
          </p>
        ) : (
          <JoinRequestForm classId={preview.id} code={code} />
        )}
      </div>
    </main>
  );
}
