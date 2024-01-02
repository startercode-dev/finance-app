import { cookies } from 'next/headers';
import SideNav from '@/app/(portal)/SideNav';

async function getUser() {
  const token = cookies().get('auth');

  const res = await fetch('http://localhost:8000/api/v1/user/info', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`,
    },
    cache: 'no-store',
  });
  const { data } = await res.json();
  return data;
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getUser();

  return (
    <div className="flex h-screen flex-col">
      <div className="w-full border-b border-black bg-background py-1 text-lg">
        stocks
      </div>

      <div className="flex h-[calc(100vh-37px)] max-md:flex-col">
        <SideNav user={data} />

        <div className="flex-grow bg-background">{children}</div>
      </div>
    </div>
  );
}
