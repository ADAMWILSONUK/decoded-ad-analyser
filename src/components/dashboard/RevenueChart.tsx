"use client";

import { weeklyTrend } from "@/lib/data";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export default function RevenueChart() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-2">Weekly Revenue vs Spend</h2>
      <p className="text-xs text-zinc-500 mb-6">Tracking total investment against ticket revenue with ROAS trend</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={weeklyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="week" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fill: "#a1a1aa", fontSize: 12 }} tickFormatter={(v) => `$${(Number(v) / 1000).toFixed(0)}K`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#a1a1aa", fontSize: 12 }} tickFormatter={(v) => `${Number(v).toFixed(1)}x`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value, name) => {
                const v = Number(value);
                if (name === "ROAS") return [`${v.toFixed(2)}x`, name];
                return [`$${v.toLocaleString()}`, name];
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar yAxisId="left" dataKey="spend" name="Spend" fill="#3B82F6" radius={[4, 4, 0, 0]} opacity={0.7} />
            <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#22C55E" radius={[4, 4, 0, 0]} opacity={0.7} />
            <Line yAxisId="right" dataKey="roas" name="ROAS" stroke="#F59E0B" strokeWidth={2} dot={{ fill: "#F59E0B", r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
