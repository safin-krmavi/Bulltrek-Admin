import { useState } from "react";
import { PencilSquareIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { FileText, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const userHistoryData = [
  { id: "01", create: "03/02/2024", Button_Url: "https://www.figma.com/design/pzWWIBvPDGRgCO8rdK0Xjp/Bull-Trek?node-id=704-8975&t=r4FWh2rkmZkc7PiU-0" },
  { id: "02", create: "03/02/2024", Button_Url: "https://www.figma.com/design/pzWWIBvPDGRgCO8rdK0Xjp/Bull-Trek?node-id=704-8975&t=r4FWh2rkmZkc7PiU-0" },
  { id: "03", create: "03/02/2024", Button_Url: "https://www.figma.com/design/pzWWIBvPDGRgCO8rdK0Xjp/Bull-Trek?node-id=704-8975&t=r4FWh2rkmZkc7PiU-0" },
  { id: "04", create: "03/02/2024", Button_Url: "https://www.figma.com/design/pzWWIBvPDGRgCO8rdK0Xjp/Bull-Trek?node-id=704-8975&t=r4FWh2rkmZkc7PiU-0" },
  { id: "05", create: "03/02/2024", Button_Url: "https://www.figma.com/design/pzWWIBvPDGRgCO8rdK0Xjp/Bull-Trek?node-id=704-8975&t=r4FWh2rkmZkc7PiU-0" },
  { id: "06", create: "03/02/2024", Button_Url: "https://www.figma.com/design/pzWWIBvPDGRgCO8rdK0Xjp/Bull-Trek?node-id=704-8975&t=r4FWh2rkmZkc7PiU-0" },
  { id: "07", create: "03/02/2024", Button_Url: "https://www.figma.com/design/pzWWIBvPDGRgCO8rdK0Xjp/Bull-Trek?node-id=704-8975&t=r4FWh2rkmZkc7PiU-0" },
  { id: "08", create: "03/02/2024", Button_Url: "https://www.figma.com/design/pzWWIBvPDGRgCO8rdK0Xjp/Bull-Trek?node-id=704-8975&t=r4FWh2rkmZkc7PiU-0" },
  { id: "09", create: "03/02/2024", Button_Url: "https://www.figma.com/design/pzWWIBvPDGRgCO8rdK0Xjp/Bull-Trek?node-id=704-8975&t=r4FWh2rkmZkc7PiU-0" },
];

function hideHalfUrl(url: string) {
  if (!url) return "";
  // if short, return as-is
  if (url.length <= 40) return url;
  // show first 25% and last 25% (hide middle ~50%)
  const part = Math.ceil(url.length * 0.25);
  return `${url.slice(0, part)}...${url.slice(-part)}`;
}

export default function UserList() {
  const [page, setPage] = useState(1);
  const pageCount = 10;
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-gray-800">History</div>
          <div className="flex gap-2 items-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#f59120] text-white rounded-md font-medium text-sm hover:bg-[#e07d13] shadow">
              <FileText className="w-4 h-4" />
              PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#ffb347] text-white rounded-md font-medium text-sm hover:bg-[#e0a030] shadow">
              <Plus className="w-4 h-4" />
              Excel
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-[#ffb347] text-white rounded-md font-medium text-sm hover:bg-[#e0a030] shadow">
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-fixed">
            <thead>
              <tr className="text-left text-gray-700 border-b bg-[#f7f7fb]">
                <th className="py-3 px-3 w-12"><input type="checkbox" /></th>
                <th className="py-3 px-3 w-16">No.</th>
                <th className="py-3 px-3 w-48">Banner Creation Date</th>
                <th className="py-3 px-3">Button URL</th>
                <th className="py-3 px-3 w-32 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {userHistoryData.map((row) => (
                <tr key={row.id} className="border-b last:border-b-0 hover:bg-[#f7f7fb]">
                  <td className="py-3 px-3">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-3 text-[#1a73e8] font-medium">{row.id}</td>
                  <td className="py-3 px-3 text-gray-600">{row.create}</td>
                  <td className="py-3 px-3">
                    <a
                      href={row.Button_Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1a73e8] hover:underline block w-full overflow-hidden"
                      title={row.Button_Url}
                    >
                      {hideHalfUrl(row.Button_Url)}
                    </a>
                  </td>
                  <td className="py-3 px-3 flex justify-center gap-3">
                    <button
                      className="text-[#1a73e8] bg-white rounded p-1"
                      title="Edit"
                      onClick={() => navigate("/user-details")}
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 bg-white rounded p-1"
                      title="Delete"
                    >
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
            className="px-2 py-1 rounded-sm border border-gray-300 text-gray-500 bg-white disabled:opacity-50"
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
            className="px-2 py-1 rounded border border-gray-300 text-gray-500 bg-white disabled:opacity-50"
            disabled={page === pageCount}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}