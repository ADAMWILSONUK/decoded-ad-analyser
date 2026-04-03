// =============================================================================
// Data Loader — tries Google Sheets first, falls back to mock data
// =============================================================================

import { fetchSheetCSV, transformSheetToChannels } from "./sheets";
import {
  channels as mockChannels,
  type ChannelData,
  type FunnelStage,
  type AttributionTouch,
  type Recommendation,
  type CategorySummary,
  attributionData as mockAttribution,
  recommendations as mockRecommendations,
} from "./data";

export interface DashboardData {
  channels: ChannelData[];
  totalSpend: number;
  totalRevenue: number;
  totalConversions: number;
  totalLeads: number;
  totalClicks: number;
  totalImpressions: number;
  blendedROAS: number;
  blendedCPA: number;
  channelCount: number;
  funnelStages: FunnelStage[];
  attributionData: AttributionTouch[];
  recommendations: Recommendation[];
  categorySummaries: CategorySummary[];
  weeklyTrend: { week: string; spend: number; revenue: number; conversions: number; leads: number; clicks: number; roas: number }[];
  dataSource: "sheets" | "demo";
}

export async function loadDashboardData(): Promise<DashboardData> {
  const sheetUrl = process.env.NEXT_PUBLIC_SHEET_URL;

  let channels: ChannelData[];
  let dataSource: "sheets" | "demo" = "demo";

  if (sheetUrl && sheetUrl.trim()) {
    try {
      const rows = await fetchSheetCSV(sheetUrl);
      const sheetChannels = transformSheetToChannels(rows);
      if (sheetChannels.length > 0) {
        channels = sheetChannels;
        dataSource = "sheets";
      } else {
        channels = mockChannels;
      }
    } catch {
      console.warn("Failed to load from Google Sheets, falling back to demo data");
      channels = mockChannels;
    }
  } else {
    channels = mockChannels;
  }

  // Compute aggregates
  const totalSpend = channels.reduce((s, c) => s + c.spend, 0);
  const totalRevenue = channels.reduce((s, c) => s + c.revenue, 0);
  const totalConversions = channels.reduce((s, c) => s + c.conversions, 0);
  const totalLeads = channels.reduce((s, c) => s + c.leads, 0);
  const totalClicks = channels.reduce((s, c) => s + c.clicks, 0);
  const totalImpressions = channels.reduce((s, c) => s + c.impressions, 0);
  const blendedROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0;
  const blendedCPA = totalConversions > 0 ? totalSpend / totalConversions : 0;

  // Funnel
  const funnelStages: FunnelStage[] = [
    { stage: "Impressions", total: totalImpressions, byChannel: Object.fromEntries(channels.map((c) => [c.id, c.impressions])) },
    { stage: "Clicks", total: totalClicks, byChannel: Object.fromEntries(channels.map((c) => [c.id, c.clicks])) },
    { stage: "Leads", total: totalLeads, byChannel: Object.fromEntries(channels.map((c) => [c.id, c.leads])) },
    { stage: "Ticket Sales", total: totalConversions, byChannel: Object.fromEntries(channels.map((c) => [c.id, c.conversions])) },
  ];

  // Category summaries — computed dynamically
  const catMap = new Map<string, CategorySummary>();
  const catColors: Record<string, string> = {
    paid: "#3B82F6", organic: "#22C55E", crm: "#EF4444", referral: "#F59E0B", direct: "#8B5CF6",
  };
  const catLabels: Record<string, string> = {
    paid: "Paid Media", organic: "Organic", crm: "CRM", referral: "Referral", direct: "Direct",
  };

  for (const ch of channels) {
    const existing = catMap.get(ch.category);
    if (existing) {
      existing.spend += ch.spend;
      existing.revenue += ch.revenue;
      existing.conversions += ch.conversions;
    } else {
      catMap.set(ch.category, {
        category: catLabels[ch.category] || ch.category,
        spend: ch.spend,
        revenue: ch.revenue,
        conversions: ch.conversions,
        roas: 0,
        color: catColors[ch.category] || "#6B7280",
      });
    }
  }
  const categorySummaries = Array.from(catMap.values()).map((c) => ({
    ...c,
    roas: c.spend > 0 ? c.revenue / c.spend : (c.revenue > 0 ? Infinity : 0),
  }));

  // Weekly trends
  const weeklyTrend = ["W1", "W2", "W3", "W4"].map((week) => {
    const wd = channels.reduce(
      (acc, ch) => {
        const w = ch.weeklyData.find((d) => d.week === week);
        if (w) {
          acc.spend += w.spend;
          acc.revenue += w.revenue;
          acc.conversions += w.conversions;
          acc.leads += w.leads;
          acc.clicks += w.clicks;
        }
        return acc;
      },
      { week, spend: 0, revenue: 0, conversions: 0, leads: 0, clicks: 0 }
    );
    return { ...wd, roas: wd.spend > 0 ? wd.revenue / wd.spend : 0 };
  });

  return {
    channels,
    totalSpend,
    totalRevenue,
    totalConversions,
    totalLeads,
    totalClicks,
    totalImpressions,
    blendedROAS,
    blendedCPA,
    channelCount: channels.length,
    funnelStages,
    attributionData: dataSource === "sheets" ? mockAttribution : mockAttribution,
    recommendations: mockRecommendations,
    categorySummaries,
    weeklyTrend,
    dataSource,
  };
}
