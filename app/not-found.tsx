import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center px-5">
      <div className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-5xl text-primary">Page not found</h1>
        <p className="mt-3 text-muted-foreground">The page may have moved or no longer exists.</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-primary-foreground"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
