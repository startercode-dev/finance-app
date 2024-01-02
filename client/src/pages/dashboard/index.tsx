import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getAccountsData,
  getTransactionsData,
  getUserData,
} from '@/store/userActions';
import { useEffect } from 'react';
import RecentTransaction from '@/components/RecentTransaction';
import MonthlySpending from '@/components/MonthlySpending';
import Nav from '@/components/Nav';

export default function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        dispatch(getUserData());
        dispatch(getTransactionsData());
        // dispatch(getAccountsData());
      } catch (error) {
        console.log(error);
      }
    };

    init();
    return () => {};
  }, []);

  return (
    <main>
      <Nav />
      <div className="w-full h-[calc(100vh-144px)] grid grid-cols-38/61">
        <div className="grid grid-rows-col1 h-[inhert]">
          <MonthlySpending />
          <div className="card mx-12 mb-12"></div>
          <div className="card mx-12 mb-12"></div>
        </div>

        <div className="grid grid-rows-col2 h-[inherit]">
          <RecentTransaction />

          {/* //* STOCK */}
          <div className="grid grid-cols-3 mr-12 mb-12 gap-x-12">
            <div className="card mb-6"></div>
            <div className="card mb-6"></div>
            <div className="card mb-6"></div>
            <div className="card mt-6"></div>
            <div className="card mt-6"></div>
            <div className="card mt-6"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
