import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="kicker">404</p>
      <h1 className="section-title">Page not found</h1>
      <p className="section-lede">
        That page does not exist. Head back to the portfolio.
      </p>
      <Link href="/" className="btn-primary mt-2 inline-flex h-11 items-center px-6">
        Back to home
      </Link>
    </main>
  );
}
