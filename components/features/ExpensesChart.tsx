"use client";

// import { ExpensesWithCategory } from "@/lib/getExpensesByUser";
import { CategoryTotal } from "@/lib/getExpenseTotalsByCategory";
import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
  Text,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { formatMoney } from "@/lib/formatMoney";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      style={{ fontSize: "10px", fontWeight: "bold" }}
      fill="#45464d"
      x={x}
      y={y}
      textAnchor={"middle"}
      dominantBaseline="auto"
    >
      <tspan x={x} dy="-0.6em">
        {name}
      </tspan>
      <tspan x={x} dy="1.2em">
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </tspan>
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
  const fillOpacity = isAnyPieActive && !isThisPieActive ? 0.5 : 1;

  // props.payload es el CategoryTotal original: {name, color, total, ...}
  const fill = props.payload?.color ?? "#8884d8";
  return (
    <Sector
      {...props}
      fillOpacity={fillOpacity}
      style={{ transition: "fill-opacity 0.3s ease" }}
      fill={fill}
    />
  );
};

const ExpensesChart = ({ totals }: { totals: CategoryTotal[] }) => {
  return (
    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl">
      <div>
        <h3 className="text-center text-lg xl:text-2xl font-semibold mt-6">
          Gastos Por Categoría
        </h3>
        <PieChart
          style={{
            width: "100%",
            maxWidth: "100%",
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            data={totals}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="total"
            isAnimationActive={true}
            shape={MyCustomPie}
          />
          <RechartsDevtools />
        </PieChart>
      </div>
      <div className="p-6">
        <ul>
          {totals.map((item) => (
            <li
              key={item.categoryId}
              className={`flex items-center justify-between gap-4 mb-4 p-2 rounded-md text-base overflow-hidden`}
              style={{ backgroundColor: item.color }}
            >
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
              <span>{formatMoney(Number(item.total ?? 0))}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpensesChart;
