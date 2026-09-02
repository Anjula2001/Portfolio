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

  const apply = (next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice simply will not persist.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <div className="theme-toggle" data-active={theme} role="group" aria-label="Appearance">
      <span className="theme-toggle-thumb" aria-hidden="true" />
      <button
        type="button"
        onClick={() => apply("light")}
        aria-pressed={theme === "light"}
        aria-label="Use light appearance"
        title="Light"
      >
        <Sun size={15} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => apply("dark")}
        aria-pressed={theme === "dark"}
        aria-label="Use dark appearance"
        title="Dark"
      >
        <Moon size={15} aria-hidden="true" />
      </button>
    </div>
  );
}
