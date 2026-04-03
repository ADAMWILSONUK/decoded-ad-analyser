"use client";

import { type CategorySummary } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  categorySummaries: CategorySummary[];
  totalRevenue: number;
}

export default function CategoryBreakdown({ categorySummaries, totalRevenue }: Props) {
  const revenueData = categorySummaries.map((c) => ({
    name: c.category,
    value: c.revenue,
    color: c.color,
  }));

  const spendData = categorySummaries
    .filter((c) => c.spend > 0)
    .map((c) => ({
      name: c.category,
      value: c.spend,
      color: c.color,
    }));

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-2">Category Breakdown</h2>
      <p className="text-xs text-zinc-500 mb-6">Revenue and spend distribution by channel category</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-3 text-center">Revenue by Category</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                  {revenueData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-3 text-center">Spend by Category</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={spendData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                  {spendData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value) => [formatCurrency(Number(value)), "Spend"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
        {categorySummaries.map((cat) => (
          <div key={cat.category} className="text-center p-3 rounded-lg bg-zinc-800/50">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-xs text-zinc-400">{cat.category}</span>
            </div>
            <div className="text-sm font-bold text-white">{formatCurrency(cat.revenue)}</div>
            <div className="text-xs text-zinc-500">
              {((cat.revenue / totalRevenue) * 100).toFixed(0)}% of revenue
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              {isFinite(cat.roas) ? `${cat.roas.toFixed(1)}x ROAS` : "No spend"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
