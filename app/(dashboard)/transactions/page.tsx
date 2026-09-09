import TransactionsTable from "@/components/features/TransactionsTable";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { getAllCategories } from "@/lib/getAllCategories";
import { getExpensesByUserPage } from "@/lib/getExpensesByUser";
import { getOrCreateUser } from "@/lib/getOrCreateUser";

const PAGE_SIZE = 5;

type TransactionsPageProps = {
  searchParams: Promise<{
    page?: string;
    query?: string;
    category?: string;
  }>;
};

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const currentPage = Number.isNaN(page) || page < 1 ? 1 : page;
  const query = params.query?.trim() ?? "";
  const selectedCategory = params.category ?? "Todas";
  const user = await getOrCreateUser();
  const allCategories = await getAllCategories(user.id);

  const categoryIds = selectedCategory === "Todas" ? [] : [selectedCategory];

  const { transactions, totalCount } = await getExpensesByUserPage(user.id, {
    page: currentPage,
    pageSize: PAGE_SIZE,
    query,
    categoryIds,
  });


  return (
    <>
      <DashboardHeader title="Transactions History" />
      <main className="min-h-screen bg-softBlue p-6">
        <TransactionsTable
          categories={allCategories}
          transactions={transactions}
          currentPage={currentPage}
          totalCount={totalCount}
          query={query}
          selectedCategory={selectedCategory}
        />
      </main>
    </>
  );
};

export default TransactionsPage;
