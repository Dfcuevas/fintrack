import TransactionsTable from "@/components/features/TransactionsTable";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { getAllCategories } from "@/lib/getAllCategories";
import { getExpensesByUser } from "@/lib/getExpensesByUser";
import { getOrCreateUser } from "@/lib/getOrCreateUser";

const TransactionsPage = async () => {
  const user = await getOrCreateUser();

  const [allCategories, allTransactions] = await Promise.all([
    getAllCategories(user.id),
    getExpensesByUser(user.id),
  ]);

  if (!user) return null;

  return (
    <>
      <DashboardHeader title="Transactions History" />
      <main className="min-h-screen bg-softBlue p-6">
        <TransactionsTable
          categories={allCategories}
          transactions={allTransactions}
        />
      </main>
    </>
  );
};

export default TransactionsPage;
