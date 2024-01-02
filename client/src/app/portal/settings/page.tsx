import { cookies } from 'next/headers';
import LogoutBtn from './components/LogoutBtn';
import UserForm from './components/UserForm';

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

export default async function SettingsPage() {
  const userData = await getUser();

  return (
    <div className="h-full w-full cursor-default overflow-y-scroll p-12">
      <div className="m-auto max-w-[1600px]">
        <div className="mb-12 flex items-center justify-between gap-4">
          <div className="flex items-end gap-4">
            <h1 className="font-title text-7xl">Settings</h1>
            <p className="text-2xl leading-none">
              <span className="font-light">{'>_'}</span>
            </p>
          </div>

          <LogoutBtn />
        </div>

        <UserForm userData={userData} />
      </div>
    </div>
  );
}
