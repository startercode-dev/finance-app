'use client';

import { initFetch } from '../actions';

export default function InitFetchBtn() {
  return (
    <button
      onClick={() => initFetch()}
      className="mt-5 rounded-md border border-black bg-primary px-8 py-2 text-lg text-black drop-shadow-card transition-all hover:bg-white hover:text-primary"
    >
      Sync !
    </button>
  );
}
