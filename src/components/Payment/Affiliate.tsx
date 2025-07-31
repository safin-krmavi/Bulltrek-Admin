import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import DetailModal from "./DetailModal";

const metrics = [
  { label: "Total Affiliates", value: "156", change: "+15.03%" },
  { label: "Total Referrals", value: "2,318", change: "+6.05%" },
  { label: "Confirmed Referrals", value: "7,265", change: "+11.01%" },
  { label: "Total Payouts", value: "156", change: "+15.03%" },
  { label: "Pending Payouts", value: "2,318", change: "+6.05%" },
];

const affiliateRows = [
  { id: "01", userId: "#AHGA68", name: "Sanjay Singh", referrals: "Lorem", active: "Lorem", expired: "03/02/2024", payout: "Pending", assign: "Pankaj" },
  { id: "02", userId: "#AHGA68", name: "Sanjay Singh", referrals: "Lorem", active: "Lorem", expired: "03/02/2024", payout: "Pending", assign: "Pankaj" },
  { id: "03", userId: "#AHGA68", name: "Sanjay Singh", referrals: "Lorem", active: "Lorem", expired: "03/02/2024", payout: "Pending", assign: "Pankaj" },
  { id: "04", userId: "#AHGA68", name: "Sanjay Singh", referrals: "Lorem", active: "Lorem", expired: "03/02/2024", payout: "Pending", assign: "Pankaj" },
  { id: "05", userId: "#AHGA68", name: "Sanjay Singh", referrals: "Lorem", active: "Lorem", expired: "03/02/2024", payout: "Pending", assign: "Pankaj" },
  { id: "06", userId: "#AHGA68", name: "Sanjay Singh", referrals: "Lorem", active: "Lorem", expired: "03/02/2024", payout: "Pending", assign: "Pankaj" },
  { id: "07", userId: "#AHGA68", name: "Sanjay Singh", referrals: "Lorem", active: "Lorem", expired: "03/02/2024", payout: "Pending", assign: "Pankaj" },
];

export default function Affiliate() {
  const [activeTab, setActiveTab] = useState("Affiliate History");
  const [page, setPage] = useState(1);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const pageCount = 10;

  return (
    <div className="bg-white min-h-screen px-8 py-8">
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.5s ease-out forwards;
          }
          .animate-row {
            animation: fadeInUp 0.5s ease-out forwards;
            animation-delay: calc(var(--row-index) * 0.1s);
          }
        `}
      </style>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 animate-fadeInUp"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="text-sm text-gray-500 font-medium">{m.label}</div>
            <div className="text-2xl font-semibold text-gray-800">{m.value}</div>
            <div className="text-sm text-[#f59120] font-medium">{m.change}</div>
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 text-base font-semibold transition-colors ${
            activeTab === "Affiliate History"
              ? "border-b-2 border-[#f59120] text-[#f59120]"
              : "text-gray-600 hover:text-[#f59120]"
          }`}
          onClick={() => setActiveTab("Affiliate History")}
        >
          Affiliate History
        </button>
        <button
          className={`py-2 px-4 text-base font-semibold transition-colors ${
            activeTab === "Affiliate Commission"
              ? "border-b-2 border-[#f59120] text-[#f59120]"
              : "text-gray-600 hover:text-[#f59120]"
          }`}
          onClick={() => setActiveTab("Affiliate Commission")}
        >
          Affiliate Commission
        </button>
      </div>
      {/* Tab Content */}
      <div className="animate-fadeInUp">
        {activeTab === "Affiliate History" ? (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-semibold text-gray-800">Affiliate</div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#f59120] text-white rounded-lg font-medium text-sm hover:bg-[#e07d13] transition-colors shadow-sm">
                  <FileText className="w-5 h-5" />
                  PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#ffb347] text-white rounded-lg font-medium text-sm hover:bg-[#e0a030] transition-colors shadow-sm">
                  <Plus className="w-5 h-5" />
                  Excel
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 font-semibold border-b bg-gray-50">
                    <th className="py-3 px-4">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="py-3 px-4">No.</th>
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Referrals</th>
                    <th className="py-3 px-4">Active</th>
                    <th className="py-3 px-4">Expired</th>
                    <th className="py-3 px-4">Payout</th>
                    <th className="py-3 px-4">Assign</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateRows.map((row, index) => (
                    <tr
                      key={row.id}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition-colors animate-row"
                      style={{ "--row-index": index } as React.CSSProperties}
                    >
                      <td className="py-3 px-4">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="py-3 px-4">{row.id}</td>
                      <td className="py-3 px-4 text-[#1a73e8] cursor-pointer hover:underline">{row.userId}</td>
                      <td className="py-3 px-4">{row.name}</td>
                      <td className="py-3 px-4">{row.referrals}</td>
                      <td className="py-3 px-4">{row.active}</td>
                      <td className="py-3 px-4">{row.expired}</td>
                      <td className="py-3 px-4">
                        <span
                          className={
                            row.payout === "Pending"
                              ? "text-[#f59120] font-medium"
                              : "text-[#22c55e] font-medium"
                          }
                        >
                          {row.payout}
                        </span>
                      </td>
                      <td className="py-3 px-4">{row.assign}</td>
                      <td className="py-3 px-4 flex gap-3">
                        <button
                          className="text-[#1a73e8] hover:text-[#1557b0] bg-white rounded-lg p-1.5 transition-colors"
                          title="Edit"
                          onClick={() => setShowDetailModal(true)}
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-400 bg-white rounded-lg p-1.5 transition-colors"
                          title="Delete"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-end mt-6 gap-3">
              <button
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 bg-white transition-colors"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                &lt;
              </button>
              {[1, 2, "...", pageCount].map((p, i) =>
                typeof p === "number" ? (
                  <button
                    key={p}
                    className={`px-3 py-1.5 rounded-lg border ${
                      page === p
                        ? "bg-[#f59120] text-white border-[#f59120]"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100 bg-white"
                    } transition-colors`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ) : (
                  <span key={i} className="px-3 py-1.5 text-gray-400">
                    {p}
                  </span>
                )
              )}
              <button
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 bg-white transition-colors"
                disabled={page === pageCount}
                onClick={() => setPage(page + 1)}
              >
                &gt;
              </button>
            </div>
            {/* Release Button */}
            <div className="mt-6 text-right">
              <button className="bg-[#f59120] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e07d13] transition-colors">
                Release
              </button>
            </div>
            <DetailModal open={showDetailModal} onClose={() => setShowDetailModal(false)} />
          </div>
        ) : (
          // Affiliate Commission Card
          <div className="bg-white rounded-xl shadow-md p-8 max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-600 font-medium mb-1.5">
                  Affiliate Level Commission
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f59120] transition-colors"
                  placeholder="abhinwww3215@gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 font-medium mb-1.5">
                  Discount Amount
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f59120] transition-colors"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 font-medium mb-1.5">
                  Discount Percentage
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-100 cursor-not-allowed"
                  placeholder="10%"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 font-medium mb-1.5">
                  Minimum Referral
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f59120] transition-colors"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 font-medium mb-1.5">
                  Maximum Referral
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f59120] transition-colors"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 font-medium mb-1.5">
                  Maximum Withdrawal Limit
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f59120] transition-colors"
                  placeholder="20-05-2025"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-gray-600 font-medium mb-1.5">Notes</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f59120] transition-colors"
                rows={4}
                placeholder="Add your text here..."
              />
            </div>
            <div className="flex gap-4">
              <button className="bg-[#f59120] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e07d13] transition-colors">
                Create Commission
              </button>
              <button className="bg-[#f59120] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e07d13] transition-colors">
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}