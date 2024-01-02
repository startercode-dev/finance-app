import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { cookies } from 'next/headers';
import RecentActivites from '@/app/(portal)/dashboard/components/RecentActivities';
import InitFetchBtn from '@/app/(portal)/dashboard/components/InitFetchBtn';
import CardBalances from '@/app/(portal)/dashboard/components/CardBalances';
import TopCategories from '@/app/(portal)/dashboard/components/TopCategories';
import CurrentSpending from '@/app/(portal)/dashboard/components/CurrentSpending';

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
  const {
    currMonthSpending,
    transactions1m,
    percentChange,
    topCategories,
    accounts,
  } = await fetchDashboard();

  const currMonthSpendingData = { currMonthSpending, percentChange };

  if (transactions1m.length === 0) {
    return (
      <div className="p-14">
        <h3 className="mb-1 text-3xl font-medium">
          Welcome to your dashboard!
        </h3>
        <p className="text-xl font-light">
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
        <div className="flex items-start justify-between">
          <h1 className="mb-12 text-3xl">Good Morning</h1>
        </div>

        <div className="mb-12 flex h-64 gap-12">
          {/* CURRENT SPENDING */}
          <div className="flex w-[55%] flex-auto rounded-md border border-black bg-white bg-gradient-to-t from-gradient-blue to-gradient-purple drop-shadow-card">
            <CurrentSpending data={currMonthSpendingData} />
          </div>

          {/* CARD BALANCE */}
          <div className="h-[inherit] w-[45%] flex-auto rounded-md border border-black bg-white drop-shadow-card">
            <CardBalances accounts={accounts} />
          </div>
        </div>

        <div className="flex h-[500px] gap-12">
          {/* RECENT ACTIVITIES */}
          <div className="h-[inherit] w-[70%] rounded-md border border-black bg-white drop-shadow-card">
            <RecentActivites transactions1m={transactions1m} />
          </div>

          <div className="flex w-[30%] flex-col gap-12">
            {/* TOP CATEGORIES */}
            <div className="h-[70%] rounded-md border border-black bg-white drop-shadow-card">
              <TopCategories categories={topCategories} />
            </div>

            {/* more widgets soon */}
            <div className="group relative h-[30%] cursor-default">
              <div className="h-full rounded-md border border-black bg-white opacity-20 drop-shadow-card transition-all duration-300 ease-in-out group-hover:opacity-50"></div>
              <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-center gap-2 p-5 opacity-30 transition-all duration-100 ease-in-out group-hover:opacity-80">
                <SquaresPlusIcon className="w-8" />
                <p className="text-lg font-medium transition-all duration-200 ease-in-out">
                  more widgets soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
