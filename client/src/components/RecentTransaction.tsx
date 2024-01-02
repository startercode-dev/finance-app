import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TransactionItem from './TransactionItem';
import { getTransactionsData } from '@/store/userActions';
import { useEffect } from 'react';
import { ArrowsClockwise } from '@phosphor-icons/react';

export default function RecentTransaction() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const getTransactions = async () => {
    try {
      await fetch('/api/get-transactions', {
        method: 'GET',
      });

      dispatch(getTransactionsData());

      // console.log('success');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getTransactions();
  }, []);

  return (
    <div className="card mr-12 mb-12 flex flex-col text-2xl p-8">
      <div className="flex mb-6 items-center gap-6">
        {user.transactions && user.transactions.length > 0 ? (
          <>
            <h3 className="font-medium">Recent Activities</h3>
            <ArrowsClockwise
              size={22}
              className="cursor-pointer text-secondary hover:rotate-180 transition-all duration-300"
              onClick={getTransactions}
            />
          </>
        ) : (
          <div>
            <h3 className="font-medium text-3xl mb-1">
              Welcome to your dashboard!
            </h3>
            <p className="text-xl font-light">
              Let&#39;s get started by syncing up all your transactions.
            </p>
          </div>
        )}
      </div>

      <ul className="overflow-y-auto">
        {user.transactions && user.transactions.length > 0 ? (
          user.transactions.slice(10, 30).map((transaction) => {
            return (
              <TransactionItem
                key={transaction.transactionId}
                transaction={transaction}
              />
            );
          })
        ) : (
          <button
            onClick={getTransactions}
            className="border border-primary bg-primary text-lg text-white rounded-md px-8 py-2 hover:text-primary hover:bg-white transition-all"
          >
            Sync transactions !
          </button>
        )}
      </ul>
    </div>
  );
}
