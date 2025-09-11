/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts"
import { Users, Package, DollarSign, TrendingUp, Calendar, Dot } from "lucide-react"

// If you use shadcn/ui, keep these imports. Otherwise, replace Card* with simple divs.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// --- Sample Data (replace with real API data) ---
const monthlySales = [
  { name: "Jan", value: 160 },
  { name: "Feb", value: 360 },
  { name: "Mar", value: 190 },
  { name: "Apr", value: 280 },
  { name: "May", value: 170 },
  { name: "Jun", value: 180 },
  { name: "Jul", value: 270 },
  { name: "Aug", value: 110 },
  { name: "Sep", value: 200 },
  { name: "Oct", value: 350 },
  { name: "Nov", value: 260 },
  { name: "Dec", value: 100 },
]

const gaugeData = [{ name: "Target", value: 75.55, fill: "#244B35" }]

// --- Small Utils ---
function TrendBadge({ up = true, value = "11.01%" }: { up?: boolean; value?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
        up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
      }`}
    >
      <Dot className={`h-4 w-4 ${up ? "text-emerald-500" : "text-rose-500"}`} />
      {value}
    </span>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  trendUp,
  trendText,
}: {
  title: string
  value: string
  icon: any
  trendUp?: boolean
  trendText?: string
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card className="rounded-2xl border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-900/60 dark:border-slate-800 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
              <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            </span>
            {title}
          </CardTitle>
          <TrendBadge up={trendUp} value={trendText} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SalesChartCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full">
      <Card className="rounded-2xl border-slate-200 bg-white/70 h-full backdrop-blur  supports-[backdrop-filter]:bg-white/60 dark:bg-slate-900/60 dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-base text-slate-800 dark:text-slate-100">Monthly Bookings</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8" }} />
                <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="value" radius={[8, 8, 4, 4]} fill="#113F67"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TargetGaugeCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
      <Card className="rounded-2xl border-slate-200 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:from-slate-900/70 dark:to-slate-900/50 dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-slate-800 dark:text-slate-100">Monthly Target</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            {/* Gauge */}
            <div className="relative mx-auto h-44 w-full max-w-xs">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="80%"
                  outerRadius="100%"
                  data={gaugeData}
                  startAngle={180}
                  endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={20} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center mt-6">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">75.55%</div>
                <TrendBadge up value="+10%" />
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400 px-4">
                  You earned $3287 today, higher than last month. Keep it up!
                </p>
              </div>
            </div>

            {/* Footer Stats */}
            <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 rounded-xl overflow-hidden bg-slate-50/60 dark:bg-slate-900/40">
              <div className="p-4 text-center">
                <div className="text-xs text-slate-500">Target</div>
                <div className="mt-1 font-semibold text-slate-900 dark:text-white">$20K</div>
                <TrendBadge up={false} value="-2%" />
              </div>
              <div className="p-4 text-center">
                <div className="text-xs text-slate-500">Revenue</div>
                <div className="mt-1 font-semibold text-slate-900 dark:text-white">$20K</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-xs text-slate-500">Today</div>
                <div className="mt-1 font-semibold text-slate-900 dark:text-white">$20K</div>
                <TrendBadge up value="+4%" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function LowerSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
      <Card className="rounded-2xl border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-900/60 dark:border-slate-800 shadow-sm">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base text-slate-800 dark:text-slate-100">Statistics</CardTitle>
            <p className="text-sm text-slate-500">Targets you set for each month</p>
          </div>
          <div className="flex items-center gap-3">
            <Tabs defaultValue="overview" className="w-full sm:w-auto">
              <TabsList className="rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                <TabsTrigger value="overview" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="sales" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow">
                  Sales
                </TabsTrigger>
                <TabsTrigger value="revenue" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow">
                  Revenue
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" className="rounded-full gap-2">
              <Calendar className="h-4 w-4" />
              Aug 23, 2025 – Aug 29, 2025
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniKPI title="Occupancy" value="82%" trend="+3%" />
            <MiniKPI title="Avg. Night Price" value="$126" trend="+2%" />
            <MiniKPI title="Nights Booked" value="284" trend="+9%" />
            <MiniKPI title="Cancellations" value="12" trend="-6%" up={false} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function MiniKPI({ title, value, trend, up = true }: { title: string; value: string; trend: string; up?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/60 dark:bg-slate-900/40">
      <div className="text-sm text-slate-500 mb-2">{title}</div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</div>
        <TrendBadge up={up} value={trend} />
      </div>
    </div>
  )
}

// ---- PAGE WRAPPER ----
export default function HostDashboardPage() {
  return (
    <div className="relative min-h-screen">
      {/* Glow Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-80 w-80 rounded-full bg-[#244B35]/25 blur-[120px]" />
        <div className="absolute bottom-0 right-[-10%] h-96 w-96 rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl ">
        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard title="Customers" value="3,782" icon={Users} trendUp trendText="11.01%" />
          <StatCard title="Orders" value="5,359" icon={Package} trendUp={false} trendText="9.05%" />
          <StatCard title="Revenue" value="$20,487" icon={DollarSign} trendUp trendText="6.31%" />
        </div>

        {/* Middle Row */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 ">
            <SalesChartCard />
          </div>
          <div className="lg:col-span-1">
            <TargetGaugeCard />
          </div>
        </div>

        {/* Lower Section */}
        <div className="mt-6">
          <LowerSection />
        </div>
      </div>
    </div>
  )
}
