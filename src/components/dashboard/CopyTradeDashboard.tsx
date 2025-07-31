import { useState } from "react";
import { Card } from "@/components/ui/card";
import StrategyStatusChart from "@/components/ui/StrategyStatusChart";
import { FileText, Download, Table } from "lucide-react";

// Dummy stats for the top row (replace with real data as needed)
const stats = [
  { label: "Strategies Created", value: "156", change: "+10.0%" },
  { label: "Active Strategies", value: "2,318", change: "+10.0%" },
  { label: "Total Copy Trade Users", value: "7,265", change: "+10.0%" },
  { label: "Total Copy Trading Users", value: "3,671", change: "+10.0%" },
  { label: "Active Copy Trade Users", value: "3,671", change: "+10.0%" },
  { label: "Active Copy trading user", value: "156", change: "+10.0%" },
  { label: "Total Sold Value", value: "2,318", change: "+10.0%" },
  { label: "Active Rental Value", value: "3,671", change: "+10.0%" },
  { label: "Avg Rental Value", value: "3,671", change: "+10.0%" },
  { label: "Total Rental Revenue", value: "3,671", change: "+10.0%" },
];

// Dummy data for table
const tableData = [
  {
    id: "01",
    userId: "#AHGA68",
    trades: 2,
    profit: 800000,
    date: "03-06-2025",
    buyers: 12,
  },
  {
    id: "02",
    userId: "#AHGA68",
    trades: 2,
    profit: 750000,
    date: "03-06-2025",
    buyers: 10,
  },
  {
    id: "03",
    userId: "#AHGA68",
    trades: 2,
    profit: 400000,
    date: "03-06-2025",
    buyers: 8,
  },
  {
    id: "04",
    userId: "#AHGA68",
    trades: 2,
    profit: 380000,
    date: "03-06-2025",
    buyers: 7,
  },
];

const tabs = [
  "Top Recurring Copy trader in Rent",
  "Top Copy trading users in Rent",
  "Top Creators in Copy Trader",
  "Top Profit Strategies",
  "Top Loss strategies",
];

export default function CopyTradeDashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [page, setPage] = useState(1);
  const pageCount = 5;

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.slice(0, 5).map((stat) => (
          <Card
            key={stat.label}
            className="h-[110px] min-w-[180px] p-4 flex flex-col items-start border border-gray-200 rounded-lg bg-[#f7f7fb]"
          >
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs mt-1 text-green-600">{stat.change}</div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.slice(5).map((stat) => (
          <Card
            key={stat.label}
            className="h-[110px] min-w-[180px] p-4 flex flex-col items-start border border-gray-200 rounded-lg bg-[#f7f7fb]"
          >
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs mt-1 text-green-600">{stat.change}</div>
          </Card>
        ))}
      </div>

      {/* Strategy Status Chart */}
      <StrategyStatusChart />

      {/* CopyTrade Tabs */}
      <div className="flex gap-2 flex-wrap mt-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md font-medium text-sm border transition
              ${
                activeTab === tab
                  ? "bg-[#f59120] text-white border-[#f59120]"
                  : "bg-white text-gray-700 border-[#ececec] hover:bg-[#f7f7fb]"
              }
            `}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Title */}
      <div className="mt-2 mb-1 text-base font-semibold text-gray-800">
        {activeTab}
      </div>

      {/* Table */}
      <Card className="p-6 border border-gray-200 rounded-2xl bg-[#f7f7fb] w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-gray-800">
            {activeTab}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-[#f59120] text-white rounded font-medium text-sm hover:bg-[#e07d13]">
              <FileText size={16} /> PDF
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-[#ffb347] text-white rounded font-medium text-sm hover:bg-[#e0a030]">
              <Download size={16} /> Excel
            </button>
            <button className="flex items-center gap-1 px-2 py-1.5 bg-white border border-gray-200 rounded text-gray-700 hover:bg-gray-100">
              <Table size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-700 border-b">
                <th className="py-2 px-2 font-medium">No.</th>
                <th className="py-2 px-2 font-medium">User ID</th>
                <th className="py-2 px-2 font-medium">No. of Trades</th>
                <th className="py-2 px-2 font-medium">Profit/Loss</th>
                <th className="py-2 px-2 font-medium">Creation Date</th>
                <th className="py-2 px-2 font-medium">Total Traders</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="border-b last:border-b-0 hover:bg-[#f3f3f7]">
                  <td className="py-2 px-2">{row.id}</td>
                  <td className="py-2 px-2 text-[#1a73e8] cursor-pointer hover:underline">{row.userId}</td>
                  <td className="py-2 px-2">{row.trades}</td>
                  <td className={`py-2 px-2 ${row.profit > 0 ? "text-green-600" : "text-red-600"}`}>
                    {row.profit.toLocaleString()}
                  </td>
                  <td className="py-2 px-2">{row.date}</td>
                  <td className="py-2 px-2">{row.buyers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-end mt-4 gap-2">
          <button
            className="px-2 py-1 rounded border border-gray-300 text-gray-500 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </button>
          {[1, 2, "...", pageCount].map((p, i) =>
            typeof p === "number" ? (
              <button
                key={p}
                className={`px-2 py-1 rounded border ${page === p ? "bg-[#f59120] text-white border-[#f59120]" : "border-gray-300 text-gray-700"}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ) : (
              <span key={i} className="px-2 py-1 text-gray-400">
                {p}
              </span>
            )
          )}
          <button
            className="px-2 py-1 rounded border border-gray-300 text-gray-500 disabled:opacity-50"
            disabled={page === pageCount}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>
        </div>
      </Card>
    </div>
  );
}