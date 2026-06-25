import { redirect } from "next/navigation";
import DeleteAccountButton from "../components/DeleteAccountButton";
import EditUsernameForm from "../components/EditUsernameForm";
import { getCurrentProfile, getProfileStats } from "../lib/profile";

export default async function AccountPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  const stats = await getProfileStats(profile.id);

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Account</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Manage your profile and see your activity across Grade Gauge.
      </p>

      <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Profile</h2>

        <div className="mt-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">Email</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{profile.email}</p>
        </div>

        <div className="mt-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">Username</p>
          <div className="mt-1">
            <EditUsernameForm currentUsername={profile.username} />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Stats</h2>
        <dl className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <dt className="text-xs text-gray-400 dark:text-gray-500">Classes joined</dt>
            <dd className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{stats.classCount}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-400 dark:text-gray-500">Assignment submissions</dt>
            <dd className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {stats.submissionCount}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-4 rounded-lg border border-rose-200 dark:border-rose-800 bg-white dark:bg-gray-800 p-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Danger zone</h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Permanently delete your account and all associated data.
        </p>
        <div className="mt-2">
          <DeleteAccountButton />
        </div>
      </div>
    </main>
  );
}
