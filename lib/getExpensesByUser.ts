import { db } from "./db";

export async function getExpensesByUser(userId: string) {
  return db.query.expenses.findMany({
    where: (expenses, { eq }) => eq(expenses.userId, userId),
    with: {
      category: true,
    },
  });
}

// Lista completa que devuelve el query

export type ExpensesWithCategory = Awaited<
  ReturnType<typeof getExpensesByUser>
>;
