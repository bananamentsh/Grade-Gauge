import type { MemberCourseStats } from "../lib/stats";

function formatPct(value: number): string {
  return Number.isInteger(value) ? `${value}%` : `${value.toFixed(1)}%`;
}

export default function MemberStatsWidget({ stats }: { stats: MemberCourseStats }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Your standing</h2>

      <div className="mt-2">
        <p className="text-xs text-gray-400 dark:text-gray-500">Current grade</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {stats.weightedPct === null ? "—" : formatPct(stats.weightedPct)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Based on {stats.gradedCount} of {stats.totalCount} assessment
          {stats.totalCount === 1 ? "" : "s"}
        </p>
      </div>

      {stats.boundaries.length > 0 && (
        <div className="mt-3 border-t border-gray-100 dark:border-gray-700 pt-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">Score needed for...</p>
          <dl className="mt-1 space-y-1 text-sm">
            {stats.boundaries.map((b) => (
              <div key={b.grade} className="flex justify-between">
                <dt className="font-medium text-gray-700 dark:text-gray-300">{b.grade}</dt>
                <dd className="text-gray-500 dark:text-gray-400">{formatPct(b.minPct)}+</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
