import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FileText, Download, Table } from "lucide-react";

// Stats data
const stats = [
  { label: "Total Users", value: "156", change: "+15.03%" },
  { label: "Active Users", value: "2,318", change: "+6.08%" },
  { label: "Total Referred Users", value: "7,265", change: "+11.01%" },
  { label: "Active Referred Users", value: "156", change: "+15.03%" },
  { label: "Fake / spam users", value: "2,318", change: "+6.08%" },
  { label: "Revenue shared", value: "7,265", change: "+11.01%" },
];

// Table data
const tableData = [
  { id: "01", userId: "#AHGA68", referrals: 200, approved: 35, revenue: 16000 },
  { id: "02", userId: "#AHGA68", referrals: 130, approved: 42, revenue: 1800 },
  { id: "03", userId: "#AHGA68", referrals: 100, approved: 20, revenue: 600 },
  { id: "04", userId: "#AHGA68", referrals: 400, approved: 120, revenue: 9000 },
];

export default function AffiliateDashboard() {
  const [page, setPage] = useState(1);
  const pageCount = 10;

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {stats.slice(0, 3).map((stat) => (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {stats.slice(3).map((stat) => (
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

      {/* Top Profitable Users Table */}
      <Card className="p-6 border border-gray-200 rounded-2xl bg-[#f7f7fb] w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-gray-800">
            Top Profitable Users
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
                <th className="py-2 px-2 font-medium">No. of Referrals</th>
                <th className="py-2 px-2 font-medium">Approved Referrals</th>
                <th className="py-2 px-2 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="border-b last:border-b-0 hover:bg-[#f3f3f7]">
                  <td className="py-2 px-2">{row.id}</td>
                  <td className="py-2 px-2 text-[#1a73e8] cursor-pointer hover:underline">{row.userId}</td>
                  <td className="py-2 px-2">{row.referrals}</td>
                  <td className="py-2 px-2">{row.approved}</td>
                  <td className="py-2 px-2">{row.revenue.toLocaleString()}</td>
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