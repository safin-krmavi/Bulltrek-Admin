import { Bell, Search } from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const metrics = [
  { label: "Monthly Recurring Revenue (MRR)", value: "156", change: "+15.03%" },
  { label: "Annual Recurring Revenue (ARR)", value: "2,318", change: "+6.05%" },
  { label: "Churn Rate", value: "7,265", change: "+11.01%" },
  { label: "Customer Lifetime Value (CLV)", value: "156", change: "+15.03%" },
  { label: "Active Subscribers", value: "2,318", change: "+6.05%" },
];

const chartPeriods = ["1D", "7D", "1M", "3M", "6M", "1Y", "Max"];

const mrrChartData = [
  { name: "Jan", value1: 12000, value2: 10000 },
  { name: "Feb", value1: 9000, value2: 10000 },
  { name: "Mar", value1: 15000, value2: 22000 },
  { name: "Apr", value1: 25000, value2: 12000 },
  { name: "May", value1: 30000, value2: 18000 },
  { name: "Jun", value1: 20000, value2: 23000 },
  { name: "Jul", value1: 24000, value2: 32000 },
];

export default function FinanceInfo() {
  const [activeTab, setActiveTab] = useState("Combine");
  const [activePeriod, setActivePeriod] = useState("6M");

  return (
    <div className="bg-white min-h-screen px-8 py-8">
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.5s ease-out forwards;
          }
          .animate-row {
            animation: fadeInUp 0.5s ease-out forwards;
            animation-delay: calc(var(--row-index) * 0.1s);
          }
        `}
      </style>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 animate-fadeInUp"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="text-sm text-gray-500 font-medium">{m.label}</div>
            <div className="text-2xl font-semibold text-gray-800">{m.value}</div>
            <div className="text-sm text-[#f59120] font-medium">{m.change}</div>
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        {["Combine", "Copy Trade", "Market Place"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-base font-semibold transition-colors ${
              activeTab === tab
                ? "border-b-2 border-[#f59120] text-[#f59120]"
                : "text-gray-600 hover:text-[#f59120]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Chart Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold text-gray-800">Monthly Recurring Revenue (MRR)</div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#f59120] text-white rounded-lg font-medium text-sm hover:bg-[#e07d13] transition-colors shadow-sm">
              <Search className="w-5 h-5" />
              Analyze
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#ffb347] text-white rounded-lg font-medium text-sm hover:bg-[#e0a030] transition-colors shadow-sm">
              <Bell className="w-5 h-5" />
              Notify
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={mrrChartData}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                  tickFormatter={(v) => `${Math.round(v / 1000)}K`}
                  width={40}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value1"
                  stroke="#222"
                  strokeWidth={2.5}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="value2"
                  stroke="#f59120"
                  strokeWidth={2.5}
                  strokeDasharray="6 4"
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Period Buttons */}
        <div className="flex gap-2 mt-4 justify-end">
          {chartPeriods.map((period) => (
            <button
              key={period}
              className={`px-3 py-1.5 rounded-lg border ${
                activePeriod === period
                  ? "bg-[#f59120] text-white border-[#f59120]"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100 bg-white"
              } text-sm font-medium transition-colors`}
              onClick={() => setActivePeriod(period)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}