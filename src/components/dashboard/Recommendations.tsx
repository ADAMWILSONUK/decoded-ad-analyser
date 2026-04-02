"use client";

import { recommendations } from "@/lib/data";
import { ArrowUpCircle, ArrowDownCircle, MinusCircle, FlaskConical } from "lucide-react";

const actionConfig = {
  increase: { icon: ArrowUpCircle, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20", label: "INCREASE" },
  reduce: { icon: ArrowDownCircle, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20", label: "REDUCE" },
  maintain: { icon: MinusCircle, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", label: "MAINTAIN" },
  test: { icon: FlaskConical, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", label: "TEST" },
};

const priorityBadge = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

export default function Recommendations() {
  const sorted = [...recommendations].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-2">Actionable Recommendations</h2>
      <p className="text-xs text-zinc-500 mb-6">
        Data-driven guidance on where to increase, reduce, maintain, or test your marketing investment
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((rec) => {
          const config = actionConfig[rec.action];
          const Icon = config.icon;

          return (
            <div
              key={rec.channel}
              className={`rounded-lg border ${config.border} ${config.bg} p-4`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <div>
                    <span className="text-white font-medium text-sm">{rec.channel}</span>
                    <span className={`ml-2 text-[10px] font-bold ${config.color}`}>{config.label}</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${priorityBadge[rec.priority]}`}>
                  {rec.priority.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-zinc-300 mb-2 leading-relaxed">{rec.reason}</p>

              <div className="bg-black/20 rounded-md p-2 mb-2">
                <p className="text-xs text-zinc-400">
                  <span className="text-zinc-500 font-medium">Projected Impact:</span> {rec.impact}
                </p>
              </div>

              <div className="bg-black/20 rounded-md p-2">
                <p className="text-xs text-zinc-400">
                  <span className="text-zinc-500 font-medium">Action:</span> {rec.suggestedChange}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
