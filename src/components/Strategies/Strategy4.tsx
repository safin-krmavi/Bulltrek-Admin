import { useState } from "react";
import { FileText, FileSpreadsheet, List } from "lucide-react";

const tableData = [
  { id: 1, staffId: "#AHGA68", login: "04-05-2025/02:30" },
  { id: 2, staffId: "#AHGA68", login: "04-05-2025/02:30" },
  { id: 3, staffId: "#AHGA68", login: "04-05-2025/02:30" },
  { id: 4, staffId: "#AHGA68", login: "04-05-2025/02:30" },
  { id: 5, staffId: "#AHGA68", login: "04-05-2025/02:30" },
  { id: 6, staffId: "#AHGA68", login: "04-05-2025/02:30" },
  { id: 7, staffId: "#AHGA68", login: "04-05-2025/02:30" },
];

export default function Strategy4() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(tableData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const isAllSelected = selectedRows.length === tableData.length && tableData.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < tableData.length;

  return (
    <div className="bg-[#f7f7fb] min-h-screen px-8 py-8">
      {/* Card */}
      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-gray-800">Strategy 4</div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#f59120] text-white px-4 py-2 rounded font-medium">
              <FileText size={18} /> PDF
            </button>
            <button className="flex items-center gap-2 bg-[#f59120] text-white px-4 py-2 rounded font-medium">
              <FileSpreadsheet size={18} /> Excel
            </button>
            <button className="flex items-center gap-2 bg-[#f59120] text-white px-3 py-2 rounded font-medium">
              <List size={18} />
            </button>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={el => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={e => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="py-3 px-2 text-left">No.</th>
                <th className="py-3 px-2 text-left">Staff ID</th>
                <th className="py-3 px-4 text-right">Login Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={e => handleRowSelect(row.id, e.target.checked)}
                    />
                  </td>
                  <td className="py-3 px-2 text-blue-600 font-medium">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-2 text-blue-600 font-medium">
                    <a href="#" className="hover:underline">{row.staffId}</a>
                  </td>
                  <td className="py-3 px-4 text-gray-900 text-right">{row.login}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-end mt-6 gap-3">
          <button
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 bg-white transition-colors"
            disabled
          >
            &lt;
          </button>
          {[1, 2, "...", 9, 10].map((p, i) =>
            typeof p === "number" ? (
              <button
                key={p}
                className={`px-3 py-1.5 rounded-lg border ${
                  p === 1
                    ? "bg-[#f59120] text-white border-[#f59120]"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100 bg-white"
                } transition-colors`}
              >
                {p}
              </button>
            ) : (
              <span key={i} className="px-2 py-1 text-gray-500">
                ...
              </span>
            )
          )}
          <button
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 bg-white transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}