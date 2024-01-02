import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';

export default function StockBar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex py-2 border-b border-b-dark justify-around">
      <div className="flex gap-2 text-primary items-center font-mono">
        <div className="fill-primary ">
          <svg
            width="18"
            viewBox="0 0 15 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.5 0L14.8612 9.75H0.138784L7.5 0Z" />
          </svg>
        </div>
        <p className="text-dark ">SPY</p>
        <p>0.17%</p>
        <p>(1290)</p>
      </div>

      <div className="flex gap-2 text-secondary items-center font-mono">
        <div className="fill-secondary ">
          <svg
            width="18"
            viewBox="0 0 15 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.5 0L14.8612 9.75H0.138784L7.5 0Z" />
          </svg>
        </div>
        <p className="text-dark ">QQQ</p>
        <p>0.17%</p>
        <p>(1290)</p>
      </div>

      <div className="flex gap-2 text-secondary items-center font-mono">
        <div className="fill-secondary ">
          <svg
            width="18"
            viewBox="0 0 15 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.5 10L0.138785 0.249999L14.8612 0.25L7.5 10Z" />
          </svg>
        </div>
        <p className="text-dark ">USD/JPY</p>
        <p>0.17%</p>
        <p>(1290)</p>
      </div>

      <div className="flex gap-2 text-primary items-center font-mono">
        <div className="fill-primary ">
          <svg
            width="18"
            viewBox="0 0 15 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.5 0L14.8612 9.75H0.138784L7.5 0Z" />
          </svg>
        </div>
        <p className="text-dark ">US-10Y</p>
        <p>0.17%</p>
        <p>(1290)</p>
      </div>
    </div>
  );
}
