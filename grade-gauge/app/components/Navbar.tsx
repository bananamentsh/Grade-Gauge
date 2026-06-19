import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
            GG
          </span>
          <span className="hidden text-lg font-semibold text-gray-900 sm:inline">
            Grade Gauge
          </span>
        </Link>

        <div className="hidden flex-1 sm:block">
          <div className="mx-auto max-w-md">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-400">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3m0 0a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9z" />
              </svg>
              Search classes &amp; assessments
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-sm font-medium text-gray-600 sm:inline">
            Jordan P.
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
            JP
          </span>
        </div>
      </div>
    </header>
  );
}
