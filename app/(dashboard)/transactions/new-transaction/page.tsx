import { ExpenseForm } from "@/components/features/ExpenseForm";
import { getOrCreateUser, queryCategories } from "@/lib/getOrCreateUser";

const NewTransactionPage = async () => {
  const userData = await getOrCreateUser();
  const categories = await queryCategories(userData.id);
  return (
    <section className="flex flex-col justify-center items-center w-full h-full bg-accent">
      <ExpenseForm categories={categories} />
    </section>
  );
};

export default NewTransactionPage;
