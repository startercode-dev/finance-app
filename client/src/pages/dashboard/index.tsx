import { useAppDispatch, useAppSelector } from '@/store/hooks';
import RecentTransaction from '@/components/RecentTransaction';
import MonthlySpending from '@/components/MonthlySpending';
import Nav from '@/components/Nav';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import AccountsSummary from '@/components/AccountsSummary';
import StockBar from '@/components/StockBar';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filteredMonth = user.transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      transactionDate.getMonth() === currentMonth - 1 &&
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

  return (
    <main>
      <StockBar />
      <Nav />
      <div className="w-full h-[calc(100vh-153px)] grid grid-cols-38/61">
        <div className="grid grid-rows-row1 ">
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

        <div className="grid grid-rows-row2 h-[inherit]">
          <RecentTransaction />
          <AccountsSummary />
        </div>
      </div>
    </main>
  );
}
