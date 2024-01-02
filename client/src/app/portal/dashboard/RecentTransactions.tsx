import { cookies } from 'next/headers';
import TransactionItem from './TransactionItem';

async function getTransactions() {
  const token = cookies().get('auth');

  const res = await fetch('http://localhost:8000/api/v1/transaction/get-all', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`,
    },
    cache: 'no-cache',
  });
  return res.json();
}

export default async function RecentTransactions() {
  const { transactions } = await getTransactions();

  return (
    <div className="h-[inherit] w-[70%] rounded-md border border-black bg-white drop-shadow-card">
      <div className="flex h-[inherit] flex-col gap-4 p-5">
        <h2 className="text-2xl">Recent Activities</h2>

        <div className="grid grid-cols-[1fr_4fr_2fr_1fr]">
          <h3 className="font-semibold">Date</h3>
          <h3 className="font-semibold">Name</h3>
          <h3 className="font-semibold">Category</h3>
          <h3 className="text-right font-semibold">Amount</h3>
        </div>

        <ul className="overflow-y-auto">
          {transactions.map((transaction) => {
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
  );
}
