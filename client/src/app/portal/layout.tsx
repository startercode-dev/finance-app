import { ReactNode } from 'react';
import SideNav from '@/components/SideNav';
import { cookies } from 'next/headers';

export default async function Layout({ children }: { children: ReactNode }) {
  const token = cookies().get('auth');

  const res = await fetch('http://localhost:8000/api/v1/user/info', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`,
    },
    cache: 'no-cache',
  });

  console.log(await res.json());

  return (
    <div className="flex h-screen flex-col">
      <div className="w-full border-b border-black bg-background py-1 text-lg">
        stocks
      </div>

      <div className="flex h-[calc(100vh-37px)] max-md:flex-col">
        <SideNav />

        <div className="flex-grow bg-background">{children}</div>
      </div>
    </div>
  );
}
