import { cookies } from 'next/headers';
import RecentActivites from '@/app/portal/dashboard/components/RecentActivities';
import InitFetchBtn from '@/app/portal/dashboard/components/InitFetchBtn';
import CardBalances from '@/app/portal/dashboard/components/CardBalances';
import TopCategories from '@/app/portal/dashboard/components/TopCategories';
import CurrentSpending from '@/app/portal/dashboard/components/CurrentSpending';
import { initFetch } from './actions';

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

async function syncPlaidData() {
  const token = cookies().get('auth')?.value;

  // Get today's date, and 24m ago date
  const today = new Date();
  const startDate = new Date(new Date(today).setDate(today.getDate() - 1))
    .toISOString()
    .split('T')[0];
  const endDate = new Date().toISOString().split('T')[0];

  const accounts = await fetch(
    `http://localhost:8000/api/v1/plaid/accounts/get`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const accountsData = await accounts.json();
  if (accountsData.status !== 'success') {
    console.log(accountsData);
  }

  const transactions = await fetch(
    `http://localhost:8000/api/v1/plaid/transactions/get`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ startDate, endDate }),
    },
  );
  const transactionsData = await transactions.json();
  if (transactionsData.status !== 'success') {
    console.log(transactionsData);
  }
}

async function fetchDashboard() {
  const token = cookies().get('auth');

  const res = await fetch(
    `http://localhost:8000/api/v1/transaction/fetchDashboard`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      cache: 'no-store',
    },
  );

  return res.json();
}

export default async function DashboardPage() {
  await syncPlaidData();
  const {
    currMonthSpending,
    transactions1m,
    percentChange,
    topCategories,
    accounts,
  } = await fetchDashboard();
  const user = await getUser();

  const currMonthSpendingData = { currMonthSpending, percentChange };

  if (transactions1m.length === 0) {
    return (
      <div className="p-14">
        <h3 className="mb-1 text-3xl font-medium">
          Welcome to your dashboard!
        </h3>
        <p className="text-xl">
          Let&#39;s get started by syncing up your accounts, and transactions
          from the past 24 months.
        </p>
        <InitFetchBtn />
      </div>
    );
  }

  return (
    <div className="h-full w-full cursor-default overflow-y-scroll p-12">
      <div className="m-auto max-w-[1600px]">
        <div className="mb-12 flex items-end gap-4">
          <h1 className="font-title text-7xl">Dashboard</h1>
          <p className="text-2xl leading-none">
            <span className="font-light">good morning / </span>
            {user.name}
          </p>
        </div>

        <div className="mb-12 flex h-64 gap-12">
          {/* CURRENT SPENDING */}
          <div className="flex flex-auto rounded-md border border-black bg-white bg-gradient-to-t from-gradient-blue to-gradient-purple drop-shadow-card">
            <CurrentSpending data={currMonthSpendingData} />
          </div>
        </div>

        <div className="flex h-[700px] gap-12">
          {/* RECENT ACTIVITIES */}
          <div className="h-full w-[70%] rounded-md border border-black bg-white drop-shadow-card">
            <RecentActivites transactions1m={transactions1m} />
          </div>

          <div className="flex h-[100%] w-[30%] flex-col gap-12">
            {/* TOP CATEGORIES */}
            <div className="h-[50%] rounded-md border border-black bg-white bg-gradient-to-tr from-gradient-green to-gradient-blue drop-shadow-card">
              <TopCategories categories={topCategories} />
            </div>

            {/* CARD BALANCE */}
            <div className="h-[40%] flex-auto rounded-md border border-black bg-white drop-shadow-card">
              <CardBalances accounts={accounts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
