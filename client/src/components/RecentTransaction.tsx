import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TransactionItem from './TransactionItem';
import { fetchTransactionsData } from '@/store/userActions';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

export default function RecentTransaction() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const currentDate = new Date();
  const [loading, setLoading] = useState(true);

  // SORT TRANSACTION ARRAY
  const sorted = user.transactions
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // FILTER LAST 30d TRANSACTION
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);
  const last30DaysTransactions = sorted.filter((t) => {
    const transactionDate = new Date(t.date);
    return transactionDate >= last30Days;
  });
  // console.log(last30DaysTransactions);

  // FORMAT DATE xx/xx/xx
  const formatDate = function (date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const endDate = formatDate(currentDate);

  // GET 1m ago date
  const getStartDate1m = function () {
    const monthsAgo = currentDate.getMonth() - 1;
    currentDate.setMonth(monthsAgo);
    return currentDate;
  };

  // GET 24m ago date
  const getStartDate24m = function () {
    const monthsAgo = currentDate.getMonth() - 24;
    currentDate.setMonth(monthsAgo);
    return currentDate;
  };

  const getTransactions1m = async () => {
    setLoading(true);
    const startDate = formatDate(getStartDate1m());
    // console.log(startDate, endDate);

    const body = {
      endDate,
      startDate,
    };

    try {
      await fetch('/api/get-transactions', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      await dispatch(fetchTransactionsData());

      // console.log('success');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getTransactions24m = async () => {
    setLoading(true);
    const startDate = formatDate(getStartDate24m());
    // console.log(startDate, endDate);

    const body = {
      endDate,
      startDate,
    };
    try {
      await fetch('/api/get-transactions', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      await dispatch(fetchTransactionsData());
      // console.log('success');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await dispatch(fetchTransactionsData());
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (user.transactions.length === 0) {
      init();
    } else {
      setLoading(false);
    }
    return () => {};
  }, []);

  return (
    <div className="card mr-12 mb-12 flex flex-col text-2xl p-8">
      <div className="flex mb-6 items-center gap-6">
        {loading ? (
          <h2>loading</h2>
        ) : user.transactions.length > 0 ? (
          <>
            <h3 className="font-medium">Recent Activities</h3>
            <ArrowsClockwise
              size={22}
              className="cursor-pointer text-secondary hover:rotate-180 transition-all duration-300"
              onClick={getTransactions1m}
            />
          </>
        ) : (
          <div>
            <h3 className="font-medium text-3xl mb-1">
              Welcome to your dashboard!
            </h3>
            <p className="text-xl font-light">
              Let&#39;s get started by syncing up all your transactions from
              past 24 months.
            </p>
            <button
              onClick={getTransactions24m}
              className="mt-5 border border-primary bg-primary text-lg text-white rounded-md px-8 py-2 hover:text-primary hover:bg-white transition-all"
            >
              Sync transactions !
            </button>
          </div>
        )}
      </div>

      <ul className="overflow-y-auto">
        {!loading &&
          user.transactions.length > 0 &&
          last30DaysTransactions.map((transaction) => {
            return (
              <TransactionItem
                key={transaction.transactionId}
                transaction={transaction}
              />
            );
          })}
      </ul>
    </div>
  );
}
