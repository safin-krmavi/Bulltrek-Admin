import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const referralData = [
  { id: 1, userId: "#AHGA68", totalReferrals: 130, activeReferrals: 80, closedReferrals: 40, pendingReferrals: 10 },
  { id: 2, userId: "#AHGA68", totalReferrals: 130, activeReferrals: 80, closedReferrals: 40, pendingReferrals: 10 },
  { id: 3, userId: "#AHGA68", totalReferrals: 130, activeReferrals: 80, closedReferrals: 40, pendingReferrals: 10 },
  { id: 4, userId: "#AHGA68", totalReferrals: 130, activeReferrals: 80, closedReferrals: 40, pendingReferrals: 10 },
  { id: 5, userId: "#AHGA68", totalReferrals: 130, activeReferrals: 80, closedReferrals: 40, pendingReferrals: 10 },
  { id: 6, userId: "#AHGA68", totalReferrals: 130, activeReferrals: 80, closedReferrals: 40, pendingReferrals: 10 },
  { id: 7, userId: "#AHGA68", totalReferrals: 130, activeReferrals: 80, closedReferrals: 40, pendingReferrals: 10 },
];

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DetailModal({ open, onClose }: DetailModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = referralData.filter(
    (row) =>
      row.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(row.id).includes(searchTerm)
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredData.map((row) => row.id));
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

  const isAllSelected = selectedRows.length === filteredData.length && filteredData.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < filteredData.length;

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[700px] max-w-full">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">No.</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">User ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total referrals</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Active referrals</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Closed referrals</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Pending referrals</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => handleRowSelect(row.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600"
                    />
                  </td>
                  <td className="py-3 px-4 text-blue-600 font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4 text-blue-600 font-medium">{row.userId}</td>
                  <td className="py-3 px-4 text-gray-900">{row.totalReferrals}</td>
                  <td className="py-3 px-4 text-gray-900">{row.activeReferrals}</td>
                  <td className="py-3 px-4 text-gray-900">{row.closedReferrals}</td>
                  <td className="py-3 px-4 text-gray-900">{row.pendingReferrals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Footer with Action Buttons and Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-[#f59120] text-white rounded-md font-medium">
              Release Payout
            </button>
            <button className="px-4 py-2 bg-[#f59120] text-white rounded-md font-medium">
              Closed Payout
            </button>
            <button className="px-4 py-2 bg-[#f59120] text-white rounded-md font-medium">
              Pending Payout
            </button>
          </div>
          {/* Pagination */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex space-x-1">
              {[1, 2, "...", 9, 10].map((page, idx) =>
                page === "..." ? (
                  <span key={idx} className="px-2 py-1 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(Number(page))}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? "bg-[#f59120] text-white"
                        : "text-gray-700 bg-white"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2 rounded-md border border-gray-300 bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Close Modal Button */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}