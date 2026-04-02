"use client";

import { attributionData } from "@/lib/data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export default function AttributionChart() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-2">Multi-Touch Attribution</h2>
      <p className="text-xs text-zinc-500 mb-6">
        % of conversions attributed to each channel under different models
      </p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={attributionData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="channel"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              angle={-35}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="firstTouch" name="First Touch" fill="#3B82F6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="lastTouch" name="Last Touch" fill="#22C55E" radius={[2, 2, 0, 0]} />
            <Bar dataKey="linear" name="Linear" fill="#F59E0B" radius={[2, 2, 0, 0]} />
            <Bar dataKey="positionBased" name="Position Based" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
