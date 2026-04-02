"use client";

import { totalSpend, totalRevenue, totalConversions, blendedROAS, blendedCPA, totalLeads } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { DollarSign, TrendingUp, Ticket, Users, Target, BarChart3 } from "lucide-react";

const kpis = [
  {
    label: "Total Revenue",
    value: formatCurrency(totalRevenue),
    subtext: "From ticket sales",
    icon: DollarSign,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
  {
    label: "Total Spend",
    value: formatCurrency(totalSpend),
    subtext: "Across all channels",
    icon: BarChart3,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    label: "Blended ROAS",
    value: `${blendedROAS.toFixed(2)}x`,
    subtext: "Return on ad spend",
    icon: TrendingUp,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  {
    label: "Tickets Sold",
    value: formatNumber(totalConversions),
    subtext: `${formatCurrency(blendedCPA)} avg CPA`,
    icon: Ticket,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  {
    label: "Total Leads",
    value: formatNumber(totalLeads),
    subtext: `${((totalConversions / totalLeads) * 100).toFixed(1)}% conversion rate`,
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
  {
    label: "Active Channels",
    value: "11",
    subtext: "Paid, Organic, CRM, Referral",
    icon: Target,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
  },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className={`rounded-xl border ${kpi.border} ${kpi.bg} p-4 flex flex-col gap-2`}
        >
          <div className="flex items-center gap-2">
            <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            <span className="text-xs text-zinc-400 font-medium">{kpi.label}</span>
          </div>
          <div className="text-2xl font-bold text-white">{kpi.value}</div>
          <div className="text-xs text-zinc-500">{kpi.subtext}</div>
        </div>
      ))}
    </div>
  );
}
