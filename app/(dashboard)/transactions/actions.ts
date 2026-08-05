"use server";

import { expenses } from "@/db/schema";
import { db } from "@/lib/db";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { expenseFormSchema } from "@/lib/validations/expense";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateExpenseState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createExpense(
  _prevState: CreateExpenseState,
  formData: FormData,
): Promise<CreateExpenseState | never> {
  const parsed = expenseFormSchema.safeParse({
    categoryId: formData.get("categoryId"),
    amount: formData.get("amount"),
    description: formData.get("description"),
    type: formData.get("type"),
    date: formData.get("date"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const user = await getOrCreateUser();

  await db.insert(expenses).values({
    userId: user.id,
    categoryId: parsed.data.categoryId,
    amount: parsed.data.amount.toString(),
    description: parsed.data.description,
    type: parsed.data.type,
    date: parsed.data.date,
    notes: parsed.data.notes || null,
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
