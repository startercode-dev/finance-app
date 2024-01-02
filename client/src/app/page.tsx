import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-sm">
      <div className="flex gap-5">
        <Link
          href="/login"
          className="border-primary-dark text-primary-dark hover:bg-primary-dark rounded border px-5 py-1 hover:text-white"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="border-primary-dark text-primary-dark hover:bg-primary-dark rounded border px-5 py-1 hover:text-white"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
