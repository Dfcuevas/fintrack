import { ExpensesWithCategory } from "@/lib/getExpensesByUser";
import Link from "next/link";
import TransactionCard from "../ui/TransactionCard";

export default function TransactionsOverview({
  expenses,
}: {
  expenses: ExpensesWithCategory;
}) {
  const recentExpenses = expenses.slice(0, 5);
  return (
    <section className="col-span-1 rounded-xl bg-white p-6">
      <div className="flex justify-between items-center border-b border-stroke pb-4">
        <h2 className=" text-2xl font-bold mb-4">Transacciones</h2>
        <Link href="/transactions">Ver todas</Link>
      </div>
      <div>
        {recentExpenses.map((tx) => (
          <TransactionCard key={tx.id} tx={tx} />
        ))}
      </div>
    </section>
  );
}
