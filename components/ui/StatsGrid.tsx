import { BadgeDollarSign, ShoppingCart, Wallet } from "lucide-react";
import StatCard from "./StatCard";
import { formatMoney } from "@/lib/formatMoney";

const StatsGrid = ({expenses, incomes}: {expenses: number, incomes: number}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        label="Saldo Total"
        value={formatMoney(incomes - expenses)}
        icon={<Wallet className="h-6 w-6 text-primary" />}
      />
      <StatCard
        label="Ingresos Mensuales"
        value={formatMoney(incomes)}
        icon={<BadgeDollarSign className="h-6 w-6 text-dollar-icon" />}
      />
      <StatCard
        label="Gastos Mensuales"
        value={formatMoney(expenses)}
        icon={<ShoppingCart className="h-6 w-6 text-text-red" />}
      />
    </div>
  );
};

export default StatsGrid;
