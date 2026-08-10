import { BadgeDollarSign, ShoppingCart, Wallet } from "lucide-react";
import StatCard from "./StatCard";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        label="Saldo Total"
        value="12'450.000"
        icon={<Wallet className="h-6 w-6 text-primary" />}
        trend={{ value: "+4.5% este mes", positive: true }}
      />
      <StatCard
        label="Ingresos Mensuales"
        value="5'200.000"
        icon={<BadgeDollarSign className="h-6 w-6 text-dollar-icon" />}
        trend={{ value: "+4.5% este mes", positive: true }}
      />
      <StatCard
        label="Gastos Mensuales"
        value="2'140.000"
        icon={<ShoppingCart className="h-6 w-6 text-text-red" />}
      />
    </div>
  );
};

export default StatsGrid;
