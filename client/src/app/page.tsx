import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-sm">
      <div className="flex gap-5">
        <Link
          href="/login"
          className="rounded border border-primary px-5 py-1 text-primary hover:bg-primary hover:text-white"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded border border-primary px-5 py-1 text-primary hover:bg-primary hover:text-white"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
