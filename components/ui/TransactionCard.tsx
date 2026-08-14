import { ExpensesWithCategory } from "@/lib/getExpensesByUser";

type ExpenseWithCategory = ExpensesWithCategory[number];

const TransactionCard = ({ tx }: { tx: ExpenseWithCategory }) => {
  return <div>TransactionCard</div>;
};

export default TransactionCard;
