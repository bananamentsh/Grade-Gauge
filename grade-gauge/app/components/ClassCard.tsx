import Link from "next/link";
import { ClassPage } from "../lib/types";
import { accentBgClass } from "../lib/accent";

export default function ClassCard({ classPage }: { classPage: ClassPage }) {
  return (
    <Link
      href={`/c/${classPage.slug}`}
      className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-teal-300 hover:shadow-sm"
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${accentBgClass(
          classPage.accent
        )}`}
      >
        {classPage.subject.slice(0, 2).toUpperCase()}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-gray-900">{classPage.name}</p>
        <p className="mt-0.5 line-clamp-2 text-sm text-gray-500">{classPage.description}</p>
      </div>
      <div className="hidden shrink-0 text-right text-sm text-gray-500 sm:block">
        <p className="font-semibold text-gray-700">{classPage.memberCount}</p>
        <p>members</p>
      </div>
    </Link>
  );
}
