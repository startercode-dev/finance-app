'use client';

import {
  ArrowsRightLeftIcon,
  BanknotesIcon,
  ChevronDoubleLeftIcon,
  HomeModernIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { CogIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { MuseoModerno } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const logoFont = MuseoModerno({ subsets: ['latin'] });

const links = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: HomeModernIcon },
  {
    name: 'Transactions',
    href: '/portal/transactions',
    icon: ArrowsRightLeftIcon,
  },
  { name: 'Investments', href: '/portal/investments', icon: BanknotesIcon },
];

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });
    await router.push('/');
    router.refresh();
  };

  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
  };

  return (
    <div
      className={clsx(
        'group flex-none overflow-hidden bg-white transition-all duration-500 max-md:w-full',
        {
          'w-80': open,
          'w-[5.5rem]': !open,
        },
      )}
    >
      <div
        className={clsx(
          'relative flex h-full w-full flex-col justify-between border-r border-black transition-all duration-200 ease-in-out',
          {
            'p-12': open,
            'items-center px-5 py-12': !open,
          },
        )}
      >
        <button
          className={clsx(
            'absolute right-2 top-3 transition-transform delay-100 duration-700 ease-out ',
            {
              '[transform:rotateY(180deg)]': !open,
            },
          )}
          onClick={toggleOpen}
        >
          <ChevronDoubleLeftIcon className="w-5 opacity-30 transition-opacity duration-100 group-hover:opacity-100" />
        </button>

        <div
          className={clsx('flex flex-col gap-10', {
            'items-center': !open,
          })}
        >
          <h1
            className={clsx(
              `${logoFont.className} h-auto cursor-default rounded border border-black bg-light-primary bg-gradient-to-t from-gradient-purple to-gradient-blue text-center text-xl font-medium leading-tight drop-shadow-card transition-all duration-500 ease-out`,
              {
                'w-12 p-2': !open,
                'w-40 px-8 py-2': open,
              },
            )}
          >
            {open ? 'MACRO' : 'M'}
          </h1>
          <div className="flex flex-col gap-5 text-lg">
            {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    'flex cursor-pointer items-center gap-3 overflow-hidden rounded border border-black leading-none drop-shadow-card transition-all delay-100 duration-150 ease-out',
                    {
                      'bg-primary': pathname === link.href,
                      'bg-white hover:bg-light-primary': pathname !== link.href,
                    },
                    {
                      'w-[42px] p-2': !open,
                      'w-56 px-8 py-2': open,
                    },
                  )}
                >
                  <LinkIcon className="w-6 shrink-0" />
                  <p
                    className={clsx({
                      'fixed opacity-0': !open,
                      'opacity-100': open,
                    })}
                  >
                    {link.name}
                  </p>
                </Link>
              );
            })}
          </div>

          <button onClick={handleLogout}>signout</button>
        </div>

        <div
          className={clsx('flex transition-all duration-200 ease-out', {
            'gap-5': open,
            'gap-0': !open,
          })}
        >
          <div
            className={clsx(
              'flex cursor-default items-center justify-center gap-4 overflow-hidden rounded border bg-white bg-gradient-to-b from-gradient-purple to-gradient-blue py-1 drop-shadow-card transition-all duration-300 ease-in-out',
              {
                'w-0 border-none': !open,
                ' w-40 border-black': open,
              },
            )}
          >
            <UserCircleIcon className="w-8" />
            <p className="text-lg">Shaniqua</p>
          </div>
          <div
            className={clsx(
              'flex shrink-0 cursor-pointer items-center justify-center rounded border border-black bg-white p-1 drop-shadow-card hover:bg-gradient-to-b hover:from-gradient-purple hover:to-gradient-blue',
              {
                'w-fit': !open,
                'w-[42px]': open,
              },
            )}
          >
            <CogIcon className="w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
