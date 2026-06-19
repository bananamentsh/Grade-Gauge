import { Assessment } from "../lib/types";
import { AssessmentStats } from "../lib/stats";
import ScoreDistribution from "./ScoreDistribution";

function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg bg-gray-50 px-3 py-2.5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-0.5 text-lg font-semibold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

export default function StatsSummary({
  assessment,
  stats,
}: {
  assessment: Assessment;
  stats: AssessmentStats;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
        Class statistics
      </h2>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        <StatTile label="Submissions" value={`${stats.count}`} />
        <StatTile label="Mean" value={`${stats.mean.toFixed(1)} / ${assessment.markedOutOf}`} />
        <StatTile label="Median" value={`${stats.median.toFixed(1)} / ${assessment.markedOutOf}`} />
        <StatTile label="Pass rate" value={`${stats.passRate.toFixed(0)}%`} sub={`Threshold: ${assessment.passThreshold}/${assessment.markedOutOf}`} />
        <StatTile label="Std. deviation" value={stats.stdDev.toFixed(1)} />
        <StatTile label="IQR" value={`${stats.q1.toFixed(1)} – ${stats.q3.toFixed(1)}`} sub={`IQR ${stats.iqr.toFixed(1)}`} />
      </div>

      <div className="mt-5">
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Score distribution
        </h3>
        <div className="mt-2">
          <ScoreDistribution bands={stats.distribution} />
        </div>
      </div>

      {stats.markerBreakdown.length > 1 && (
        <div className="mt-5">
          <h3 className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Per-marker breakdown
          </h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-gray-400">
                  <th className="py-1 pr-4 font-medium">Marker</th>
                  <th className="py-1 pr-4 font-medium">Submissions</th>
                  <th className="py-1 pr-4 font-medium">Mean</th>
                  <th className="py-1 pr-4 font-medium">Median</th>
                  <th className="py-1 pr-4 font-medium">Std. dev.</th>
                  <th className="py-1 pr-4 font-medium">IQR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.markerBreakdown.map((m) => (
                  <tr key={m.marker}>
                    <td className="py-1.5 pr-4 font-medium text-gray-700">{m.marker}</td>
                    <td className="py-1.5 pr-4 text-gray-600">{m.count}</td>
                    <td className="py-1.5 pr-4 text-gray-600">{m.mean.toFixed(1)}</td>
                    <td className="py-1.5 pr-4 text-gray-600">{m.median.toFixed(1)}</td>
                    <td className="py-1.5 pr-4 text-gray-600">{m.stdDev.toFixed(1)}</td>
                    <td className="py-1.5 pr-4 text-gray-600">{m.iqr.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
