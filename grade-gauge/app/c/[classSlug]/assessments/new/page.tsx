import Link from "next/link";
import { notFound } from "next/navigation";
import CreateAssessmentForm from "../../../../components/CreateAssessmentForm";
import { getClassBySlug } from "../../../../lib/classes";
import { getMembershipRole } from "../../../../lib/profile";

export default async function NewAssessmentPage({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}) {
  const { classSlug } = await params;
  const classPage = await getClassBySlug(classSlug);

  if (!classPage) {
    notFound();
  }

  const { isAdmin } = await getMembershipRole(classPage.id);
  if (!isAdmin) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-6 sm:px-6">
      <Link href={`/c/${classSlug}`} className="text-sm text-gray-500 hover:underline">
        &larr; Back to {classPage.code}
      </Link>

      <h1 className="mt-3 text-xl font-semibold text-gray-900">Add an assessment</h1>
      <p className="mt-1 text-sm text-gray-500">
        Members of {classPage.name} will see this on the class page once it&apos;s created.
      </p>

      <div className="mt-5">
        <CreateAssessmentForm classId={classPage.id} classSlug={classSlug} />
      </div>
    </main>
  );
}
