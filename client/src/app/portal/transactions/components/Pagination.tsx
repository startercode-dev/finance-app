'use client';

import clsx from 'clsx';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '20';

  const totalPage = Math.ceil(data.totalTransactions / data.currentLimit);

  const staticButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => {
            router.push(
              `/portal/transactions?page=${Number(i)}&limit=${limit}`,
            );
          }}
          className={clsx('h-10 w-10 hover:text-primary', {
            'rounded border border-black bg-white drop-shadow-card hover:text-primary':
              data.currentPage === i,
          })}
        >
          {i}
        </button>,
      );
    }

    return buttons;
  };

  return (
    <div className="mt-12 flex w-full justify-center gap-8">
      <button
        onClick={() => {
          router.push(
            `/portal/transactions?page=${Number(page) - 1}&limit=${limit}`,
          );
        }}
        className={clsx(
          'h-10 w-24 rounded border border-black bg-background opacity-100 drop-shadow-card hover:bg-white hover:text-primary',
          {
            '!opacity-30 hover:!text-black': data.currentPage < 2,
          },
        )}
        disabled={data.currentPage < 2}
      >
        Previous
      </button>

      {totalPage >= 6 ? (
        <div className="flex items-center gap-2 text-lg">
          <button
            onClick={() => {
              router.push(
                `/portal/transactions?page=${Number(1)}&limit=${limit}`,
              );
            }}
            className={clsx('h-10 w-10 hover:text-primary', {
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
                className={clsx('h-10 w-10 hover:text-primary', {
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
                className={clsx('h-10 w-10 hover:text-primary', {
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
                className={clsx('h-10 w-10 hover:text-primary', {
                  'rounded border border-black bg-white drop-shadow-card':
                    data.currentPage === 4,
                })}
              >
                4
              </button>
            </>
          )}

          {data.currentPage >= 4 && totalPage > 4 && <p>...</p>}

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
                className={'h-10 w-10 hover:text-primary'}
              >
                {data.currentPage - 1}
              </button>

              <button className="h-10 w-10 rounded border border-black bg-white drop-shadow-card hover:text-primary">
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
                className="h-10 w-10 hover:text-primary"
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
                className={clsx('h-10 w-10 hover:text-primary', {
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
                className={clsx('h-10 w-10 hover:text-primary', {
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
                className={clsx('h-10 w-10 hover:text-primary', {
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
            className={clsx('h-10 w-10 hover:text-primary', {
              'rounded border border-black bg-white drop-shadow-card':
                data.currentPage === totalPage,
            })}
          >
            {totalPage}
          </button>
        </div>
      ) : (
        <div>{staticButtons()}</div>
      )}

      <button
        onClick={() => {
          router.push(
            `/portal/transactions?page=${Number(page) + 1}&limit=${limit}`,
          );
        }}
        className={clsx(
          'h-10 w-24 rounded border border-black bg-background opacity-100 drop-shadow-card hover:bg-white hover:text-primary',
          {
            '!opacity-30 hover:!text-black': data.currentPage >= totalPage,
          },
        )}
        disabled={data.currentPage >= totalPage}
      >
        Next
      </button>
    </div>
  );
}
