'use client';

import {
  PencilSquareIcon,
  XCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TransactionItem({ transaction }) {
  const [editMode, setEditMode] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    transaction.activeCategory,
  );

  const router = useRouter();
  // let [isPending, startTransition] = useTransition();

  const options: string[] = [
    ...transaction.category,
    ...Object.values(transaction.personalCategory),
  ];

  const handleSelectionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  //! router.refresh() unwanted behavior, data should only refresh once
  const updateActiveCategory = async (transactionId) => {
    if (transaction.activeCategory !== selectedOption) {
      const body = JSON.stringify({ transactionId, selectedOption });
      const response = await fetch('/api/update-transaction', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const { status } = await response.json();
      // console.log(status);

      if (status === 'error') {
        console.log('update failed');
        return;
      }

      router.refresh();
      setEditMode(false);
    } else {
      console.log('didnt change');
    }
  };

  const showEdit = () => {
    setEditMode((prevState) => !prevState);
  };

  const hideEdit = () => {
    setEditMode(false);
    setSelectedOption(transaction.activeCategory);
  };

  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <li className="grid grid-cols-[1fr_4fr_2fr_1fr] border-b border-black border-opacity-20 last:border-none">
      <p className="py-4">{formattedDate}</p>
      <div className="flex flex-col py-4">
        <p className="">{transaction.transactionName}</p>
        <p className="font-light">{transaction.account.accountOfficialName}</p>
      </div>
      <div className="group py-4">
        {!editMode ? (
          <div className="flex items-center gap-4">
            <p className="w-fit">{transaction.activeCategory}</p>
            <div className="cursor-pointer justify-center opacity-0 group-hover:opacity-80">
              <PencilSquareIcon onClick={showEdit} className="w-5" />
            </div>
          </div>
        ) : (
          <div className="flex">
            <select
              value={selectedOption}
              onChange={handleSelectionChange}
              className="w-full bg-transparent"
            >
              {options.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>

            <div className="flex flex-1">
              <XCircleIcon
                onClick={hideEdit}
                className="w-6 cursor-pointer text-[#b64343]"
              />
              <CheckCircleIcon
                onClick={() => updateActiveCategory(transaction.transactionId)}
                className="w-6 cursor-pointer text-primary"
              />
            </div>
          </div>
        )}
      </div>
      <p className="py-4 text-right">${transaction.amount}</p>
    </li>
  );
}
