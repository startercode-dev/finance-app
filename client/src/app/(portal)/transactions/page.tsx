export default function TransactionsPage() {
  return (
    <div className="h-full w-full cursor-default overflow-y-scroll p-12">
      <div className="m-auto max-w-[1600px]">
        <div className="mb-12 flex items-end gap-4">
          <h1 className="font-title text-7xl">Transactions</h1>
          <p className="text-2xl leading-none">
            <span className="font-light">/ all</span>
          </p>
        </div>
      </div>
    </div>
  );
}
