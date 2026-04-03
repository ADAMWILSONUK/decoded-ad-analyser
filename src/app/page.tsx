import { LayoutDashboard, Calendar, Database, FlaskConical } from "lucide-react";
import KPICards from "@/components/dashboard/KPICards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ChannelPerformance from "@/components/dashboard/ChannelPerformance";
import FunnelChart from "@/components/dashboard/FunnelChart";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import AttributionChart from "@/components/dashboard/AttributionChart";
import ChannelTrends from "@/components/dashboard/ChannelTrends";
import CRMPerformance from "@/components/dashboard/CRMPerformance";
import Recommendations from "@/components/dashboard/Recommendations";
import { loadDashboardData } from "@/lib/load-data";
import Link from "next/link";

export default async function Home() {
  const data = await loadDashboardData();

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                Marketing Attribution Dashboard
              </h1>
              <p className="text-xs text-zinc-500">
                Holistic view — every touchpoint driving ticket sales
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last 4 weeks</span>
            </div>
            {data.dataSource === "demo" ? (
              <Link
                href="/setup"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-medium hover:bg-amber-500/20 transition-colors"
              >
                <FlaskConical className="w-3 h-3" />
                DEMO DATA — Connect Live
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-medium">
                <Database className="w-3 h-3" />
                LIVE
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Section: Executive Summary */}
        <section>
          <KPICards
            totalRevenue={data.totalRevenue}
            totalSpend={data.totalSpend}
            blendedROAS={data.blendedROAS}
            totalConversions={data.totalConversions}
            blendedCPA={data.blendedCPA}
            totalLeads={data.totalLeads}
            channelCount={data.channelCount}
          />
        </section>

        {/* Section: Revenue & Spend Trends */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueChart weeklyTrend={data.weeklyTrend} />
          <CategoryBreakdown categorySummaries={data.categorySummaries} totalRevenue={data.totalRevenue} />
        </section>

        {/* Section: Channel Performance Table */}
        <section>
          <ChannelPerformance channels={data.channels} />
        </section>

        {/* Section: Funnel & Attribution */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FunnelChart funnelStages={data.funnelStages} />
          <AttributionChart attributionData={data.attributionData} />
        </section>

        {/* Section: Channel Trends & CRM */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChannelTrends channels={data.channels} />
          <CRMPerformance channels={data.channels} />
        </section>

        {/* Section: Recommendations */}
        <section>
          <Recommendations recommendations={data.recommendations} />
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-zinc-800">
          <p className="text-xs text-zinc-600">
            Marketing Attribution Dashboard — {data.dataSource === "demo" ? "Showing demo data" : "Connected to Google Sheets"} — <Link href="/setup" className="text-blue-500 hover:underline">Setup Guide</Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
