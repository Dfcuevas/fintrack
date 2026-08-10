"use client";

// import { ExpensesWithCategory } from "@/lib/getExpensesByUser";
import { CategoryTotal } from "@/lib/getExpenseTotalsByCategory";
import { Pie, PieChart } from "recharts";

const ExpensesChart = ({
  // expenses,
  totals,
}: {
  // expenses: ExpensesWithCategory;
  totals: CategoryTotal[];
}) => {
  console.log("Totals ExpensesChart", totals);
  const totalTransactions = totals.reduce((acc, curr) => acc + Number(curr.total), 0);
  return <div className="lg:col-span-2">
    <h3>Gastos Por Categoría</h3>
    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '40vh', aspectRatio: 1}}>
      <Pie data={totals}
      innerRadius="80%"
      outerRadius="100%"
      // Corner radius is the rounded edge of each pie slice
      cornerRadius="50%"
      fill="color"
      paddingAngle={5}
      dataKey="total"
      isAnimationActive={true}
      />
    </PieChart>
  </div>;
};

export default ExpensesChart;
