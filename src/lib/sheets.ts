// =============================================================================
// Google Sheets CSV fetcher
// Reads from a published Google Sheet (File > Share > Publish to web > CSV)
// =============================================================================

export interface SheetRow {
  [key: string]: string;
}

export async function fetchSheetCSV(url: string): Promise<SheetRow[]> {
  const res = await fetch(url, { next: { revalidate: 300 } }); // cache 5 min
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);

  const text = await res.text();
  return parseCSV(text);
}

function parseCSV(text: string): SheetRow[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows: SheetRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0 || values.every((v) => !v.trim())) continue;

    const row: SheetRow = {};
    headers.forEach((h, idx) => {
      row[h.trim().toLowerCase().replace(/\s+/g, "_")] = (values[idx] || "").trim();
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// ---------------------------------------------------------------------------
// Transform sheet rows into our ChannelData format
// ---------------------------------------------------------------------------

import { ChannelData } from "./data";

const categoryMap: Record<string, ChannelData["category"]> = {
  paid: "paid",
  organic: "organic",
  crm: "crm",
  referral: "referral",
  direct: "direct",
};

const defaultColors: Record<string, string> = {
  "meta ads": "#1877F2",
  "google ads": "#4285F4",
  "tiktok ads": "#010101",
  "snapchat ads": "#FFFC00",
  "programmatic": "#FF6B35",
  "organic social": "#25D366",
  "seo": "#34A853",
  "email": "#EA4335",
  "sms": "#9C27B0",
  "influencer": "#FF9800",
  "affiliate": "#607D8B",
  "direct": "#795548",
  "activecampaign": "#356AE6",
  "clubtickets": "#E91E63",
};

function num(val: string | undefined): number {
  if (!val) return 0;
  return parseFloat(val.replace(/[£$€,]/g, "")) || 0;
}

export function transformSheetToChannels(rows: SheetRow[]): ChannelData[] {
  return rows
    .filter((r) => r.channel && r.channel.trim())
    .map((r) => {
      const spend = num(r.spend);
      const revenue = num(r.revenue);
      const conversions = num(r.conversions) || num(r.tickets_sold) || num(r.sales);
      const leads = num(r.leads);
      const clicks = num(r.clicks);
      const impressions = num(r.impressions);
      const trendPercent = num(r.trend_percent) || num(r.wow_change) || 0;

      const channelKey = r.channel.toLowerCase().trim();

      return {
        id: channelKey.replace(/[\s/]+/g, "-"),
        name: r.channel.trim(),
        category: categoryMap[(r.category || "paid").toLowerCase().trim()] || "paid",
        color: defaultColors[channelKey] || "#6B7280",
        spend,
        impressions,
        clicks,
        leads,
        conversions,
        revenue,
        cpa: conversions > 0 ? spend / conversions : 0,
        roas: spend > 0 ? revenue / spend : (revenue > 0 ? Infinity : 0),
        trend: trendPercent > 3 ? "up" : trendPercent < -3 ? "down" : "flat",
        trendPercent,
        // Weekly data from sheet — user can add w1_spend, w2_spend, etc. columns
        weeklyData: buildWeeklyData(r),
      };
    });
}

function buildWeeklyData(r: SheetRow) {
  const weeks = ["W1", "W2", "W3", "W4"];
  return weeks.map((week) => {
    const prefix = week.toLowerCase() + "_";
    return {
      week,
      spend: num(r[prefix + "spend"]),
      impressions: num(r[prefix + "impressions"]),
      clicks: num(r[prefix + "clicks"]),
      leads: num(r[prefix + "leads"]),
      conversions: num(r[prefix + "conversions"]),
      revenue: num(r[prefix + "revenue"]),
    };
  });
}
