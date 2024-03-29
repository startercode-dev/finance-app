'use client';

import {
  PencilSquareIcon,
  XCircleIcon,
  CheckCircleIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import { useState, useTransition } from 'react';
import { updateActiveCategory } from '../actions';

interface Transaction {
  transactionId: string;
  activeCategory: string;
  date: string;
  category: string[];
  merchantLogoUrl: string;
  transactionName: string;
  account: { id: string; accountOfficialName: string };
  amount: number;
}

export default function TransactionItem({
  transaction,
  showYear,
}: {
  transaction: Transaction;
  showYear: boolean;
}) {
  const [editMode, setEditMode] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    transaction.activeCategory,
  );
  const [isPending, startTransition] = useTransition();

  const showEdit = () => {
    setEditMode((prevState) => !prevState);
  };

  const hideEdit = () => {
    setEditMode(false);
    setSelectedOption(transaction.activeCategory);
  };

  const date = new Date(transaction.date);
  let formattedDate;
  if (showYear) {
    formattedDate = date.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
    });
  } else {
    formattedDate = date.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      month: 'numeric',
      day: 'numeric',
    });
  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <li
      key={transaction.transactionId}
      className="grid grid-cols-[1fr_5fr_2fr_1fr] border-b border-black border-opacity-20 last:border-none"
    >
      <p className="py-4">{formattedDate}</p>
      <div className="flex items-center gap-4">
        {transaction.merchantLogoUrl ? (
          <img
            src={transaction.merchantLogoUrl}
            alt="merchant logo"
            className="h-10 w-10 rounded"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300">
            <ArrowUpRightIcon className="w-5 text-neutral-600" />
          </div>
        )}

        <div className="flex flex-col py-4">
          <p className="font-medium">{transaction.transactionName}</p>
          <p className="font-extralight">
            {transaction.account.accountOfficialName}
          </p>
        </div>
      </div>

      <div className="group py-4">
        {editMode ? (
          <div className="flex justify-center">
            {isPending ? (
              <p className="pr-9">saving...</p>
            ) : (
              <>
                <select
                  value={selectedOption}
                  onChange={handleSelectionChange}
                  className="w-full bg-transparent focus:outline-none"
                >
                  {transaction.category.map((i) => (
                    <option key={i} value={i} className="text-center">
                      {i}
                    </option>
                  ))}
                </select>

                <div className="flex flex-1">
                  <XCircleIcon
                    onClick={hideEdit}
                    className="w-6 cursor-pointer text-red"
                  />
                  <button
                    onClick={() =>
                      startTransition(() => {
                        updateActiveCategory(
                          transaction.transactionId,
                          selectedOption,
                        );
                        setEditMode(false);
                      })
                    }
                    className="cursor-pointer text-primary disabled:cursor-default disabled:text-gray-300"
                    disabled={transaction.activeCategory === selectedOption}
                  >
                    <CheckCircleIcon className="w-6" />
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <p className="w-fit text-center">{transaction.activeCategory}</p>
            <div className="cursor-pointer justify-center opacity-0 group-hover:opacity-80">
              <PencilSquareIcon onClick={showEdit} className="w-5" />
            </div>
          </div>
        )}
      </div>

      <p className="py-4 text-right">${transaction.amount}</p>
    </li>
  );
}
