import { cookies } from 'next/headers';
import TransactionItem from '@/app/portal/dashboard/components/TransactionItem';
import Pagination from './components/Pagination';

async function fetchTransactions(page: number, limit: number) {
  const token = cookies().get('auth');

  const res = await fetch(
    `http://localhost:8000/api/v1/transaction/get?page=${page}&limit=${limit}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      cache: 'no-store',
    },
  );

  return res.json();
}

export default async function TransactionsPage({ searchParams }) {
  const page = searchParams['page'] ?? '1';
  const limit = searchParams['limit'] ?? '20';

  const { currentPage, currentLimit, transactions, totalTransactions } =
    await fetchTransactions(page, limit);

  const pagination = { currentLimit, currentPage, totalTransactions };

  return (
    <div className="h-full w-full cursor-default overflow-y-scroll p-12">
      <div className="m-auto max-w-[1600px]">
        <div className="mb-12 flex items-end gap-4">
          <h1 className="font-title text-7xl">Transactions</h1>
          <p className="text-2xl leading-none">
            <span className="font-light">~/ all</span>
          </p>
        </div>

        <div className="h-full w-full rounded-md border border-black bg-white drop-shadow-card">
          <div className="sm-h:h-[950px] flex h-[560px] flex-col p-5">
            <div className="grid grid-cols-[1fr_5fr_2fr_1fr] border-b border-gray-500 pb-2">
              <h3 className="font-semibold">Date</h3>
              <h3 className="font-semibold">Name</h3>
              <h3 className="pr-9 text-center font-semibold">Category</h3>
              <h3 className="text-right font-semibold">Amount</h3>
            </div>

            <ul className="overflow-y-auto">
              {transactions.map((transaction) => {
                return (
                  <TransactionItem
                    key={transaction.transactionId}
                    transaction={transaction}
                    showYear={true}
                  />
                );
              })}
            </ul>
          </div>
        </div>

        <Pagination data={pagination} />
      </div>
    </div>
  );
}
