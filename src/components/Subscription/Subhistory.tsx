import { useState } from "react";
import {AdjustmentsHorizontalIcon, PencilSquareIcon  } from "@heroicons/react/24/solid";
import { FileText,Plus, Trash2} from "lucide-react";

const userHistoryData = [
  { id: "01", PlanType: "Copy Trade", Price: "1400", expiry: "03/02/2024/02:30" },
  { id: "02", PlanType: "Copy Trade", Price: "1400", expiry: "03/02/2024/02:30" },
  { id: "03", PlanType: "Copy Trade", Price: "1400", expiry: "03/02/2024/02:30" },
  { id: "04", PlanType: "Copy Trade", Price: "1400", expiry: "03/02/2024/02:30" },
  { id: "05", PlanType: "Copy Trade", Price: "1400", expiry: "03/02/2024/02:30" },
  { id: "06", PlanType: "Copy Trade", Price: "1400", expiry: "03/02/2024/02:30" },
  { id: "07", PlanType: "Copy Trade", Price: "1400", expiry: "03/02/2024/02:30" },
];

export default function Userhistory() {
  const [page, setPage] = useState(1);
  const pageCount = 10;

  return (
    <div className="bg-[#f7f7fb] min-h-screen px-4">
      {/* Card/Table */}
      <div className="bg-white rounded-xl shadow p-3 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-gray-800">User List</div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-4 py-2 bg-[#f59120] text-white rounded-md font-medium text-sm hover:bg-[#e07d13] shadow">
              {/* PDF */}
              <FileText className="w-5 h-5" />
              PDF
            </button>
            <button className="flex items-center gap-1 px-4 py-2 bg-[#ffb347] text-white rounded-md font-medium text-sm hover:bg-[#e0a030] shadow">
              {/* Excel */}
              <Plus className="w-5 h-5" />
              Excel
            </button>
            {/* Filter */}
            <button className="flex items-center gap-1 px-3 py-2 bg-[#ffb347] border border-gray-200 rounded-md text-white font-medium text-sm hover:bg-[#e0a030] shadow">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-700 border-b bg-[#f7f7fb]">
                <th className="py-2 px-2 font-medium">
                  <input type="checkbox" />
                </th>
                <th className="py-2 px-2 font-medium">No.</th>
                <th className="py-2 px-2 font-medium">Plan Type</th>
                <th className="py-2 px-2 font-medium">Name</th>
                <th className="py-2 px-2 font-medium">Date & Time</th>
                <th className="py-2 px-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {userHistoryData.map((row) => (
                <tr key={row.id} className="border-b last:border-b-0 hover:bg-[#f7f7fb]">
                  <td className="py-2 px-2">
                    <input type="checkbox" />
                  </td>
                  <td className="py-2 px-2">{row.id}</td>
                  <td className="py-2 px-2">{row.PlanType}</td>
                  <td className="py-2 px-2">{row.Price}</td>
                  <td className="py-2 px-2">{row.expiry}</td>
                  <td className="py-2 px-2 flex gap-2">
                    {/* <button className="text-[#1a73e8] bg-white rounded p-1" title="Send Mail">
                      <EnvelopeIcon className="w-5 h-5"/>
                    </button> */}
                    <button className="text-[#1a73e8] bg-white rounded p-1" title="Send Mail">
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-600 bg-white rounded p-1" title="Delete">
                      <Trash2 className="w-5 h-5" />
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