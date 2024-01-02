import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import RecentTransactions from './RecentTransactions';

export default function DashboardPage() {
  return (
    <div className="h-full w-full overflow-y-scroll p-12">
      <div className="m-auto max-w-[1600px]">
        <div className="flex items-start justify-between">
          <h1 className="mb-12 text-3xl">Good Morning</h1>
        </div>

        <div className="mb-12 flex h-64 gap-12">
          <div className="flex w-[55%] flex-auto rounded-md border border-black bg-white bg-gradient-to-t from-gradient-blue to-gradient-purple drop-shadow-card">
            <div className="flex flex-none flex-col gap-3 p-5">
              <h2 className="text-2xl">Current spending</h2>
              <div className="text-4xl font-medium">$2389.28</div>
              <div className="flex gap-2">
                <Image
                  src="/triangleUp.svg"
                  width={20}
                  height={20}
                  alt={'triangle up icon'}
                  className="h-auto w-auto"
                />
                <div className="text-xl">3.2%</div>
              </div>
            </div>

            <div className="h-4/5 w-full flex-grow self-end">
              {/* MONTHLY BART CHART */}
            </div>
          </div>

          <div className="h-[inherit] w-[45%] flex-auto rounded-md border border-black bg-white drop-shadow-card">
            <div className="flex h-[inherit] w-full flex-col gap-4 p-5">
              <h2 className="text-2xl">Card balances</h2>
              <div className="flex flex-col gap-6 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="h-10 w-14 bg-red-800"></div>
                    <p className="text-lg">Chase 0.1% Interest Saving</p>
                  </div>
                  <p className="text-xl font-medium">$231.92</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="h-10 w-14 bg-red-800"></div>
                    <p className="text-lg">Chase 0.1% Interest Saving</p>
                  </div>
                  <p className="text-xl font-medium">$231.92</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="h-10 w-14 bg-red-800"></div>
                    <p className="text-lg">Chase 0.1% Interest Saving</p>
                  </div>
                  <p className="text-xl font-medium">$231.92</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="h-10 w-14 bg-red-800"></div>
                    <p className="text-lg">Chase 0.1% Interest Saving</p>
                  </div>
                  <p className="text-xl font-medium">$231.92</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="h-10 w-14 bg-red-800"></div>
                    <p className="text-lg">Chase 0.1% Interest Saving</p>
                  </div>
                  <p className="text-xl font-medium">$231.92</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[500px] gap-12">
          <RecentTransactions />

          <div className="flex w-[30%] flex-col gap-12">
            <div className="h-[70%] rounded-md border border-black bg-white drop-shadow-card">
              <div className="flex flex-col gap-4 p-5">
                <h2 className="text-2xl">Recurring Charges</h2>

                <ul className="overflow-y-auto">
                  <li className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-green-800"></div>
                      <p>Spotify</p>
                    </div>
                    <p>$9.99</p>
                  </li>

                  <li className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-green-800"></div>
                      <p>Netflix</p>
                    </div>
                    <p>$9.99</p>
                  </li>

                  <li className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-green-800"></div>
                      <p>City Sports</p>
                    </div>
                    <p>$9.99</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="group relative h-[30%] cursor-default">
              <div className="h-full rounded-md border border-black bg-white opacity-20 drop-shadow-card transition-all duration-300 ease-in-out group-hover:opacity-50"></div>

              <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-center gap-2 p-5 opacity-30 transition-all duration-100 ease-in-out group-hover:opacity-80">
                <SquaresPlusIcon className="w-8" />
                <p className="text-lg font-medium transition-all duration-200 ease-in-out group-hover:text-xl">
                  more widgets soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
