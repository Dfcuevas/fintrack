"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Button } from "../ui/Button";
import { SearchInput } from "../ui/SearchInput";

import type { Category } from "@/lib/getAllCategories";
import { ExpensesWithCategory } from "@/lib/getExpensesByUser";
import { formatMoney } from "@/lib/formatMoney";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 5;

const TransactionsTable = ({
  categories,
  transactions,
  currentPage,
  totalCount,
  query,
  selectedCategory,
}: {
  categories: Category[];
  transactions: ExpensesWithCategory;
  currentPage: number;
  totalCount: number;
  query: string;
  selectedCategory: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const updateParams = (updates: {
    page?: number;
    query?: string;
    category?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.page !== undefined) {
      if (updates.page <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(updates.page));
      }
    }

    if (updates.query !== undefined) {
      if (updates.query.trim() === "") {
        params.delete("query");
      } else {
        params.set("query", updates.query);
      }
    }

    if (updates.category !== undefined) {
      if (updates.category === "Todas") {
        params.delete("category");
      } else {
        params.set("category", updates.category);
      }
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleClear = () => {
    updateParams({ query: "", page: 1 });
    searchRef.current?.focus(); // forwardRef en accion: enfoca el input al limpiar
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const pageItems = transactions;

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-lg font-semibold text-secondary">
            Consulta y gestiona tus movimientos financieros en un solo lugar.
          </p>
        </div>
        <Button href="/transactions/new-transaction" size="sm">
          + Añadir Transacción
        </Button>
      </div>
      <div className="relative flex items-center gap-4 mb-4">
        <SearchInput
          ref={searchRef}
          value={query}
          onChange={(e) => {
            updateParams({ query: e.target.value, page: 1 });
          }}
          onClear={handleClear}
          placeholder="Buscar transacción..."
        />
        <div className="relative flex items-center gap-2 text-secondary">
          <select
            value={selectedCategory}
            onChange={(e) => {
              updateParams({ category: e.target.value, page: 1 });
            }}
            className="appearance-none bg-white py-2 pl-4 rounded-lg pr-10 border border-accent focus:ring-2 focus:ring-primary focus:outline-none w-full"
          >
            <option value="Todas">Categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none size-6" />
        </div>
      </div>
      <div className="overflow-x-auto border border-accent bg-white rounded-lg">
        <table className="text-left w-full">
          <thead>
            <tr className="tracking-wide text-xs font-semibold text-secondary uppercase">
              <th className="py-4 px-6">Fecha</th>
              <th className="py-4 px-6">Descripción</th>
              <th className="py-4 px-6">Categoría</th>
              <th className="py-4 px-6">Monto</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 px-6 text-center text-sm text-secondary"
                >
                  No se encontraron transacciones.
                </td>
              </tr>
            ) : (
              pageItems.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="py-4 px-6 text-sm text-dark-blue">
                    {transaction.date}
                  </td>
                  <td className="py-4 px-6 flex gap-3 items-center">
                    <span>{transaction.category.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-dark-blue text-sm">
                        {transaction.description}
                      </span>
                      {transaction.notes ? (
                        <span className="text-secondary text-[11px]">
                          {transaction.notes}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td
                    className="py-4 px-6"
                    style={{ color: transaction.category.color }}
                  >
                    <span className="py-1 px-3 rounded-lg bg-primary">
                      {transaction.category.name}
                    </span>
                  </td>
                  <td
                    className="py-4 px-6 text-base font-bold"
                    style={{
                      color:
                        transaction.type === "expense" ? "#BA1A1A" : "#009668",
                    }}
                  >
                    {transaction.type === "expense" ? "-" : "+"}
                    {formatMoney(Number(transaction.amount))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/*Paginación*/}
      <div className="flex flex-col gap-2 border-t border-gray-100 px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-secondary">
          Mostrando {pageItems.length} de {totalCount} transacciones.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateParams({ page: Math.max(1, currentPage - 1) })}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-primary font-medium hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </button>
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => updateParams({ page: pageNumber })}
                className={`cursor-pointer h-8 w-8 rounded-md text-sm font-medium ${currentPage === pageNumber ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                {pageNumber}
              </button>
            ),
          )}
          {totalPages > 3 && <span className="px-1 text-gray-400">...</span>}
          <button
            onClick={() =>
              updateParams({ page: Math.min(totalPages, currentPage + 1) })
            }
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-primary hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
