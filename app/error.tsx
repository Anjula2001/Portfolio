"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="kicker">Error</p>
      <h1 className="section-title">Something went wrong</h1>
      <p className="section-lede">
        That page hit an unexpected problem. Trying again usually clears it.
      </p>
      <button type="button" className="btn-primary mt-2 h-11 px-6" onClick={() => unstable_retry()}>
        Try again
      </button>
    </main>
  );
}
