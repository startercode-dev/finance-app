import { useAppSelector } from '@/store/hooks';

export default function MonthlySpending() {
  const user = useAppSelector((state) => state.user);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filtered = user.transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });

  const totalSpending = filtered
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);
  // console.log(totalSpending);

  return (
    <div className="card mx-12 mb-12 flex flex-col justify-center items-center gap-3">
      <h3 className="text-2xl">Monthly Spendings</h3>
      <p className="text-3xl text-primary">${totalSpending}</p>
    </div>
  );
}
