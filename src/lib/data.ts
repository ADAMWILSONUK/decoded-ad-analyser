// =============================================================================
// Marketing Attribution Dashboard — Data Layer
// Mock data representing all marketing channels feeding into ticket sales
// =============================================================================

export interface ChannelData {
  id: string;
  name: string;
  category: "paid" | "organic" | "crm" | "referral" | "direct";
  color: string;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  revenue: number;
  cpa: number;
  roas: number;
  trend: "up" | "down" | "flat";
  trendPercent: number;
  weeklyData: WeeklyDataPoint[];
}

export interface WeeklyDataPoint {
  week: string;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  revenue: number;
}

export interface FunnelStage {
  stage: string;
  total: number;
  byChannel: Record<string, number>;
}

export interface AttributionTouch {
  channel: string;
  firstTouch: number;
  lastTouch: number;
  linear: number;
  positionBased: number;
}

export interface Recommendation {
  channel: string;
  action: "increase" | "reduce" | "maintain" | "test";
  priority: "high" | "medium" | "low";
  reason: string;
  impact: string;
  suggestedChange: string;
}

// ---------------------------------------------------------------------------
// Channel Performance Data
// ---------------------------------------------------------------------------

export const channels: ChannelData[] = [
  {
    id: "meta-ads",
    name: "Meta Ads (Facebook/Instagram)",
    category: "paid",
    color: "#1877F2",
    spend: 45000,
    impressions: 2800000,
    clicks: 84000,
    leads: 4200,
    conversions: 630,
    revenue: 94500,
    cpa: 71.43,
    roas: 2.1,
    trend: "up",
    trendPercent: 12,
    weeklyData: [
      { week: "W1", spend: 10000, impressions: 620000, clicks: 18600, leads: 930, conversions: 130, revenue: 19500 },
      { week: "W2", spend: 10500, impressions: 650000, clicks: 19500, leads: 975, conversions: 140, revenue: 21000 },
      { week: "W3", spend: 11500, impressions: 720000, clicks: 21600, leads: 1080, conversions: 165, revenue: 24750 },
      { week: "W4", spend: 13000, impressions: 810000, clicks: 24300, leads: 1215, conversions: 195, revenue: 29250 },
    ],
  },
  {
    id: "google-ads",
    name: "Google Ads (Search + Display)",
    category: "paid",
    color: "#4285F4",
    spend: 38000,
    impressions: 1950000,
    clicks: 68250,
    leads: 3750,
    conversions: 560,
    revenue: 84000,
    cpa: 67.86,
    roas: 2.21,
    trend: "up",
    trendPercent: 8,
    weeklyData: [
      { week: "W1", spend: 8500, impressions: 440000, clicks: 15400, leads: 850, conversions: 120, revenue: 18000 },
      { week: "W2", spend: 9000, impressions: 460000, clicks: 16100, leads: 890, conversions: 130, revenue: 19500 },
      { week: "W3", spend: 10000, impressions: 510000, clicks: 17850, leads: 980, conversions: 150, revenue: 22500 },
      { week: "W4", spend: 10500, impressions: 540000, clicks: 18900, leads: 1030, conversions: 160, revenue: 24000 },
    ],
  },
  {
    id: "tiktok-ads",
    name: "TikTok Ads",
    category: "paid",
    color: "#010101",
    spend: 22000,
    impressions: 3200000,
    clicks: 96000,
    leads: 2880,
    conversions: 288,
    revenue: 43200,
    cpa: 76.39,
    roas: 1.96,
    trend: "up",
    trendPercent: 25,
    weeklyData: [
      { week: "W1", spend: 4000, impressions: 600000, clicks: 18000, leads: 540, conversions: 48, revenue: 7200 },
      { week: "W2", spend: 5000, impressions: 720000, clicks: 21600, leads: 648, conversions: 60, revenue: 9000 },
      { week: "W3", spend: 6000, impressions: 880000, clicks: 26400, leads: 792, conversions: 82, revenue: 12300 },
      { week: "W4", spend: 7000, impressions: 1000000, clicks: 30000, leads: 900, conversions: 98, revenue: 14700 },
    ],
  },
  {
    id: "programmatic",
    name: "Programmatic Display",
    category: "paid",
    color: "#FF6B35",
    spend: 15000,
    impressions: 4500000,
    clicks: 31500,
    leads: 945,
    conversions: 95,
    revenue: 14250,
    cpa: 157.89,
    roas: 0.95,
    trend: "down",
    trendPercent: -5,
    weeklyData: [
      { week: "W1", spend: 4000, impressions: 1200000, clicks: 8400, leads: 252, conversions: 28, revenue: 4200 },
      { week: "W2", spend: 3800, impressions: 1150000, clicks: 8050, leads: 242, conversions: 25, revenue: 3750 },
      { week: "W3", spend: 3700, impressions: 1100000, clicks: 7700, leads: 231, conversions: 22, revenue: 3300 },
      { week: "W4", spend: 3500, impressions: 1050000, clicks: 7350, leads: 220, conversions: 20, revenue: 3000 },
    ],
  },
  {
    id: "organic-social",
    name: "Organic Social",
    category: "organic",
    color: "#25D366",
    spend: 5000,
    impressions: 850000,
    clicks: 42500,
    leads: 2550,
    conversions: 383,
    revenue: 57450,
    cpa: 13.05,
    roas: 11.49,
    trend: "up",
    trendPercent: 18,
    weeklyData: [
      { week: "W1", spend: 1200, impressions: 180000, clicks: 9000, leads: 540, conversions: 78, revenue: 11700 },
      { week: "W2", spend: 1200, impressions: 195000, clicks: 9750, leads: 585, conversions: 85, revenue: 12750 },
      { week: "W3", spend: 1300, impressions: 220000, clicks: 11000, leads: 660, conversions: 102, revenue: 15300 },
      { week: "W4", spend: 1300, impressions: 255000, clicks: 12750, leads: 765, conversions: 118, revenue: 17700 },
    ],
  },
  {
    id: "seo",
    name: "SEO / Organic Search",
    category: "organic",
    color: "#34A853",
    spend: 8000,
    impressions: 620000,
    clicks: 49600,
    leads: 3472,
    conversions: 521,
    revenue: 78150,
    cpa: 15.36,
    roas: 9.77,
    trend: "up",
    trendPercent: 6,
    weeklyData: [
      { week: "W1", spend: 2000, impressions: 145000, clicks: 11600, leads: 812, conversions: 120, revenue: 18000 },
      { week: "W2", spend: 2000, impressions: 150000, clicks: 12000, leads: 840, conversions: 125, revenue: 18750 },
      { week: "W3", spend: 2000, impressions: 158000, clicks: 12640, leads: 885, conversions: 134, revenue: 20100 },
      { week: "W4", spend: 2000, impressions: 167000, clicks: 13360, leads: 935, conversions: 142, revenue: 21300 },
    ],
  },
  {
    id: "email",
    name: "Email Marketing",
    category: "crm",
    color: "#EA4335",
    spend: 3500,
    impressions: 180000,
    clicks: 27000,
    leads: 5400,
    conversions: 810,
    revenue: 121500,
    cpa: 4.32,
    roas: 34.71,
    trend: "up",
    trendPercent: 10,
    weeklyData: [
      { week: "W1", spend: 800, impressions: 42000, clicks: 6300, leads: 1260, conversions: 185, revenue: 27750 },
      { week: "W2", spend: 850, impressions: 44000, clicks: 6600, leads: 1320, conversions: 195, revenue: 29250 },
      { week: "W3", spend: 900, impressions: 46000, clicks: 6900, leads: 1380, conversions: 210, revenue: 31500 },
      { week: "W4", spend: 950, impressions: 48000, clicks: 7200, leads: 1440, conversions: 220, revenue: 33000 },
    ],
  },
  {
    id: "sms",
    name: "SMS / Push Notifications",
    category: "crm",
    color: "#9C27B0",
    spend: 2000,
    impressions: 95000,
    clicks: 14250,
    leads: 2850,
    conversions: 428,
    revenue: 64200,
    cpa: 4.67,
    roas: 32.1,
    trend: "flat",
    trendPercent: 2,
    weeklyData: [
      { week: "W1", spend: 500, impressions: 23000, clicks: 3450, leads: 690, conversions: 105, revenue: 15750 },
      { week: "W2", spend: 500, impressions: 24000, clicks: 3600, leads: 720, conversions: 108, revenue: 16200 },
      { week: "W3", spend: 500, impressions: 24000, clicks: 3600, leads: 720, conversions: 107, revenue: 16050 },
      { week: "W4", spend: 500, impressions: 24000, clicks: 3600, leads: 720, conversions: 108, revenue: 16200 },
    ],
  },
  {
    id: "influencer",
    name: "Influencer / Creator Partnerships",
    category: "referral",
    color: "#FF9800",
    spend: 18000,
    impressions: 1400000,
    clicks: 56000,
    leads: 3360,
    conversions: 370,
    revenue: 55500,
    cpa: 48.65,
    roas: 3.08,
    trend: "up",
    trendPercent: 15,
    weeklyData: [
      { week: "W1", spend: 3500, impressions: 280000, clicks: 11200, leads: 672, conversions: 70, revenue: 10500 },
      { week: "W2", spend: 4000, impressions: 320000, clicks: 12800, leads: 768, conversions: 82, revenue: 12300 },
      { week: "W3", spend: 5000, impressions: 380000, clicks: 15200, leads: 912, conversions: 105, revenue: 15750 },
      { week: "W4", spend: 5500, impressions: 420000, clicks: 16800, leads: 1008, conversions: 113, revenue: 16950 },
    ],
  },
  {
    id: "affiliate",
    name: "Affiliate / Partners",
    category: "referral",
    color: "#607D8B",
    spend: 12000,
    impressions: 680000,
    clicks: 34000,
    leads: 2040,
    conversions: 306,
    revenue: 45900,
    cpa: 39.22,
    roas: 3.83,
    trend: "flat",
    trendPercent: 1,
    weeklyData: [
      { week: "W1", spend: 3000, impressions: 170000, clicks: 8500, leads: 510, conversions: 76, revenue: 11400 },
      { week: "W2", spend: 3000, impressions: 170000, clicks: 8500, leads: 510, conversions: 77, revenue: 11550 },
      { week: "W3", spend: 3000, impressions: 170000, clicks: 8500, leads: 510, conversions: 76, revenue: 11400 },
      { week: "W4", spend: 3000, impressions: 170000, clicks: 8500, leads: 510, conversions: 77, revenue: 11550 },
    ],
  },
  {
    id: "direct",
    name: "Direct / Word of Mouth",
    category: "direct",
    color: "#795548",
    spend: 0,
    impressions: 0,
    clicks: 28000,
    leads: 2800,
    conversions: 560,
    revenue: 84000,
    cpa: 0,
    roas: Infinity,
    trend: "up",
    trendPercent: 5,
    weeklyData: [
      { week: "W1", spend: 0, impressions: 0, clicks: 6500, leads: 650, conversions: 130, revenue: 19500 },
      { week: "W2", spend: 0, impressions: 0, clicks: 6800, leads: 680, conversions: 136, revenue: 20400 },
      { week: "W3", spend: 0, impressions: 0, clicks: 7200, leads: 720, conversions: 144, revenue: 21600 },
      { week: "W4", spend: 0, impressions: 0, clicks: 7500, leads: 750, conversions: 150, revenue: 22500 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Derived Aggregates
// ---------------------------------------------------------------------------

export const totalSpend = channels.reduce((sum, c) => sum + c.spend, 0);
export const totalRevenue = channels.reduce((sum, c) => sum + c.revenue, 0);
export const totalConversions = channels.reduce((sum, c) => sum + c.conversions, 0);
export const totalLeads = channels.reduce((sum, c) => sum + c.leads, 0);
export const totalClicks = channels.reduce((sum, c) => sum + c.clicks, 0);
export const totalImpressions = channels.reduce((sum, c) => sum + c.impressions, 0);
export const blendedROAS = totalRevenue / totalSpend;
export const blendedCPA = totalSpend / totalConversions;
export const ticketPrice = 150;
export const avgTicketsPerConversion = 1;

// ---------------------------------------------------------------------------
// Funnel Data
// ---------------------------------------------------------------------------

export const funnelStages: FunnelStage[] = [
  {
    stage: "Impressions",
    total: totalImpressions,
    byChannel: Object.fromEntries(channels.map((c) => [c.id, c.impressions])),
  },
  {
    stage: "Clicks",
    total: totalClicks,
    byChannel: Object.fromEntries(channels.map((c) => [c.id, c.clicks])),
  },
  {
    stage: "Leads",
    total: totalLeads,
    byChannel: Object.fromEntries(channels.map((c) => [c.id, c.leads])),
  },
  {
    stage: "Ticket Sales",
    total: totalConversions,
    byChannel: Object.fromEntries(channels.map((c) => [c.id, c.conversions])),
  },
];

// ---------------------------------------------------------------------------
// Multi-Touch Attribution
// ---------------------------------------------------------------------------

export const attributionData: AttributionTouch[] = [
  { channel: "Meta Ads", firstTouch: 22, lastTouch: 14, linear: 17, positionBased: 18 },
  { channel: "Google Ads", firstTouch: 18, lastTouch: 16, linear: 16, positionBased: 16 },
  { channel: "TikTok Ads", firstTouch: 15, lastTouch: 5, linear: 8, positionBased: 10 },
  { channel: "Organic Social", firstTouch: 12, lastTouch: 8, linear: 10, positionBased: 10 },
  { channel: "SEO", firstTouch: 10, lastTouch: 12, linear: 12, positionBased: 11 },
  { channel: "Email", firstTouch: 3, lastTouch: 25, linear: 15, positionBased: 13 },
  { channel: "SMS / Push", firstTouch: 1, lastTouch: 8, linear: 5, positionBased: 4 },
  { channel: "Influencer", firstTouch: 12, lastTouch: 6, linear: 9, positionBased: 10 },
  { channel: "Affiliate", firstTouch: 4, lastTouch: 3, linear: 4, positionBased: 4 },
  { channel: "Direct", firstTouch: 3, lastTouch: 3, linear: 4, positionBased: 4 },
];

// ---------------------------------------------------------------------------
// AI-driven Recommendations
// ---------------------------------------------------------------------------

export const recommendations: Recommendation[] = [
  {
    channel: "Email Marketing",
    action: "increase",
    priority: "high",
    reason:
      "Highest ROAS (34.7x) and lowest CPA ($4.32) across all channels. Email drives 13% of total revenue on just 2% of total spend. Your subscriber base is an underutilised goldmine.",
    impact: "Increasing email frequency by 1 send/week could yield an additional $30,000/month in ticket revenue.",
    suggestedChange: "+25% budget allocation, add segmented nurture sequences",
  },
  {
    channel: "SMS / Push Notifications",
    action: "increase",
    priority: "high",
    reason:
      "Second-highest ROAS (32.1x) with extremely low CPA ($4.67). Performance is steady — this channel has headroom to scale before saturation.",
    impact: "Expanding SMS list by 20% could drive 85+ additional ticket sales per month.",
    suggestedChange: "+30% budget, invest in list growth tactics (opt-in incentives at checkout)",
  },
  {
    channel: "Organic Social",
    action: "increase",
    priority: "high",
    reason:
      "ROAS of 11.5x is exceptional for a low-spend channel. Engagement is trending up 18% WoW. Content is resonating — amplify what works.",
    impact: "Doubling content output could drive 200+ additional conversions per month.",
    suggestedChange: "+50% content creation budget, hire part-time creator, repurpose top performers to paid",
  },
  {
    channel: "SEO / Organic Search",
    action: "maintain",
    priority: "medium",
    reason:
      "Steady 9.8x ROAS with consistent week-over-week growth of 6%. SEO is a long-term compounding asset — keep investing but don't expect immediate spikes.",
    impact: "Maintaining current investment preserves $78K/month revenue stream with compounding growth.",
    suggestedChange: "Hold current spend, focus on converting existing traffic better with landing page tests",
  },
  {
    channel: "Google Ads",
    action: "maintain",
    priority: "medium",
    reason:
      "Solid 2.2x ROAS with healthy trend. Search captures high-intent buyers. Display component is weaker — consider shifting Display budget to Search.",
    impact: "Reallocating 30% of Display spend to Search could improve overall channel ROAS to 2.6x.",
    suggestedChange: "Shift budget from Display to Search, tighten keyword targeting, add negative keywords",
  },
  {
    channel: "Meta Ads",
    action: "maintain",
    priority: "medium",
    reason:
      "2.1x ROAS is acceptable for scale. The channel is your largest awareness driver (2.8M impressions). Trend is positive at +12% WoW.",
    impact: "Optimising creative and audiences could lift ROAS from 2.1x to 2.5x without increasing spend.",
    suggestedChange: "A/B test new creative formats, refine lookalike audiences, test advantage+ campaigns",
  },
  {
    channel: "TikTok Ads",
    action: "test",
    priority: "medium",
    reason:
      "Fastest-growing channel (+25% WoW) but ROAS is below 2.0x. High awareness value (3.2M impressions) but conversion path needs work.",
    impact: "Improving landing page experience for TikTok traffic could lift ROAS from 1.96x to 2.5x.",
    suggestedChange: "Test dedicated TikTok landing pages, implement TikTok Pixel events, test Spark Ads",
  },
  {
    channel: "Influencer Partnerships",
    action: "test",
    priority: "medium",
    reason:
      "3.1x ROAS is strong and trending up 15%. However, performance varies wildly by creator. Need to identify and double down on top performers.",
    impact: "Concentrating budget on top 20% of creators could lift channel ROAS to 4.5x.",
    suggestedChange: "Audit creator performance, cut bottom 50%, reinvest in proven creators with exclusivity deals",
  },
  {
    channel: "Programmatic Display",
    action: "reduce",
    priority: "high",
    reason:
      "Only channel with ROAS below 1.0x (0.95x) — you are losing money. CPA of $158 is 2.3x the average. Trend is negative (-5% WoW).",
    impact: "Cutting programmatic by 50% saves $7,500/month with minimal revenue impact (~$7,125 lost).",
    suggestedChange: "-50% budget immediately, reallocate to Email and Organic Social which are 10-35x more efficient",
  },
  {
    channel: "Affiliate / Partners",
    action: "maintain",
    priority: "low",
    reason:
      "3.8x ROAS is solid but flat. Channel is on autopilot — not growing, not declining. Low priority for optimisation.",
    impact: "Channel generates steady $46K/month revenue with predictable returns.",
    suggestedChange: "No changes needed. Review partner terms annually, recruit 2-3 new affiliates per quarter",
  },
];

// ---------------------------------------------------------------------------
// Category summaries
// ---------------------------------------------------------------------------

export type CategorySummary = {
  category: string;
  spend: number;
  revenue: number;
  conversions: number;
  roas: number;
  color: string;
};

export const categorySummaries: CategorySummary[] = [
  { category: "Paid Media", spend: 120000, revenue: 235950, conversions: 1573, roas: 1.97, color: "#3B82F6" },
  { category: "Organic", spend: 13000, revenue: 135600, conversions: 904, roas: 10.43, color: "#22C55E" },
  { category: "CRM", spend: 5500, revenue: 185700, conversions: 1238, roas: 33.76, color: "#EF4444" },
  { category: "Referral", spend: 30000, revenue: 101400, conversions: 676, roas: 3.38, color: "#F59E0B" },
  { category: "Direct", spend: 0, revenue: 84000, conversions: 560, roas: Infinity, color: "#8B5CF6" },
];

// ---------------------------------------------------------------------------
// Weekly aggregated trend data
// ---------------------------------------------------------------------------

export const weeklyTrend = ["W1", "W2", "W3", "W4"].map((week) => {
  const weekData = channels.reduce(
    (acc, channel) => {
      const w = channel.weeklyData.find((d) => d.week === week);
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
  return { ...weekData, roas: weekData.revenue / weekData.spend };
});
