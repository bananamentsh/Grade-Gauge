import { Submission } from "./types";

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function standardDeviation(values: number[]): number {
  if (values.length === 0) return 0;
  const m = mean(values);
  const variance = values.reduce((sum, v) => sum + (v - m) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

export function interquartileRange(values: number[]): { q1: number; q3: number; iqr: number } {
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = quantile(sorted, 0.25);
  const q3 = quantile(sorted, 0.75);
  return { q1, q3, iqr: q3 - q1 };
}

export function passRate(values: number[], threshold: number): number {
  if (values.length === 0) return 0;
  const passed = values.filter((v) => v >= threshold).length;
  return (passed / values.length) * 100;
}

export interface DistributionBand {
  label: string;
  minPct: number;
  maxPct: number;
  count: number;
}

/**
 * Bands are 10-percentage-point increments starting from the pass threshold,
 * with everything below the threshold collapsed into a single band.
 */
export function getScoreDistribution(
  submissions: Submission[],
  markedOutOf: number,
  passThreshold: number
): DistributionBand[] {
  const thresholdPct = (passThreshold / markedOutOf) * 100;
  const bands: DistributionBand[] = [
    { label: `Below ${formatPct(thresholdPct)}%`, minPct: -Infinity, maxPct: thresholdPct, count: 0 },
  ];

  let start = thresholdPct;
  while (start < 100) {
    const end = Math.min(start + 10, 100);
    bands.push({
      label: `${formatPct(start)}-${formatPct(end)}%`,
      minPct: start,
      maxPct: end,
      count: 0,
    });
    start += 10;
  }

  for (const submission of submissions) {
    const pct = (submission.score / markedOutOf) * 100;
    for (let i = bands.length - 1; i >= 0; i--) {
      const band = bands[i];
      const isLast = i === bands.length - 1;
      if (pct >= band.minPct && (pct < band.maxPct || (isLast && pct <= band.maxPct))) {
        band.count += 1;
        break;
      }
    }
  }

  return bands;
}

function formatPct(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

export interface MarkerStats {
  marker: string;
  count: number;
  mean: number;
  median: number;
  stdDev: number;
  iqr: number;
}

export function getMarkerBreakdown(submissions: Submission[]): MarkerStats[] {
  const byMarker = new Map<string, number[]>();
  for (const submission of submissions) {
    const scores = byMarker.get(submission.marker) ?? [];
    scores.push(submission.score);
    byMarker.set(submission.marker, scores);
  }

  return Array.from(byMarker.entries())
    .map(([marker, scores]) => ({
      marker,
      count: scores.length,
      mean: mean(scores),
      median: median(scores),
      stdDev: standardDeviation(scores),
      iqr: interquartileRange(scores).iqr,
    }))
    .sort((a, b) => a.marker.localeCompare(b.marker));
}

export interface AssessmentStats {
  count: number;
  mean: number;
  median: number;
  stdDev: number;
  q1: number;
  q3: number;
  iqr: number;
  passRate: number;
  distribution: DistributionBand[];
  markerBreakdown: MarkerStats[];
}

export function getAssessmentStats(
  submissions: Submission[],
  markedOutOf: number,
  passThreshold: number
): AssessmentStats {
  const scores = submissions.map((s) => s.score);
  const { q1, q3, iqr } = interquartileRange(scores);

  return {
    count: submissions.length,
    mean: mean(scores),
    median: median(scores),
    stdDev: standardDeviation(scores),
    q1,
    q3,
    iqr,
    passRate: passRate(scores, passThreshold),
    distribution: getScoreDistribution(submissions, markedOutOf, passThreshold),
    markerBreakdown: getMarkerBreakdown(submissions),
  };
}
