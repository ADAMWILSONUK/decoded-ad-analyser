"use client";

import { type ChannelData } from "@/lib/data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

const TrendIcon = ({ trend, percent }: { trend: string; percent: number }) => {
  if (trend === "up") return <span className="text-green-400 text-xs flex items-center gap-0.5"><ArrowUp className="w-3 h-3" />{formatPercent(percent)}</span>;
  if (trend === "down") return <span className="text-red-400 text-xs flex items-center gap-0.5"><ArrowDown className="w-3 h-3" />{formatPercent(percent)}</span>;
  return <span className="text-zinc-500 text-xs flex items-center gap-0.5"><Minus className="w-3 h-3" />{formatPercent(percent)}</span>;
};

interface Props {
  channels: ChannelData[];
}

export default function ChannelPerformance({ channels }: Props) {
  const sorted = [...channels].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Channel Performance</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-zinc-400 text-xs border-b border-zinc-800">
              <th className="text-left py-3 pr-4">Channel</th>
              <th className="text-left py-3 px-3">Category</th>
              <th className="text-right py-3 px-3">Spend</th>
              <th className="text-right py-3 px-3">Revenue</th>
              <th className="text-right py-3 px-3">ROAS</th>
              <th className="text-right py-3 px-3">CPA</th>
              <th className="text-right py-3 px-3">Tickets</th>
              <th className="text-right py-3 px-3">Leads</th>
              <th className="text-right py-3 pl-3">Trend</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((ch) => (
              <tr key={ch.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }} />
                    <span className="text-white font-medium text-xs lg:text-sm">{ch.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 capitalize">
                    {ch.category}
                  </span>
                </td>
                <td className="text-right py-3 px-3 text-zinc-300">{formatCurrency(ch.spend)}</td>
                <td className="text-right py-3 px-3 text-white font-medium">{formatCurrency(ch.revenue)}</td>
                <td className="text-right py-3 px-3">
                  <span className={ch.roas >= 3 ? "text-green-400" : ch.roas >= 1.5 ? "text-amber-400" : "text-red-400"}>
                    {isFinite(ch.roas) ? `${ch.roas.toFixed(2)}x` : "---"}
                  </span>
                </td>
                <td className="text-right py-3 px-3 text-zinc-300">
                  {ch.cpa > 0 ? formatCurrency(ch.cpa) : "---"}
                </td>
                <td className="text-right py-3 px-3 text-white">{formatNumber(ch.conversions)}</td>
                <td className="text-right py-3 px-3 text-zinc-300">{formatNumber(ch.leads)}</td>
                <td className="text-right py-3 pl-3">
                  <TrendIcon trend={ch.trend} percent={ch.trendPercent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
