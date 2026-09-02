"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import "./globals.css";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // global-error replaces the root layout, so it must supply html and body.
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <h1 className="section-title">Something went wrong</h1>
        <p className="section-lede">
          The page could not be loaded. Please try again.
        </p>
        <button type="button" className="btn-primary h-11 px-6" onClick={() => unstable_retry()}>
          Try again
        </button>
      </body>
    </html>
  );
}
