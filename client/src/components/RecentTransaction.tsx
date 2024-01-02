import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TransactionItem from './TransactionItem';
import { getTransactionsData } from '@/store/userActions';
import { ArrowsClockwise } from '@phosphor-icons/react';

export default function RecentTransaction() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filtered = user.transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });

  const last15Days = new Date();
  last15Days.setDate(last15Days.getDate() - 15);
  const last15DaysTransactions = user.transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return transactionDate >= last15Days;
  });
  // console.log(last15DaysTransactions);

  const formatDate = function (date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const endDate = formatDate(currentDate);

  //* UPDATES DB WITH NEW TRANSACTIONS
  const getStartDate1m = function () {
    const monthsAgo = currentDate.getMonth() - 1;
    currentDate.setMonth(monthsAgo);
    return currentDate;
  };

  const getStartDate24m = function () {
    const monthsAgo = currentDate.getMonth() - 24;
    currentDate.setMonth(monthsAgo);
    return currentDate;
  };

  const getTransactions1m = async () => {
    const startDate = formatDate(getStartDate1m());
    console.log(startDate, endDate);

    const body = {
      endDate,
      startDate,
    };

    try {
      await fetch('/api/get-transactions', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      dispatch(getTransactionsData());

      // console.log('success');
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions24m = async () => {
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

      dispatch(getTransactionsData());

      // console.log('success');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card mr-12 mb-12 flex flex-col text-2xl p-8">
      <div className="flex mb-6 items-center gap-6">
        {user.transactions && user.transactions.length > 0 ? (
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
          </div>
        )}
      </div>

      <ul className="overflow-y-auto">
        {user.transactions && user.transactions.length > 0 ? (
          last15DaysTransactions.map((transaction) => {
            return (
              <TransactionItem
                key={transaction.transactionId}
                transaction={transaction}
              />
            );
          })
        ) : (
          <button
            onClick={getTransactions24m}
            className="border border-primary bg-primary text-lg text-white rounded-md px-8 py-2 hover:text-primary hover:bg-white transition-all"
          >
            Sync transactions !
          </button>
        )}
      </ul>
    </div>
  );
}
