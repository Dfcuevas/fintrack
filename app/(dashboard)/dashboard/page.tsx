import ExpensesChart from "@/components/features/ExpensesChart";
import TransactionsOverview from "@/components/features/TransactionsOVerview";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/Button";
import StatsGrid from "@/components/ui/StatsGrid";
import { getExpensesByUser } from "@/lib/getExpensesByUser";
import { getExpenseTotalsByCategory } from "@/lib/getExpenseTotalsByCategory";
import { getOrCreateUser } from "@/lib/getOrCreateUser";

export default async function DashboardPage() {
  const user = await getOrCreateUser();

  if (!user) return null;

  const allTransactions = await getExpensesByUser(user.id);

  const expenses = allTransactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const totals = getExpenseTotalsByCategory(expenses);

  return (
    <>
      <DashboardHeader
        title="Dashboard Overview"
        action={
          <Button href="/transactions/new-transaction" size="xs">
            + Add Transaction
          </Button>
        }
      />
      <section className="p-6 space-y-6 bg-softBlue">
        <StatsGrid />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <ExpensesChart totals={totals} />
          <TransactionsOverview transactions={allTransactions} />
        </div>
      </section>
    </>
  );
}
