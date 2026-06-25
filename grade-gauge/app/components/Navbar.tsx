import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import { logout } from "../lib/actions/auth";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email;
  const initials = email ? email.slice(0, 2).toUpperCase() : "";

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="hidden text-lg font-semibold text-gray-900 dark:text-gray-100 sm:inline">
            Grade Gauge
          </span>
        </Link>

        <div className="hidden flex-1 sm:block">
          <div className="mx-auto max-w-md">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700 px-4 py-1.5 text-sm text-gray-400 dark:text-gray-500">
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
          <ThemeToggle />
          {email ? (
            <>
              <Link
                href="/account"
                className="hidden text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 sm:inline"
              >
                {email}
              </Link>
              <Link
                href="/account"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/40 text-sm font-semibold text-teal-700 dark:text-teal-300"
              >
                {initials}
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-teal-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-700"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
