import ClassCard from "../components/ClassCard";
import { getClasses } from "../lib/classes";
import { createClient } from "../lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const classes = await getClasses();

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Signed in as {data.user?.email}.
        </p>
      </div>

      <section className="mt-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Your classes</h2>

        {classes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
            You&apos;re not in any class pages yet. Ask a class admin to add you, or join via an
            invite link once that&apos;s available.
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
