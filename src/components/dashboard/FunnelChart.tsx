"use client";

import { funnelStages } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default function FunnelChart() {
  const maxVal = funnelStages[0].total;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-2">Marketing Funnel</h2>
      <p className="text-xs text-zinc-500 mb-6">All channels combined — from first impression to ticket sale</p>
      <div className="flex flex-col gap-3">
        {funnelStages.map((stage, i) => {
          const width = Math.max((stage.total / maxVal) * 100, 8);
          const convRate = i > 0 ? ((stage.total / funnelStages[i - 1].total) * 100).toFixed(1) : null;
          const colors = ["bg-blue-500", "bg-cyan-500", "bg-amber-500", "bg-green-500"];

          return (
            <div key={stage.stage}>
              {convRate && (
                <div className="text-xs text-zinc-500 mb-1 ml-2">
                  {convRate}% conversion rate
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm text-zinc-300 text-right shrink-0">{stage.stage}</div>
                <div className="flex-1 relative">
                  <div
                    className={`h-12 ${colors[i]} rounded-lg flex items-center justify-end pr-4 transition-all duration-500`}
                    style={{ width: `${width}%` }}
                  >
                    <span className="text-white font-bold text-sm">{formatNumber(stage.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
