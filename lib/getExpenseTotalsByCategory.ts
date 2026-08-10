import { ExpensesWithCategory } from "./getExpensesByUser";

export type CategoryTotal = {
  categoryId: string;
  name: string;
  icon: string;
  color: string;
  total: number;
};

export function getExpenseTotalsByCategory(
  expenses: ExpensesWithCategory,
): CategoryTotal[] {
  const map = new Map<string, CategoryTotal>();

  for (const item of expenses) {
    // Solo gastos (ignora ingresos)
    if (item.type !== "expense") continue;

    const amount = Number(item.amount);
    if (Number.isNaN(amount)) continue;

    const existing = map.get(item.categoryId);

    if (existing) {
      existing.total += amount;
    } else {
      map.set(item.categoryId, {
        categoryId: item.categoryId,
        name: item.category.name,
        icon: item.category.icon,
        color: item.category.color,
        total: amount,
      });
    }
  }
  //Opcional: de mayor a menor gasto
  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}
