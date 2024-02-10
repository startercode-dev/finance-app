import { useAppDispatch } from '@/store/hooks';
import { fetchTransactionsData } from '@/store/userActions';
import { useState } from 'react';
import { CheckCircle, NotePencil, XCircle } from '@phosphor-icons/react';
import { useRouter } from 'next/router';

export default function TransactionItem({ transaction }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    transaction.activeCategory,
  );

  const options: string[] = [
    ...transaction.category,
    ...Object.values(transaction.personalCategory),
  ];

  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });

  const showEdit = () => {
    setEditMode((prevState) => !prevState);
  };

  const hideEdit = () => {
    setEditMode(false);
    setSelectedOption(transaction.activeCategory);
  };

  const handleSelectionChange = (e) => {
    setSelectedOption(e.target.value);
  };

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

      if (!response.ok) {
        router.reload();
      }

      await dispatch(fetchTransactionsData());
      setEditMode(false);
    } else {
      console.log('didnt change');
    }
  };

  return (
    <li className="grid grid-flow-col grid-cols-16 text-lg mx-2 py-5 border-b border-[#e5e5e5] first:pt-0 last:border-none last:pb-0">
      <p className="col-span-2">{formattedDate}</p>
      <div className="flex flex-col col-span-7">
        <p className="truncate w-[90%]">{transaction.transactionName}</p>
        <p className="text-sm font-light truncate w-[90%]">
          {transaction.account.accountOfficialName}
        </p>
      </div>
      {/* FIX FONT SIZE FOR SMALLER SCREENS */}
      <div className="group flex col-span-5 h-fit items-center">
        {!editMode ? (
          <>
            <div className="flex flex-1 justify-center cursor-pointer opacity-0 group-hover:opacity-100">
              <NotePencil size={22} weight="light" onClick={showEdit} />
            </div>

            <p className="flex-[8] w-full truncate">
              {transaction.activeCategory}
            </p>
          </>
        ) : (
          <>
            <div className="flex-1 flex">
              <XCircle
                size={22}
                weight="light"
                onClick={hideEdit}
                className="text-[#b64343] cursor-pointer"
              />
              <CheckCircle
                size={22}
                weight="light"
                onClick={() => updateActiveCategory(transaction.transactionId)}
                className="text-primary cursor-pointer"
              />
            </div>

            <select
              value={selectedOption}
              onChange={handleSelectionChange}
              className="flex-[8] w-full bg-transparent"
            >
              {options.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <p className="col-span-2 justify-self-end">${transaction.amount}</p>
    </li>
  );
}
