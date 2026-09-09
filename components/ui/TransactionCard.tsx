import { formatMoney } from "@/lib/formatMoney";
import { ExpensesWithCategory } from "@/lib/getExpensesByUser";

type ExpenseWithCategory = ExpensesWithCategory[number];

const TransactionCard = ({ tx }: { tx: ExpenseWithCategory }) => {
  const categoryData = tx.category;
  return (
    <div className="flex gap-6 py-6 justify-between lg:justify-between items-center border-b border-stroke">
      <span className="text-4xl">{categoryData.icon}</span>
      <div className="flex flex-col gap-1 items-center text-center">
        <p className="font-bold text-base">
          {tx.description}
        </p>
        <span className="text-xs text-secondary font-semibold">{tx.date}</span>
      </div>
      <div className="flex flex-col items-end">
        <p style={{ color: tx.type === 'expense' ? "red" : "green", fontWeight: "bold" }}>{`${tx.type === 'expense' ? '-' : '+'}${formatMoney(Number(tx.amount))}`}
        </p>
        <span className="text-xs text-secondary font-semibold">{tx.category.name}</span>
      </div>
    </div>
  );
};

export default TransactionCard;
