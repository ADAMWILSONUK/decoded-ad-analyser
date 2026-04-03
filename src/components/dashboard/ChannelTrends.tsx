"use client";

import { type ChannelData } from "@/lib/data";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface Props {
  channels: ChannelData[];
}

export default function ChannelTrends({ channels }: Props) {
  const weeklyROAS = ["W1", "W2", "W3", "W4"].map((week) => {
    const point: Record<string, string | number> = { week };
    channels.forEach((ch) => {
      const w = ch.weeklyData.find((d) => d.week === week);
      if (w && w.spend > 0) {
        point[ch.name] = parseFloat((w.revenue / w.spend).toFixed(2));
      }
    });
    return point;
  });

  const trackedChannels = channels.filter(
    (c) => c.category === "paid" || c.category === "referral"
  );

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-2">Channel ROAS Trends</h2>
      <p className="text-xs text-zinc-500 mb-6">Week-over-week ROAS for paid and referral channels</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyROAS} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="week" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} tickFormatter={(v) => `${v}x`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: "8px",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value) => [`${value}x`, ""]}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            {trackedChannels.map((ch) => (
              <Line
                key={ch.id}
                type="monotone"
                dataKey={ch.name}
                stroke={ch.color}
                strokeWidth={2}
                dot={{ r: 3 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
