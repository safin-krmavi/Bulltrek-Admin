import { useState } from "react";
import { FileText, Table, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

const mockUsers = [
  { id: "01", userId: "#AHGA68", trades: 2, strategies: 3, profit: 800000 },
  { id: "02", userId: "#AHGA68", trades: 3, strategies: 2, profit: 750000 },
  { id: "03", userId: "#AHGA68", trades: 2, strategies: 3, profit: 400000 },
  { id: "04", userId: "#AHGA68", trades: 2, strategies: 1, profit: 380000 },
];

const pageCount = 10;

export default function TopProfitableUsers() {
  const [page, setPage] = useState(1);

  return (
    <Card className="p-6 border border-gray-200 rounded-2xl bg-[#f7f7fb] w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-gray-800">Top Profitable Users</div>
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
              <th className="py-2 px-2 font-medium">Strategies</th>
              <th className="py-2 px-2 font-medium">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user, idx) => (
              <tr key={user.id} className="border-b last:border-b-0 hover:bg-[#f3f3f7]">
                <td className="py-2 px-2">{user.id}</td>
                <td className="py-2 px-2 text-[#1a73e8] cursor-pointer hover:underline">{user.userId}</td>
                <td className="py-2 px-2">{user.trades}</td>
                <td className="py-2 px-2">{user.strategies}</td>
                <td className="py-2 px-2">{user.profit.toLocaleString()}</td>
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
  );
}