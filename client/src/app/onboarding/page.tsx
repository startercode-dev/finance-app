import { MuseoModerno } from 'next/font/google';
import { cookies } from 'next/headers';
import InitBtn from './InitBtn';

const Logo = MuseoModerno({ subsets: ['latin'] });

async function generateToken() {
  const token = cookies().get('auth');
  const response = await fetch(
    'http://localhost:8000/api/v1/plaid/item/create_link_token',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  const data = await response.json();
  return data.link_token;
}

export default async function UserOnboarding() {
  const token: string = await generateToken();

  return (
    <div className="min-h-screen pt-[18vh]">
      <div className="mx-auto flex w-fit flex-col items-center gap-3 rounded-lg border border-black bg-white p-12 drop-shadow-[6px_6px_0px_#1E0A24]">
        <h1 className={`${Logo.className} text-6xl text-primary `}>MACRO</h1>
        <p className="text-lg">Manage your entire portfolio in one system</p>
        <div className="my-9 h-[1px] w-28 rounded-full bg-neutral-500"></div>
        <h2 className="font-title text-5xl">Welcome!</h2>
        <p className="text-base font-extralight">
          Let's get started by linking your bank account.
        </p>
        <InitBtn token={token} />
        <p className="font-extralight">
          * You&#39;re logging in with the bank&#39;s official website via
          Plaid, we do not keep any of your bank&#39;s login credentials !
        </p>
      </div>
    </div>
  );
}
