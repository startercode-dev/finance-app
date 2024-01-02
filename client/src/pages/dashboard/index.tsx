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
import Chart from 'chart.js/auto';

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

  // console.log(filteredMonth);

  const sumCategories = Object.keys(transactionsByCategory).map((category) => {
    const amounts = transactionsByCategory[category];
    const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);
    return { category, totalAmount };
  });
  // console.log(sumCategories);

  const categories = sumCategories.map((i) => i.category);
  // console.log(categories);

  const sums = sumCategories.map((i) => i.totalAmount);
  // console.log(sums);

  const fireWebhook = async function () {
    try {
      await fetch('/api/fire-webhook', {
        method: 'POST',
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      <Nav />
      <div className="w-full h-[calc(100vh-153px)] grid grid-cols-38/61">
        <div className="grid grid-rows-col1 h-[inhert]">
          <MonthlySpending />
          <div className="card mx-12 mb-12 flex justify-center items-center">
            <div className="w-[99%] h-full">
              <Doughnut
                data={{
                  labels: categories,
                  datasets: [
                    {
                      label: 'Monthly Total',
                      data: sums,
                      backgroundColor: [
                        '#AACA94',
                        '#F4907A',
                        '#5B867A',
                        '#D295A1',
                        '#855E95',
                        '#EDD698',
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
                  layout: {
                    padding: 20,
                  },
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                          family: 'Red Hat Display, Arial, sans-serif',
                          weight: '200',
                        },
                        usePointStyle: true,
                      },
                      position: 'right',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="card mx-12 mb-12"></div>
        </div>

        <div className="grid grid-rows-col2 h-[inherit]">
          <RecentTransaction />

          {/* //* STOCK */}
          <div className="grid grid-cols-3 mr-12 mb-12 gap-x-12">
            <div className="card">
              <button className="border border-dark p-1" onClick={fireWebhook}>
                fire webhook
              </button>
            </div>
            <div className="card"></div>
            <div className="card"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
