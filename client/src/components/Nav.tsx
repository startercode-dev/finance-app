import Link from 'next/link';
import DashboardIcon from '../../public/dashboard.svg';
import TransactionsIcon from '../../public/transactions.svg';
import InvestmentsIcon from '../../public/investments.svg';
import { usePathname } from 'next/navigation';
import { MuseoModerno } from 'next/font/google';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';

const Logo = MuseoModerno({ subsets: ['latin'] });

export default function Nav() {
  const currentRoute = usePathname();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const handleLogout = async () => {
    await fetch('/api/logout');
    await router.push('/');
    router.reload();
  };

  return (
    <nav className="flex w-full py-12 px-12">
      <h2
        className={`${Logo.className} text-primary text-2xl px-8 py-[7px] mr-8 border border-dark rounded-lg small-card`}
      >
        MACRO
      </h2>

      <ul className="flex text-xl border border-dark small-card rounded-lg overflow-hidden">
        <li
          className={`nav-link ${
            currentRoute === '/dashboard' ? 'active-link' : 'default-link'
          }`}
        >
          <DashboardIcon
            fill={`${currentRoute === '/dashboard' ? '#fafafa' : '#1E0A24'} `}
          />
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`nav-link ${
            currentRoute === '/transactions' ? 'active-link' : 'default-link'
          } border-x border-dark `}
        >
          <TransactionsIcon
            fill={`${
              currentRoute === '/transactions' ? '#fafafa' : '#1E0A24'
            } `}
          />
          <Link href="/transactions">Transactions</Link>
        </li>
        <li
          className={`nav-link ${
            currentRoute === '/investments' ? 'active-link' : 'default-link'
          }`}
        >
          <InvestmentsIcon
            fill={`${currentRoute === '/investments' ? '#fafafa' : '#1E0A24'} `}
          />
          <Link href="/investments">Investments</Link>
        </li>
      </ul>

      <div className="flex items-center text-xl border border-dark rounded-lg ml-auto small-card">
        {user.name ? (
          <p className="px-8 py-2">{user.name}</p>
        ) : (
          <p className="px-8 py-2">not auth</p>
        )}
        <div className="h-full w-[1px] bg-dark"></div>
        <button type="button" onClick={handleLogout} className="px-8 py-2">
          Logout
        </button>
      </div>
    </nav>
  );
}
