import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const historyData = [
  {
    id: "01",
    planName: "Copy Trade",
    price: "6400",
    duration: "Yearly",
    purchaseDate: "04-05-2025/02:30",
    lastDate: "04-05-2026/02:30",
  },
  {
    id: "02",
    planName: "Copy Trade",
    price: "1400",
    duration: "Monthly",
    purchaseDate: "04-05-2025/02:30",
    lastDate: "04-05-2025/02:30",
  },
  {
    id: "03",
    planName: "Copy Trade",
    price: "6400",
    duration: "Yearly",
    purchaseDate: "04-05-2025/02:30",
    lastDate: "04-05-2026/02:30",
  },
];

export default function PlanInvoice() {
  const [page, setPage] = useState(1);
  const pageCount = 10;

  return (
    <div className="max-w-[1100px] mx-auto">
      {/* Plan & Invoice Card */}
      <div className="bg-white rounded-xl shadow p-8 mb-8">
        <div className="font-semibold text-lg mb-4">Plan & Invoice</div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">User ID</label>
            <select className="w-full border rounded px-3 py-2">
              <option>#AHGA68</option>
              {/* Add more options if needed */}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Plan Name</label>
            <input className="w-full border rounded px-3 py-2" value="Copy Trade" readOnly />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Price</label>
            <input className="w-full border rounded px-3 py-2" value="1400" readOnly />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Plan Duration</label>
            <input className="w-full border rounded px-3 py-2" value="Monthly" readOnly />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Purchase Date/ Time</label>
            <input className="w-full border rounded px-3 py-2" value="04-05-2025" readOnly />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Purchase End Date</label>
            <input className="w-full border rounded px-3 py-2" value="04-06-2025" readOnly />
          </div>
        </div>
      </div>
      {/* History Card */}
      <div className="bg-white rounded-xl shadow p-8">
        <div className="font-semibold text-lg mb-4">History</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-700 border-b bg-[#f7f7fb]">
                <th className="py-2 px-2 font-medium">
                  <input type="checkbox" />
                </th>
                <th className="py-2 px-2 font-medium">No.</th>
                <th className="py-2 px-2 font-medium">Plan Name</th>
                <th className="py-2 px-2 font-medium">Price</th>
                <th className="py-2 px-2 font-medium">Plan Duration</th>
                <th className="py-2 px-2 font-medium">Purchase Date/Time</th>
                <th className="py-2 px-2 font-medium">Purchase Last D./T.</th>
                <th className="py-2 px-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((row) => (
                <tr key={row.id} className="border-b rounded-md last:border-b-0 hover:bg-[#f7f7fb]">
                  <td className="py-2 px-2">
                    <input type="checkbox" />
                  </td>
                  <td className="py-2 px-2">{row.id}</td>
                  <td className="py-2 px-2">{row.planName}</td>
                  <td className="py-2 px-2">{row.price}</td>
                  <td className="py-2 px-2">{row.duration}</td>
                  <td className="py-2 px-2">{row.purchaseDate}</td>
                  <td className="py-2 px-2">{row.lastDate}</td>
                  <td className="py-2 px-2 flex gap-2">
                    <button className="text-[#1a73e8] bg-white rounded p-1" title="Edit">
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-400 bg-white rounded p-1" title="Delete">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-end mt-4 gap-2">
          <button
            className="px-2 py-1 rounded border border-gray-300 text-gray-500 disabled:opacity-50 bg-white"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </button>
          {[1, 2, "...", pageCount].map((p, i) =>
            typeof p === "number" ? (
              <button
                key={p}
                className={`px-2 py-1 rounded border ${
                  page === p
                    ? "bg-[#f59120] text-white border-[#f59120]"
                    : "border-gray-300 text-gray-700 bg-white"
                }`}
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
            className="px-2 py-1 rounded border border-gray-300 text-gray-500 disabled:opacity-50 bg-white"
            disabled={page === pageCount}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}