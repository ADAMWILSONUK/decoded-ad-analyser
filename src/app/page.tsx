import { LayoutDashboard, Calendar } from "lucide-react";
import KPICards from "@/components/dashboard/KPICards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ChannelPerformance from "@/components/dashboard/ChannelPerformance";
import FunnelChart from "@/components/dashboard/FunnelChart";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import AttributionChart from "@/components/dashboard/AttributionChart";
import ChannelTrends from "@/components/dashboard/ChannelTrends";
import CRMPerformance from "@/components/dashboard/CRMPerformance";
import Recommendations from "@/components/dashboard/Recommendations";

export default function Home() {
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
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Last 4 weeks</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px]">
              LIVE
            </span>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Section: Executive Summary */}
        <section>
          <KPICards />
        </section>

        {/* Section: Revenue & Spend Trends */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueChart />
          <CategoryBreakdown />
        </section>

        {/* Section: Channel Performance Table */}
        <section>
          <ChannelPerformance />
        </section>

        {/* Section: Funnel & Attribution */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FunnelChart />
          <AttributionChart />
        </section>

        {/* Section: Channel Trends & CRM */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChannelTrends />
          <CRMPerformance />
        </section>

        {/* Section: Recommendations */}
        <section>
          <Recommendations />
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-zinc-800">
          <p className="text-xs text-zinc-600">
            Marketing Attribution Dashboard — Data refreshes in real-time when connected to live sources
          </p>
        </footer>
      </main>
    </div>
  );
}
