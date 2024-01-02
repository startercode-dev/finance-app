import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TransactionItem from './TransactionItem';
import { fetchAccountsData, fetchTransactionsData } from '@/store/userActions';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

export default function AccountsSummary() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await dispatch(fetchAccountsData());
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (user.accounts.length === 0) {
      init();
    } else {
      setLoading(false);
    }
    return () => {};
  }, []);

  return (
    <div className="grid grid-cols-3 mr-12 mb-12 gap-x-12">
      {user.accounts.slice(1, 4).map((account) => {
        return (
          <div className="card text-2xl p-5">
            <h3>{account.accountName}</h3>
            <p className="text-secondary">${account.currentBalance}</p>
          </div>
        );
      })}
    </div>
  );
}
