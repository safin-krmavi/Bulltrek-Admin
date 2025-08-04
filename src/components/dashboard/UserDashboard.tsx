// import { useState } from "react";
import { Card } from "@/components/ui/card";
import StrategyStatusChart from "@/components/ui/StrategyStatusChart";
import TopProfitableUsers from "@/components/dashboard/TopProfitableUsers";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

// --- Move your data/constants here ---
const stats = [
  { label: "New Users", value: "156", change: "+15.03%" },
  { label: "Active Users", value: "2,318", change: "+6.08%" },
  { label: "Total User", value: "7,265", change: "+11.01%" },
  { label: "Active Connected User", value: "3,671", change: "-0.03%" },
  { label: "Live user", value: "156", change: "+15.03%" },
  // Second row
  { label: "Active user balance", value: "2,318", change: "+6.08%" },
  { label: "Total user balance", value: "7,265", change: "+11.01%" },
  { label: "blocked user", value: "3,671", change: "-0.03%" },
  { label: "Deleted user", value: "3,671", change: "-0.03%" },
  { label: "Fake / Non KYC User", value: "3,671", change: "-0.03%" },
];

const trafficByWebsite = [
  { name: "Dhan", value: 40 },
  { name: "Upstox", value: 70 },
  { name: "Angelone", value: 20 },
  { name: "5 Paisa", value: 80 },
  { name: "Zerodha", value: 15 },
  { name: "Loream", value: 60 },
];

const trafficByDevice = [
  { name: "Linux", value: 15000, fill: "#f9b87a" },
  { name: "Mac", value: 30000, fill: "#ffb347" },
  { name: "iOS", value: 22000, fill: "#ffd580" },
  { name: "Windows", value: 35000, fill: "#ff9100" },
  { name: "Android", value: 12000, fill: "#ffb347" },
  { name: "Other", value: 25000, fill: "#ffd580" },
];

const trafficByLocation = [
  { name: "United States", value: 521, color: "#601825" },
  { name: "Canada", value: 228, color: "#ff9100" },
  { name: "Mexico", value: 139, color: "#ffb347" },
  { name: "Other", value: 112, color: "#ffd580" },
];

const totalLocation = trafficByLocation.reduce((sum, item) => sum + item.value, 0);

export default function UserDashboard() {
  // Always 5 columns for both rows
  const columns = 5;
  const firstRow = stats.slice(0, columns);
  const secondRow = stats.slice(columns);

  // Fill the second row with empty slots if needed
  const secondRowFilled = [
    ...secondRow,
    ...Array(Math.max(0, columns - secondRow.length)).fill(null),
  ];

  const cardClass =
    "h-[110px] min-w-[180px] p-4 flex flex-col items-start border border-gray-200 rounded-lg bg-[#f7f7fb]";

  return (
    <>
      {/* Stats Cards */}
      <div className="flex flex-col gap-4 mb-6">
        {/* First row: 5 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {firstRow.map((stat) => (
            <Card key={stat.label} className={cardClass}>
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div
                className={`text-xs mt-1 flex items-center gap-1 ${
                  stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
                <span>↗</span>
              </div>
            </Card>
          ))}
        </div>
        {/* Second row: 5 columns, fill empty if needed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {secondRowFilled.map((stat, idx) =>
            stat ? (
              <Card key={stat.label} className={cardClass}>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div
                  className={`text-xs mt-1 flex items-center gap-1 ${
                    stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                  <span>↗</span>
                </div>
              </Card>
            ) : (
              // Empty placeholder for alignment
              <div key={`empty-${idx}`} className={cardClass + " bg-transparent border-transparent"} />
            )
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategy Status Chart */}
        <StrategyStatusChart />
        {/* Traffic by Website */}
        <Card className="p-6 border border-gray-200 rounded-2xl bg-[#f7f7fb]">
          <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold text-gray-800">
              Traffic by Website
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {trafficByWebsite.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-gray-800">{item.name}</span>
                  <div className="flex-1 flex items-center gap-1">
                    <div
                      className="h-1.5 rounded bg-[#601825]"
                      style={{ width: `${item.value}%`, minWidth: 24, maxWidth: 80 }}
                    />
                    <div
                      className="h-1.5 rounded bg-[#e5d6db]"
                      style={{ width: `${100 - item.value}%`, minWidth: 24, maxWidth: 80 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Traffic by Device */}
        <Card className="p-6 border border-gray-200 rounded-2xl bg-[#f7f7fb]">
          <div className="text-lg font-semibold text-gray-800 mb-2">
            Traffic by Device
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ReBarChart data={trafficByDevice} barSize={38}>
              <CartesianGrid vertical={false} stroke="#f3f3f3" />
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
                tickFormatter={v => `${Math.round(v / 1000)}K`}
              />
              <Bar dataKey="value">
                {trafficByDevice.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.fill} />
                ))}
              </Bar>
            </ReBarChart>
          </ResponsiveContainer>
        </Card>

        {/* Traffic by Location */}
        <Card className="p-6 border border-gray-200 rounded-2xl bg-[#f7f7fb]">
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-semibold text-gray-800">
              Traffic by Location
            </div>
            <select className="border border-gray-200 rounded px-2 py-1 text-sm bg-white focus:outline-none">
              <option>Country</option>
              {/* Add more options if needed */}
            </select>
          </div>
          <div className="flex items-center mt-10">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie
                  data={trafficByLocation}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={3}
                  startAngle={90}
                  endAngle={-270}
                >
                  {trafficByLocation.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="ml-6 flex-1">
              {trafficByLocation.map((item) => (
                <div key={item.name} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span className="text-sm text-gray-800">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {((item.value / totalLocation) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Profitable Users Section */}
      <div className="mt-6">
        <TopProfitableUsers />
      </div>
      <div className="mt-6">
        <TopProfitableUsers />
      </div>
    </>
  );
}