"use client";

import { channels } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Mail, Smartphone, TrendingUp, Users, DollarSign, Target } from "lucide-react";

export default function CRMPerformance() {
  const email = channels.find((c) => c.id === "email")!;
  const sms = channels.find((c) => c.id === "sms")!;
  const crmTotal = {
    spend: email.spend + sms.spend,
    revenue: email.revenue + sms.revenue,
    conversions: email.conversions + sms.conversions,
    leads: email.leads + sms.leads,
  };

  const stats = [
    {
      channel: "Email Marketing",
      icon: Mail,
      color: "text-red-400",
      data: email,
      metrics: [
        { label: "Sends", value: formatNumber(email.impressions) },
        { label: "Open Rate", value: `${((email.clicks / email.impressions) * 100).toFixed(1)}%` },
        { label: "CTR → Lead", value: `${((email.leads / email.clicks) * 100).toFixed(1)}%` },
        { label: "Lead → Sale", value: `${((email.conversions / email.leads) * 100).toFixed(1)}%` },
      ],
    },
    {
      channel: "SMS / Push",
      icon: Smartphone,
      color: "text-purple-400",
      data: sms,
      metrics: [
        { label: "Sends", value: formatNumber(sms.impressions) },
        { label: "Open Rate", value: `${((sms.clicks / sms.impressions) * 100).toFixed(1)}%` },
        { label: "CTR → Lead", value: `${((sms.leads / sms.clicks) * 100).toFixed(1)}%` },
        { label: "Lead → Sale", value: `${((sms.conversions / sms.leads) * 100).toFixed(1)}%` },
      ],
    },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-2">CRM Performance</h2>
      <p className="text-xs text-zinc-500 mb-6">
        Email and SMS — your highest-ROAS channels. Combined: {formatCurrency(crmTotal.revenue)} revenue from {formatCurrency(crmTotal.spend)} spend ({(crmTotal.revenue / crmTotal.spend).toFixed(1)}x ROAS)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((s) => (
          <div key={s.channel} className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <span className="text-white font-medium">{s.channel}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-black/30 rounded-md p-3">
                <DollarSign className="w-3 h-3 text-zinc-500 mb-1" />
                <div className="text-lg font-bold text-white">{formatCurrency(s.data.revenue)}</div>
                <div className="text-xs text-zinc-500">Revenue</div>
              </div>
              <div className="bg-black/30 rounded-md p-3">
                <TrendingUp className="w-3 h-3 text-zinc-500 mb-1" />
                <div className="text-lg font-bold text-green-400">{s.data.roas.toFixed(1)}x</div>
                <div className="text-xs text-zinc-500">ROAS</div>
              </div>
              <div className="bg-black/30 rounded-md p-3">
                <Target className="w-3 h-3 text-zinc-500 mb-1" />
                <div className="text-lg font-bold text-white">{formatNumber(s.data.conversions)}</div>
                <div className="text-xs text-zinc-500">Tickets Sold</div>
              </div>
              <div className="bg-black/30 rounded-md p-3">
                <Users className="w-3 h-3 text-zinc-500 mb-1" />
                <div className="text-lg font-bold text-white">{formatCurrency(s.data.cpa)}</div>
                <div className="text-xs text-zinc-500">CPA</div>
              </div>
            </div>

            <div className="space-y-2">
              {s.metrics.map((m) => (
                <div key={m.label} className="flex justify-between text-xs">
                  <span className="text-zinc-500">{m.label}</span>
                  <span className="text-zinc-300 font-medium">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
