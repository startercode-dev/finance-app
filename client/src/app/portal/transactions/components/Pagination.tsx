'use client';

import clsx from 'clsx';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '25';

  const totalPage = Math.ceil(data.totalTransactions / data.currentLimit);
  // console.log(data.currentPage === totalPage - 2);

  return (
    <div className="mt-12 flex w-full justify-center gap-8">
      <button
        onClick={() => {
          router.push(
            `/portal/transactions?page=${Number(page) - 1}&limit=${limit}`,
          );
        }}
        className={clsx(
          'h-10 w-24 rounded border border-black bg-background opacity-100 drop-shadow-card',
          {
            '!opacity-30': data.currentPage < 2,
          },
        )}
        disabled={data.currentPage < 2}
      >
        Previous
      </button>

      <div className="flex items-center gap-2 text-lg">
        <button
          onClick={() => {
            router.push(
              `/portal/transactions?page=${Number(1)}&limit=${limit}`,
            );
          }}
          className={clsx('h-10 w-10', {
            'rounded border border-black bg-white drop-shadow-card':
              data.currentPage === 1,
          })}
        >
          1
        </button>

        {data.currentPage <= 3 && (
          <>
            <button
              onClick={() => {
                router.push(
                  `/portal/transactions?page=${Number(2)}&limit=${limit}`,
                );
              }}
              className={clsx('h-10 w-10', {
                'rounded border border-black bg-white drop-shadow-card':
                  data.currentPage === 2,
              })}
            >
              2
            </button>

            <button
              onClick={() => {
                router.push(
                  `/portal/transactions?page=${Number(3)}&limit=${limit}`,
                );
              }}
              className={clsx('h-10 w-10', {
                'rounded border border-black bg-white drop-shadow-card':
                  data.currentPage === 3,
              })}
            >
              3
            </button>

            <button
              onClick={() => {
                router.push(
                  `/portal/transactions?page=${Number(4)}&limit=${limit}`,
                );
              }}
              className={clsx('h-10 w-10', {
                'rounded border border-black bg-white drop-shadow-card':
                  data.currentPage === 4,
              })}
            >
              4
            </button>
          </>
        )}

        {data.currentPage >= 4 && <p>...</p>}

        {data.currentPage >= 4 && data.currentPage <= totalPage - 3 && (
          <>
            <button
              onClick={() => {
                router.push(
                  `/portal/transactions?page=${
                    data.currentPage - 1
                  }&limit=${limit}`,
                );
              }}
              className={'h-10 w-10'}
            >
              {data.currentPage - 1}
            </button>

            <button className="h-10 w-10 rounded border border-black bg-white  drop-shadow-card">
              {data.currentPage}
            </button>

            <button
              onClick={() => {
                router.push(
                  `/portal/transactions?page=${
                    data.currentPage + 1
                  }&limit=${limit}`,
                );
              }}
              className="h-10 w-10"
            >
              {data.currentPage + 1}
            </button>
          </>
        )}

        {data.currentPage < totalPage - 2 && <p>...</p>}

        {data.currentPage >= totalPage - 2 && (
          <>
            <button
              onClick={() => {
                router.push(
                  `/portal/transactions?page=${totalPage - 3}&limit=${limit}`,
                );
              }}
              className={clsx('h-10 w-10', {
                'rounded border border-black bg-white drop-shadow-card':
                  data.currentPage === totalPage - 3,
              })}
            >
              {totalPage - 3}
            </button>

            <button
              onClick={() => {
                router.push(
                  `/portal/transactions?page=${totalPage - 2}&limit=${limit}`,
                );
              }}
              className={clsx('h-10 w-10', {
                'rounded border border-black bg-white drop-shadow-card':
                  data.currentPage === totalPage - 2,
              })}
            >
              {totalPage - 2}
            </button>
            <button
              onClick={() => {
                router.push(
                  `/portal/transactions?page=${totalPage - 1}&limit=${limit}`,
                );
              }}
              className={clsx('h-10 w-10', {
                'rounded border border-black bg-white drop-shadow-card':
                  data.currentPage === totalPage - 1,
              })}
            >
              {totalPage - 1}
            </button>
          </>
        )}

        <button
          onClick={() => {
            router.push(
              `/portal/transactions?page=${totalPage}&limit=${limit}`,
            );
          }}
          className={clsx('h-10 w-10', {
            'rounded border border-black bg-white drop-shadow-card':
              data.currentPage === totalPage,
          })}
        >
          {totalPage}
        </button>
      </div>

      <button
        onClick={() => {
          router.push(
            `/portal/transactions?page=${Number(page) + 1}&limit=${limit}`,
          );
        }}
        className={clsx(
          'h-10 w-24 rounded border border-black bg-background opacity-100 drop-shadow-card',
          {
            '!opacity-30': data.currentPage >= totalPage,
          },
        )}
        disabled={data.currentPage >= totalPage}
      >
        Next
      </button>
    </div>
  );
}
