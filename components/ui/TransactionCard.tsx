import { ExpensesWithCategory } from "@/lib/getExpensesByUser";

type ExpenseWithCategory = ExpensesWithCategory[number];

const TransactionCard = ({ tx }: { tx: ExpenseWithCategory }) => {
  const categoryData = tx.category;
  console.log(categoryData); // Log the category data to the console
  return (
    <div className="flex gap-6 py-6 justify-start lg:justify-between items-center border-b border-stroke">
      <span>{categoryData.icon}</span>
      <p className="flex flex-col gap-1 items-center text-center">
        {tx.description}
        <span>{tx.date}</span>
        <span>{tx.type}</span>
      </p>
      <p>{tx.amount}</p>
    </div>
  );
};

export default TransactionCard;
