export const ACCENT_STYLES: Record<string, string> = {
  rose: "bg-rose-500",
  sky: "bg-sky-500",
  amber: "bg-amber-500",
  teal: "bg-teal-500",
  violet: "bg-violet-500",
};

export function accentBgClass(accent: string): string {
  return ACCENT_STYLES[accent] ?? "bg-teal-500";
}
