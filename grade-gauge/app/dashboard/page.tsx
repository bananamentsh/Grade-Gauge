import Link from "next/link";
import ClassCard from "../components/ClassCard";
import UsernameForm from "../components/UsernameForm";
import { getClasses } from "../lib/classes";
import { getCurrentProfile } from "../lib/profile";
import { createClient } from "../lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const [classes, profile] = await Promise.all([getClasses(), getCurrentProfile()]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Signed in as {profile?.username ? `@${profile.username}` : data.user?.email}.
          </p>
        </div>
        <Link
          href="/classes/new"
          className="rounded-md bg-teal-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-700"
        >
          Create a class
        </Link>
      </div>

      {!profile?.username && (
        <div className="mt-4">
          <UsernameForm />
        </div>
      )}

      <section className="mt-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Your classes</h2>

        {classes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
            You&apos;re not in any class pages yet. Ask a class admin for an invite link, or{" "}
            <Link href="/classes/new" className="font-medium text-teal-600 hover:underline">
              create your own class
            </Link>
            .
          </div>
        ) : (
          <div className="space-y-3">
            {classes.map((classPage) => (
              <ClassCard key={classPage.id} classPage={classPage} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
