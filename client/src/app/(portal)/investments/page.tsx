export default function InvestmentsPage() {
  return (
    <div className="h-full w-full cursor-default overflow-y-scroll p-12">
      <div className="m-auto max-w-[1600px]">
        <div className="mb-12 flex items-end gap-4">
          <h1 className="font-title text-7xl">Investments</h1>
          <p className="text-2xl leading-none">
            <span className="font-light">/ cash money</span>
          </p>
        </div>
      </div>
      <div className="group relative h-24 w-80 cursor-default">
        <div className="h-full rounded-md border border-black bg-white opacity-40 drop-shadow-card transition-all duration-300 ease-in-out group-hover:opacity-50"></div>
        <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-center gap-2 p-5 opacity-30 transition-all duration-100 ease-in-out group-hover:opacity-80">
          <p className="text-lg font-medium transition-all duration-200 ease-in-out">
            coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}
