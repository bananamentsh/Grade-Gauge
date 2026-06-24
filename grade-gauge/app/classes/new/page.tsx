import Link from "next/link";
import CreateClassForm from "../../components/CreateClassForm";

export default function NewClassPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-6 sm:px-6">
      <Link href="/dashboard" className="text-sm text-gray-500 hover:underline">
        &larr; Back to dashboard
      </Link>

      <h1 className="mt-3 text-xl font-semibold text-gray-900">Create a class</h1>
      <p className="mt-1 text-sm text-gray-500">
        You&apos;ll be the admin. You can invite others once it&apos;s set up.
      </p>

      <CreateClassForm />
    </main>
  );
}
