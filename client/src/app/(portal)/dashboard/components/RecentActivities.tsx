import { ArrowPathIcon } from '@heroicons/react/24/outline';
import TransactionItem from './TransactionItem';

export default async function RecentActivites({ transactions1m }) {
  return (
    <div className="flex h-[inherit] flex-col gap-4 p-5">
      <div className="flex items-center gap-5">
        <h2 className="text-2xl">Recent Activities</h2>
        <div className="group flex h-full cursor-pointer items-center">
          <ArrowPathIcon className="w-5 transition-all duration-300 group-hover:rotate-180" />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_5fr_2fr_1fr]">
        <h3 className="font-semibold">Date</h3>
        <h3 className="font-semibold">Name</h3>
        <h3 className="pr-9 text-center font-semibold">Category</h3>
        <h3 className="text-right font-semibold">Amount</h3>
      </div>

      <ul className="overflow-y-auto">
        {transactions1m.map((transaction) => {
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
