import { LayoutDashboard, ArrowLeft, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-blue-400" />
            <h1 className="text-lg font-bold text-white">Setup Guide</h1>
          </div>
          <Link href="/" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        {/* Intro */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Real Data</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
            The fastest way to get your real marketing data into this dashboard is via Google Sheets.
            You export your data from each platform, paste it into one sheet, publish it to the web,
            and the dashboard reads it automatically. Total setup time: ~15 minutes.
          </p>
        </section>

        {/* Step 1: Create Sheet */}
        <section className="space-y-4">
          <StepHeader number={1} title="Create your Google Sheet" />
          <p className="text-zinc-400 text-sm">
            Create a new Google Sheet with these exact column headers in Row 1:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-xs text-green-400 whitespace-nowrap">
              channel | category | spend | impressions | clicks | leads | conversions | revenue | trend_percent
            </code>
          </div>
          <p className="text-zinc-500 text-xs">
            Optional weekly columns: w1_spend, w1_revenue, w1_conversions, w1_clicks, w1_leads, w1_impressions (repeat for w2, w3, w4)
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-3">Example rows for your setup:</h4>
            <div className="overflow-x-auto">
              <table className="text-xs text-zinc-300 w-full">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-800">
                    <th className="text-left py-2 pr-4">channel</th>
                    <th className="text-left py-2 px-2">category</th>
                    <th className="text-right py-2 px-2">spend</th>
                    <th className="text-right py-2 px-2">impressions</th>
                    <th className="text-right py-2 px-2">clicks</th>
                    <th className="text-right py-2 px-2">leads</th>
                    <th className="text-right py-2 px-2">conversions</th>
                    <th className="text-right py-2 px-2">revenue</th>
                    <th className="text-right py-2 pl-2">trend_percent</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 pr-4">Meta Ads</td>
                    <td className="py-2 px-2">paid</td>
                    <td className="text-right py-2 px-2">45000</td>
                    <td className="text-right py-2 px-2">2800000</td>
                    <td className="text-right py-2 px-2">84000</td>
                    <td className="text-right py-2 px-2">4200</td>
                    <td className="text-right py-2 px-2">630</td>
                    <td className="text-right py-2 px-2">94500</td>
                    <td className="text-right py-2 pl-2">12</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 pr-4">Google Ads</td>
                    <td className="py-2 px-2">paid</td>
                    <td className="text-right py-2 px-2">38000</td>
                    <td className="text-right py-2 px-2">1950000</td>
                    <td className="text-right py-2 px-2">68250</td>
                    <td className="text-right py-2 px-2">3750</td>
                    <td className="text-right py-2 px-2">560</td>
                    <td className="text-right py-2 px-2">84000</td>
                    <td className="text-right py-2 pl-2">8</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 pr-4">TikTok Ads</td>
                    <td className="py-2 px-2">paid</td>
                    <td className="text-right py-2 px-2">22000</td>
                    <td className="text-right py-2 px-2">3200000</td>
                    <td className="text-right py-2 px-2">96000</td>
                    <td className="text-right py-2 px-2">2880</td>
                    <td className="text-right py-2 px-2">288</td>
                    <td className="text-right py-2 px-2">43200</td>
                    <td className="text-right py-2 pl-2">25</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 pr-4">Snapchat Ads</td>
                    <td className="py-2 px-2">paid</td>
                    <td className="text-right py-2 px-2">12000</td>
                    <td className="text-right py-2 px-2">1800000</td>
                    <td className="text-right py-2 px-2">54000</td>
                    <td className="text-right py-2 px-2">1620</td>
                    <td className="text-right py-2 px-2">162</td>
                    <td className="text-right py-2 px-2">24300</td>
                    <td className="text-right py-2 pl-2">10</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2 pr-4">ActiveCampaign (Email)</td>
                    <td className="py-2 px-2">crm</td>
                    <td className="text-right py-2 px-2">3500</td>
                    <td className="text-right py-2 px-2">180000</td>
                    <td className="text-right py-2 px-2">27000</td>
                    <td className="text-right py-2 px-2">5400</td>
                    <td className="text-right py-2 px-2">810</td>
                    <td className="text-right py-2 px-2">121500</td>
                    <td className="text-right py-2 pl-2">10</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">ClubTickets (Direct)</td>
                    <td className="py-2 px-2">direct</td>
                    <td className="text-right py-2 px-2">0</td>
                    <td className="text-right py-2 px-2">0</td>
                    <td className="text-right py-2 px-2">28000</td>
                    <td className="text-right py-2 px-2">2800</td>
                    <td className="text-right py-2 px-2">560</td>
                    <td className="text-right py-2 px-2">84000</td>
                    <td className="text-right py-2 pl-2">5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Step 2: Where to find data */}
        <section className="space-y-4">
          <StepHeader number={2} title="Export data from your platforms" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PlatformCard
              name="Meta Ads Manager"
              fields="Spend, Impressions, Clicks, Leads, Purchases, Purchase Value"
              steps={[
                "Go to Ads Manager → select your date range (last 28 days)",
                "Customise Columns → add: Amount Spent, Impressions, Link Clicks, Leads, Purchases, Purchase Conversion Value",
                "Export → Download as CSV",
                "Copy the totals row into your Google Sheet",
              ]}
            />
            <PlatformCard
              name="Google Ads"
              fields="Cost, Impressions, Clicks, Conversions, Conv. Value"
              steps={[
                "Go to Campaigns → set date range to last 28 days",
                "Modify Columns → add: Cost, Impressions, Clicks, Conversions, Conv. Value",
                "Download → CSV",
                "Sum up Search + Display totals (or split into separate rows)",
              ]}
            />
            <PlatformCard
              name="TikTok Ads Manager"
              fields="Total Cost, Impressions, Clicks, Conversions, Value"
              steps={[
                "Go to Campaign → set date range",
                "Customise Columns → add cost, impressions, clicks, conversions, conversion value",
                "Export → Download",
                "Copy totals into your sheet",
              ]}
            />
            <PlatformCard
              name="Snapchat Ads Manager"
              fields="Spend, Impressions, Swipe Ups, Conversions, Revenue"
              steps={[
                "Go to Manage Ads → select date range",
                "View: Delivery + Conversions columns",
                "Export → CSV",
                "Copy totals into your sheet",
              ]}
            />
            <PlatformCard
              name="ActiveCampaign"
              fields="Sends (impressions), Opens (clicks), Contacts (leads), Purchases"
              steps={[
                "Go to Reports → Campaign Reports",
                "Select date range and export",
                "Use Sends as impressions, Unique Opens as clicks",
                "If tracking purchases via automations, pull from Deals or e-commerce reports",
              ]}
            />
            <PlatformCard
              name="ClubTickets"
              fields="Total ticket sales, revenue, direct visits"
              steps={[
                "Log into your ClubTickets dashboard",
                "Export sales report for your date range",
                "Use total tickets as conversions, total revenue as revenue",
                "For attribution: separate organic/direct sales from referred sales if possible",
              ]}
            />
          </div>
        </section>

        {/* Step 3: Publish */}
        <section className="space-y-4">
          <StepHeader number={3} title="Publish your Google Sheet" />
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-3">
            <Step text='In Google Sheets, go to File → Share → Publish to web' />
            <Step text='Under "Link", select the sheet tab with your data' />
            <Step text='Change format from "Web page" to "Comma-separated values (.csv)"' />
            <Step text="Click Publish and copy the URL" />
            <Step text="The URL will look like: https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv" />
          </div>
        </section>

        {/* Step 4: Connect */}
        <section className="space-y-4">
          <StepHeader number={4} title="Connect to the dashboard" />
          <p className="text-zinc-400 text-sm">
            Open your <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">.env.local</code> file
            and paste your published sheet URL:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <code className="text-xs text-green-400">
              NEXT_PUBLIC_SHEET_URL=https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&amp;single=true&amp;output=csv
            </code>
          </div>
          <p className="text-zinc-400 text-sm">
            Restart the dev server (<code className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">npm run dev</code>)
            and the dashboard will pull your real data. It refreshes every 5 minutes.
          </p>
        </section>

        {/* Step 5: Update cadence */}
        <section className="space-y-4">
          <StepHeader number={5} title="Keep it updated" />
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
            Update your Google Sheet weekly (e.g. every Monday morning). The dashboard will
            automatically pick up changes within 5 minutes. Over time, this becomes a 10-minute
            weekly habit that gives you full visibility into what&apos;s working and what isn&apos;t.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-xs text-blue-300 leading-relaxed">
              <strong>Pro tip:</strong> Create a recurring calendar event every Monday at 9am called
              &quot;Update Marketing Dashboard&quot;. Export data from each platform, paste into the sheet, and
              you&apos;re done. The dashboard handles everything else.
            </p>
          </div>
        </section>

        <footer className="text-center py-8 border-t border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </footer>
      </main>
    </div>
  );
}

function StepHeader({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold shrink-0">
        {number}
      </span>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
  );
}

function Step({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
      <p className="text-sm text-zinc-300">{text}</p>
    </div>
  );
}

function PlatformCard({ name, fields, steps }: { name: string; fields: string; steps: string[] }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-white mb-1">{name}</h4>
      <p className="text-xs text-zinc-500 mb-3">Key fields: {fields}</p>
      <ol className="space-y-1.5">
        {steps.map((step, i) => (
          <li key={i} className="text-xs text-zinc-400 flex gap-2">
            <span className="text-zinc-600 shrink-0">{i + 1}.</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
