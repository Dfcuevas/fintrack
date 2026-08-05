"use client";
import {
  createExpense,
  type CreateExpenseState,
} from "@/app/(dashboard)/transactions/actions";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

const initialState: CreateExpenseState = {};

export function ExpenseForm({
  categories,
}: {
  categories: { id: string; name: string; icon: string; type: string }[];
}) {
  const [state, formAction, isPending] = useActionState(
    createExpense,
    initialState,
  );

  return (
    <section className="bg-white rounded-lg p-6 border border-stroke shadow-header">
      <div className="flex flex-col gap-1 pb-6 border-b-accent border-b">
        <h1 className="text-dark-blue font-semibold text-[32px]">
          Nueva transaccion
        </h1>
        <p className="text-sm text-secondary">
          Registra tus movimientos financieros con precisión
        </p>
      </div>
      <form action={formAction} className="flex flex-col gap-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipo: expense o income */}
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="type"
              className="text-sm font-semibold text-secondary"
            >
              Tipo de movimiento
            </label>
            <select name="type" id="type" className="outline-1 outline-stroke rounded py-3 px-4">
              <option value="income">Ingreso</option>
              <option value="expense">Gasto</option>
            </select>
            {state.errors?.type && (
              <p className="text-red-500 text-sm">{state.errors.type[0]}</p>
            )}
          </div>

          {/* Monto */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="amount" className="text-sm font-semibold text-secondary">
              Monto
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Ingrese el monto"
              className="outline-1 outline-stroke rounded py-3 px-4"
            />
            {state.errors?.amount && (
              <p className="text-red-500 text-sm">{state.errors.amount[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fecha */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="date" className="text-sm font-semibold text-secondary">
              Fecha
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="outline-1 outline-stroke rounded py-3 px-4"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            {state.errors?.date && (
              <p className="text-red-500 text-sm">{state.errors.date[0]}</p>
            )}
          </div>
          {/* Categoria  */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="categoryId" className="text-sm font-semibold text-secondary">
              Categoría
            </label>
            <select
              name="categoryId"
              id="categoryId"
              className="outline-1 outline-stroke rounded py-3 px-4"
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            {state.errors?.categoryId && (
              <p className="text-red-500 text-sm">
                {state.errors.categoryId[0]}
              </p>
            )}
          </div>
        </div>

        {/* Descripción */}
        <div className="flex flex-col gap-2.5">
          <label htmlFor="description" className="text-sm font-semibold text-secondary">
            Descripción
          </label>
          <input
            type="text"
            name="description"
            id="description"
            maxLength={255}
            placeholder="Ej: Compra en supermercado"
            className="outline-1 outline-stroke rounded py-3 px-4"
          />
          {state.errors?.description && (
            <p className="text-red-500 text-sm">
              {state.errors.description[0]}
            </p>
          )}
        </div>
        {/* Notas (opcional) */}
        <div className="flex flex-col gap-2.5">
          <label htmlFor="notes" className="text-sm font-semibold text-secondary">
            Notas <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <textarea
            name="notes"
            id="notes"
            maxLength={500}
            placeholder="Detalles adicionales sobre el gasto o ingreso"
            className="outline-1 outline-stroke rounded py-3 px-4"
          />
          {state.errors?.notes && (
            <p className="text-red-500 text-sm">{state.errors.notes[0]}</p>
          )}
        </div>
        {/* Mensaje de éxito/error global */}
        {state.message && (
          <p className="text-green-600 text-sm">{state.message}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <button
            type="submit"
            className="flex gap-2 bg-black text-white py-4 rounded-lg cursor-pointer justify-center items-center"
          >
            <Image src="/save-icon.svg" alt="" width={18} height={18} />
            {isPending ? "Guardando..." : "Agregar Gasto/Ingreso"}
          </button>
          <Link
            className="flex justify-center items-center text-primary text-sm bg-softBlue rounded-lg border border-stroke "
            href={"/dashboard"}
          >
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  );
}
