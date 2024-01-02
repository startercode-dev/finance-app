import Nav from '@/components/Nav';
import StockBar from '@/components/StockBar';
import TransactionItem from '@/components/TransactionItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTransactionsData } from '@/store/userActions';
import { useEffect, useState } from 'react';

export default function Transactions() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const sorted = user.transactions
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  //! make sure to load account summary if user refresh in transaction page
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
    <>
      <StockBar />
      <Nav />
      <div className="grid grid-rows-col3 h-[calc(100vh-153px)]">
        <div className="grid grid-cols-4 gap-8 px-[3rem] pb-8">
          {user.accounts.map((account) => {
            return (
              <div
                key={account.accountId}
                className="card flex flex-col justify-center text-xl px-8 py-2 "
              >
                <h3>{account.accountName}</h3>
                <p className="text-primary">${account.currentBalance}</p>
              </div>
            );
          })}
        </div>
        <div className="card flex flex-col mx-12 mb-12 p-8">
          <h2 className="text-2xl pb-4">All Transactions</h2>
          <div className="grid grid-cols-16 pb-4 mx-2 text-secondary">
            <p className="col-span-2">Date</p>
            <p className="col-span-7">Name</p>
            <div className="flex col-span-5">
              <p className="flex-1"></p>
              <p className="flex-[8]">Category</p>
            </div>
            <p className="col-span-2 justify-self-end">Amount</p>
          </div>
          <ul className="overflow-y-auto">
            {!loading &&
              user.transactions.length > 0 &&
              sorted.map((transaction) => {
                return (
                  <TransactionItem
                    key={transaction.transactionId}
                    transaction={transaction}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
