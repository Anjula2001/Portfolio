"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const CHANGE_EVENT = "themechange";

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

/**
 * The appearance lives outside React: it is a combination of localStorage and
 * the OS preference. useSyncExternalStore subscribes to both, which keeps every
 * toggle on the page in sync and avoids a setState-in-effect cascade.
 */
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  media.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getSnapshot(): Theme {
  return (
    readStoredTheme() ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
}

// The server cannot know the visitor's preference; the inline script in the
// layout has already applied the right one before paint.
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const nextTheme = theme === "light" ? "dark" : "light";
  const label = `Switch to ${nextTheme} mode`;

  const apply = (next: Theme) => {
    if (next === getSnapshot()) return;

    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice simply will not persist.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => apply(nextTheme)}
      aria-label={label}
      title={label}
    >
      {theme === "light" ? (
        <Moon size={19} strokeWidth={1.7} aria-hidden="true" />
      ) : (
        <Sun size={19} strokeWidth={1.7} aria-hidden="true" />
      )}
    </button>
  );
}
