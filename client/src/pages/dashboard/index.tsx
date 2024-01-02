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
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filteredMonth = user.transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });

  const transactionsByCategory = filteredMonth.reduce((acc, transaction) => {
    const { activeCategory, amount } = transaction;
    if (!acc[activeCategory]) {
      acc[activeCategory] = [];
    }
    acc[activeCategory].push(amount);
    return acc;
  }, {});

  const sumCategories = Object.keys(transactionsByCategory).map((category) => {
    const amounts = transactionsByCategory[category];
    const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);
    return { category, totalAmount };
  });
  console.log(sumCategories);

  const categories = sumCategories.map((i) => i.category);
  // console.log(categories);

  const sums = sumCategories.map((i) => i.totalAmount);
  // console.log(sums);

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
          <div className="card mx-12 mb-12 flex justify-center">
            <Doughnut
              data={{
                labels: categories,
                datasets: [
                  {
                    label: 'Monthly Categories',
                    data: sums,
                    backgroundColor: [
                      '#AACA94',
                      '#F4907A',
                      '#5B867A',
                      '#EDD698',
                      '#D295A1',
                      '#855E95',
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{
                responsive: true,
                aspectRatio: 5 / 4,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
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
