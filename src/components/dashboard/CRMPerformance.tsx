"use client";

import { type ChannelData } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Mail, Smartphone, TrendingUp, Users, DollarSign, Target } from "lucide-react";

interface Props {
  channels: ChannelData[];
}

export default function CRMPerformance({ channels }: Props) {
  const crmChannels = channels.filter((c) => c.category === "crm");
  if (crmChannels.length === 0) return null;

  const crmTotal = crmChannels.reduce(
    (acc, c) => ({
      spend: acc.spend + c.spend,
      revenue: acc.revenue + c.revenue,
      conversions: acc.conversions + c.conversions,
    }),
    { spend: 0, revenue: 0, conversions: 0 }
  );

  const iconMap: Record<string, typeof Mail> = {
    email: Mail,
    activecampaign: Mail,
    sms: Smartphone,
  };

  const colorMap: Record<string, string> = {
    email: "text-red-400",
    activecampaign: "text-blue-400",
    sms: "text-purple-400",
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-2">CRM Performance</h2>
      <p className="text-xs text-zinc-500 mb-6">
        Your highest-ROAS channels. Combined: {formatCurrency(crmTotal.revenue)} revenue from {formatCurrency(crmTotal.spend)} spend ({crmTotal.spend > 0 ? (crmTotal.revenue / crmTotal.spend).toFixed(1) : "---"}x ROAS)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {crmChannels.map((ch) => {
          const key = ch.id.split("-")[0] || ch.id;
          const Icon = iconMap[key] || Mail;
          const color = colorMap[key] || "text-zinc-400";

          const metrics = [
            { label: "Sends", value: formatNumber(ch.impressions) },
            { label: "Open Rate", value: ch.impressions > 0 ? `${((ch.clicks / ch.impressions) * 100).toFixed(1)}%` : "---" },
            { label: "CTR → Lead", value: ch.clicks > 0 ? `${((ch.leads / ch.clicks) * 100).toFixed(1)}%` : "---" },
            { label: "Lead → Sale", value: ch.leads > 0 ? `${((ch.conversions / ch.leads) * 100).toFixed(1)}%` : "---" },
          ];

          return (
            <div key={ch.id} className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-white font-medium">{ch.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-black/30 rounded-md p-3">
                  <DollarSign className="w-3 h-3 text-zinc-500 mb-1" />
                  <div className="text-lg font-bold text-white">{formatCurrency(ch.revenue)}</div>
                  <div className="text-xs text-zinc-500">Revenue</div>
                </div>
                <div className="bg-black/30 rounded-md p-3">
                  <TrendingUp className="w-3 h-3 text-zinc-500 mb-1" />
                  <div className="text-lg font-bold text-green-400">{isFinite(ch.roas) ? `${ch.roas.toFixed(1)}x` : "---"}</div>
                  <div className="text-xs text-zinc-500">ROAS</div>
                </div>
                <div className="bg-black/30 rounded-md p-3">
                  <Target className="w-3 h-3 text-zinc-500 mb-1" />
                  <div className="text-lg font-bold text-white">{formatNumber(ch.conversions)}</div>
                  <div className="text-xs text-zinc-500">Tickets Sold</div>
                </div>
                <div className="bg-black/30 rounded-md p-3">
                  <Users className="w-3 h-3 text-zinc-500 mb-1" />
                  <div className="text-lg font-bold text-white">{ch.cpa > 0 ? formatCurrency(ch.cpa) : "---"}</div>
                  <div className="text-xs text-zinc-500">CPA</div>
                </div>
              </div>

              <div className="space-y-2">
                {metrics.map((m) => (
                  <div key={m.label} className="flex justify-between text-xs">
                    <span className="text-zinc-500">{m.label}</span>
                    <span className="text-zinc-300 font-medium">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
