import z from "zod";

export const expenseFormSchema = z.object({
  categoryId: z.uuid({ error: "Debe seleccionar una categoría" }),
  amount: z.coerce.number().positive({ error: "El monto debe ser mayor a 0" }),
  description: z.string().min(1, { error: "La descripción es requerida" }).max(255),
  type: z.enum(["expense", "income"], { error: "Debe seleccionar un tipo válido" }),
  date: z.string().min(1, { error: "La fecha es requerida"}),
  notes: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;
