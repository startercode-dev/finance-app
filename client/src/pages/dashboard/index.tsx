import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getAccountsData,
  getTransactionsData,
  getUserData,
} from '@/store/userActions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MuseoModerno } from 'next/font/google';
import TransactionItem from '@/components/TransactionItem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardIcon from '../../../public/dashboard.svg';
import TransactionsIcon from '../../../public/transactions.svg';
import InvestmentsIcon from '../../../public/investments.svg';

const Logo = MuseoModerno({ subsets: ['latin'] });

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const currentRoute = usePathname();

  const handleLogout = async () => {
    await fetch('/api/logout');
    await router.push('/');
    router.reload();
  };

  const getTransactions = async () => {
    try {
      await fetch('/api/get-transactions', {
        method: 'GET',
      });

      dispatch(getTransactionsData());

      // console.log('success');
      //! continue implementing user flow
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // dispatch(getUserData());
        // dispatch(getAccountsData());
        dispatch(getTransactionsData());
      } catch (error) {
        console.log(error);
      }
    };

    init();
    return () => {};
  }, []);

  return (
    <main>
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
              fill={`${
                currentRoute === '/investments' ? '#fafafa' : '#1E0A24'
              } `}
            />
            <Link href="/investments">Investments</Link>
          </li>
        </ul>

        <div className="flex items-center text-xl border border-dark rounded-lg ml-auto small-card">
          {user.name ? user.name : <p className="px-8 py-2">not auth</p>}
          <div className="h-full w-[1px] bg-dark"></div>
          <button type="button" onClick={handleLogout} className="px-8 py-2">
            Logout
          </button>
        </div>
      </nav>

      <div className="w-full h-[calc(100vh-144px)] grid grid-cols-38/61">
        <div className="grid grid-rows-col1 h-[inhert]">
          <div className="card mx-12 mb-12"></div>
          <div className="card mx-12 mb-12"></div>
          <div className="card mx-12 mb-12"></div>
        </div>

        <div className="grid grid-rows-col2 h-[inherit]">
          {/* //* RECENT ACTIVITIES */}
          <div className="card mr-12 mb-12 flex flex-col text-2xl p-8">
            <h3 className="font-medium mb-6">Recent Activities</h3>
            <ul className="overflow-y-auto">
              {user.transactions ? (
                user.transactions.slice(10, 30).map((transaction) => {
                  return (
                    <TransactionItem
                      key={transaction.transactionId}
                      transaction={transaction}
                    />
                  );
                })
              ) : (
                <p>no data</p>
              )}
            </ul>
          </div>

          {/* //* STOCK */}
          <div className="grid grid-cols-3 mr-12 mb-12 gap-x-12">
            {/* <button onClick={getTransactions}>get transactions</button> */}
            <div className="card mb-6"></div>
            <div className="card mb-6"></div>
            <div className="card mb-6"></div>
            <div className="card mt-6"></div>
            <div className="card mt-6"></div>
            <div className="card mt-6"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
