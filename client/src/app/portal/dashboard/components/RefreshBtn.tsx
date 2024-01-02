'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { syncPlaidData } from '../actions';

export default function RefreshBtn() {
  return (
    <div
      onClick={() => {
        syncPlaidData();
      }}
      className="group flex h-full cursor-pointer items-center"
    >
      <ArrowPathIcon className="mt-[0.4rem] w-5 transition-all duration-300 group-hover:rotate-180" />
    </div>
  );
}
