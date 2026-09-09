import { db } from "./db";
import { expenses } from "@/db/schema";
import { and, count, eq, ilike, inArray, or } from "drizzle-orm";

export async function getExpensesByUser(userId: string) {
  return db.query.expenses.findMany({
    where: (expenses, { eq }) => eq(expenses.userId, userId),
    orderBy: (expenses, { desc }) => [desc(expenses.date)],
    with: {
      category: true,
    },
  });
}

type GetExpensesPageParams = {
  page: number;
  pageSize: number;
  query?: string;
  categoryIds?: string[];
};

export async function getExpensesByUserPage(
  userId: string,
  { page, pageSize, query = "", categoryIds = [] }: GetExpensesPageParams,
) {
  const normalizedQuery = query.trim();
  const offset = (page - 1) * pageSize;

  const filters = [eq(expenses.userId, userId)];

  if (normalizedQuery !== "") {
    filters.push(
      or(
        ilike(expenses.description, `%${normalizedQuery}%`),
        ilike(expenses.notes, `%${normalizedQuery}%`),
      )!,
    );
  }

  if (categoryIds.length > 0) {
    filters.push(inArray(expenses.categoryId, categoryIds));
  }

  const whereClause = filters.length === 1 ? filters[0]! : and(...filters)!;

  const [transactions, totalCountRows] = await Promise.all([
    db.query.expenses.findMany({
      where: (expenses, { and, eq, ilike, inArray, or }) => {
        const whereFilters = [eq(expenses.userId, userId)];

        if (normalizedQuery !== "") {
          whereFilters.push(
            or(
              ilike(expenses.description, `%${normalizedQuery}%`),
              ilike(expenses.notes, `%${normalizedQuery}%`),
            )!,
          );
        }

        if (categoryIds.length > 0) {
          whereFilters.push(inArray(expenses.categoryId, categoryIds));
        }

        return whereFilters.length === 1
          ? whereFilters[0]!
          : and(...whereFilters)!;
      },
      orderBy: (expenses, { desc }) => [desc(expenses.date)],
      limit: pageSize,
      offset,
      with: {
        category: true,
      },
    }),
    db.select({ count: count() }).from(expenses).where(whereClause),
  ]);

  return {
    transactions,
    totalCount: totalCountRows[0]?.count ?? 0,
  };
}

// Lista completa que devuelve el query

export type ExpensesWithCategory = Awaited<
  ReturnType<typeof getExpensesByUser>
>;
