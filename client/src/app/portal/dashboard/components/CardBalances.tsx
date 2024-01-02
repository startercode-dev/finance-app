import Image from 'next/image';

interface Props {
  accounts: [
    {
      id: string;
      accountName: string;
      currentBalance: number;
    },
  ];
}

export default async function CardBalances({ accounts }: Props) {
  return (
    <div className="flex h-full w-full flex-col gap-6 p-5">
      <h2 className="font-title text-2xl tracking-wider">/Card balances</h2>
      <div className="flex flex-col gap-8 overflow-y-auto">
        {accounts.map((account) => {
          return (
            <div key={account.id} className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Image
                  src="/visa.svg"
                  width={20}
                  height={20}
                  alt={'triangle up icon'}
                  className="w-12 rounded"
                />
                <p className="">{account.accountName}</p>
              </div>
              <p className="font-semibold">${account.currentBalance}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
