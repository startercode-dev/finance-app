'use client';

import { useTransition } from 'react';
import { handleLogout } from '../actions';
import { useRouter } from 'next/navigation';

export default function LogoutBtn() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(() => {
          handleLogout();
          router.push('/');
          router.refresh();
        })
      }
      className="h-fit w-fit rounded-md border border-black bg-red px-8 py-2 text-white drop-shadow-card"
    >
      Logout
    </button>
  );
}
