"use client";

import { useState } from "react";

export default function ThemeToggle() {
  // Lazy initializer instead of an effect: the anti-flash inline script in
  // <head> already applied the right class to <html> before this component
  // mounts, so we can just read it once on first render.
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage unavailable; theme just won't persist
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        isDark ? "bg-teal-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-800 transition-transform ${
          isDark ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
