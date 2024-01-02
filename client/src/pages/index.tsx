import { authenticate } from '@/utils/authenticate';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-sm">
      <div className="flex gap-5">
        <Link
          href="/login"
          className="border rounded border-primary px-5 py-1 text-primary hover:bg-primary hover:text-white"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="border rounded border-primary px-5 py-1 text-primary hover:bg-primary hover:text-white"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const token = req.cookies.auth;
    if (token) {
      const authed = await authenticate(token);

      if (authed === true) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          },
        };
      } else {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
  } catch (error) {
    console.log('***INVALID OR EXPIRED TOKEN***');
  }

  return {
    props: {},
  };
};
