import { DistributionBand } from "../lib/stats";

export default function ScoreDistribution({ bands }: { bands: DistributionBand[] }) {
  const max = Math.max(...bands.map((b) => b.count), 1);

  return (
    <div className="space-y-1.5">
      {bands.map((band) => (
        <div key={band.label} className="flex items-center gap-3 text-sm">
          <span className="w-24 shrink-0 text-gray-500">{band.label}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-teal-500"
              style={{ width: `${(band.count / max) * 100}%` }}
            />
          </div>
          <span className="w-6 shrink-0 text-right font-medium text-gray-700">{band.count}</span>
        </div>
      ))}
    </div>
  );
}
