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
  { label: "Recurring Subscribers", value: "7,265", change: "+11.01%" },
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
    <div className="bg-[#f7f7fb] min-h-screen px-8 py-8">
     				{/* Search Bar */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center w-full max-w-md bg-white border border-gray-200 rounded-lg px-4 py-2">
					<Search className="text-gray-400 mr-2" />
					<input
						type="text"
						placeholder="Search"
						className="flex-1 bg-transparent outline-none text-gray-700"
					/>
				</div>
				<button className="ml-4 p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100">
					<Bell className="text-gray-500" />
				</button>
			</div>
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["Combine", "Copy Trade", "Market Place"].map(tab => (
          <button
            key={tab}
            className={`px-6 py-2 rounded font-medium text-base shadow ${
              activeTab === tab
                ? "bg-[#f59120] text-white"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {metrics.map((m, i) => (
          <div key={m.label} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <div className="text-xs text-gray-500">{m.label}</div>
            <div className="text-2xl font-semibold text-gray-800">{m.value}</div>
            <div className="text-xs text-[#f59120] font-medium">{m.change}</div>
          </div>
        ))}
      </div>
      {/* Chart Card */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium text-gray-700">Monthly Recurring Revenue (MRR)</div>
          <div className="flex gap-2">
            {chartPeriods.map(period => (
              <button
                key={period}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  activePeriod === period
                    ? "bg-[#f59120] text-white"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
                onClick={() => setActivePeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        {/* Chart using recharts */}
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mrrChartData}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14, fill: "#888" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14, fill: "#888" }}
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
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="value2"
                stroke="#f59120"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}