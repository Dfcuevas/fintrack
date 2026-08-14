import { ExpensesWithCategory } from "@/lib/getExpensesByUser";
import Link from "next/link";
import TransactionCard from "../ui/TransactionCard";

export default function TransactionsOverview({
  transactions,
}: {
  transactions: ExpensesWithCategory
}) {
  const recentTransactions = transactions.slice(0, 5);
  return (
    <section className="col-span-1 rounded-xl bg-white p-6 max-w">
      <div className="flex justify-start gap-6 lg:justify-between items-center border-b border-stroke pb-4">
        <h2 className=" text-2xl font-bold">Transacciones</h2>
        <Link href="/transactions">Ver todas</Link>
      </div>
      {recentTransactions.map((tx) => (
        <TransactionCard key={tx.id} tx={tx} />
      ))}
    </section>
  );
}
