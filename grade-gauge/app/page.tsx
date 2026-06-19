import ClassCard from "./components/ClassCard";
import { getClasses } from "./lib/classes";

export default async function Home() {
  const classes = await getClasses();

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <section className="space-y-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Your classes</h1>
            <p className="mt-1 text-sm text-gray-500">
              Class pages you&apos;re a member of. Pick one to see assessments and how your marks compare.
            </p>
          </div>

          <div className="space-y-3">
            {classes.map((classPage) => (
              <ClassCard key={classPage.id} classPage={classPage} />
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-gray-900">About Grade Gauge</h2>
            <p className="mt-2 text-sm text-gray-500">
              Compare your assessment marks and feedback with the rest of your class. Class pages
              are created by students, for students.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Posts can be made anonymously. Raw scores and grades are always visible to everyone
              in the class.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
