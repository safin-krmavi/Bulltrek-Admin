import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const strategyLineData = [
  { name: "Jan", value1: 12000, value2: 10000 },
  { name: "Feb", value1: 9000, value2: 10000 },
  { name: "Mar", value1: 15000, value2: 22000 },
  { name: "Apr", value1: 25000, value2: 12000 },
  { name: "May", value1: 30000, value2: 18000 },
  { name: "Jun", value1: 20000, value2: 23000 },
  { name: "Jul", value1: 24000, value2: 32000 },
];

const timeRanges = ["1D", "7D", "1M", "3M", "6M", "1Y", "Max"];

const tradeOptions = [
  "Total Trades",
  "Total Profit",
  "Total Loss",
  "Avg Profit",
  "Avg Loss",
  "Avg Profit/User",
  "Avg Loss/User",
];

export default function StrategyStatusChart() {
  const [strategyTab, setStrategyTab] = useState("Strategy Status");
  const [activeRange, setActiveRange] = useState("6M");
  const [selectedTrade, setSelectedTrade] = useState(tradeOptions[0]);

  return (
    <Card className="col-span-2 p-6 border border-gray-200 rounded-2xl bg-[#f7f7fb]">
      <div className="flex flex-col gap-2">
        {/* Tabs and controls */}
        <div className="flex items-center justify-between mb-4">
          {/* Left: Strategy Status tab */}
          <div className="flex items-center gap-2">
            <button
              className={`text-base font-semibold transition ${
                strategyTab === "Strategy Status"
                  ? "text-black"
                  : "text-gray-400"
              }`}
              onClick={() => setStrategyTab("Strategy Status")}
              style={{ padding: 0, background: "none", border: "none" }}
            >
              Strategy Status
            </button>
          </div>
          {/* Right: Operating Status, select, and time range */}
          <div className="flex items-center gap-3">
            <button
              className={`text-base font-semibold transition ${
                strategyTab === "Operating Status"
                  ? "text-black"
                  : "text-gray-400"
              }`}
              onClick={() => setStrategyTab("Operating Status")}
              style={{ padding: 0, background: "none", border: "none" }}
            >
              Operating Status
            </button>
            <select
              className="border border-gray-200 rounded px-3 py-1 text-sm bg-white focus:outline-none appearance-none min-w-[120px]"
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
            >
              {tradeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="flex gap-1 ml-2">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  className={`px-2 py-1 rounded text-xs font-medium transition ${
                    activeRange === range
                      ? "bg-[#f59120] text-white"
                      : "bg-white text-gray-700"
                  }`}
                  style={{
                    minWidth: 32,
                    border:
                      activeRange === range
                        ? "1px solid #f59120"
                        : "1px solid #ececec",
                  }}
                  onClick={() => setActiveRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Chart */}
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={strategyLineData}>
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
    </Card>
  );
}