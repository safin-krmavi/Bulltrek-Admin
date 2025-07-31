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
    <div className="bg-[#f7f7fb] min-h-screen px-8 py-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {metrics.map((m, i) => (
          <div key={m.label} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <div className="text-xs text-gray-500">{m.label}</div>
            <div className="text-2xl font-semibold text-gray-800">{m.value}</div>
            <div className="text-xs text-[#f59120] font-medium">{m.change}</div>
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        <button
          className={`py-2 px-4 text-base font-medium ${
            activeTab === "Affiliate History"
              ? "border-b-2 border-[#f59120] text-[#f59120]"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Affiliate History")}
        >
          Affiliate History
        </button>
        <button
          className={`py-2 px-4 text-base font-medium ${
            activeTab === "Affiliate Commission"
              ? "border-b-2 border-[#f59120] text-[#f59120]"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Affiliate Commission")}
        >
          Affiliate Commission
        </button>
      </div>
      {/* Tab Content */}
      {activeTab === "Affiliate History" ? (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold text-gray-800">Affiliate</div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-4 py-2 bg-[#f59120] text-white rounded font-medium text-sm hover:bg-[#e07d13] shadow">
                <FileText className="w-5 h-5" />
                PDF
              </button>
              <button className="flex items-center gap-1 px-4 py-2 bg-[#ffb347] text-white rounded font-medium text-sm hover:bg-[#e0a030] shadow">
                <Plus className="w-5 h-5" />
                Excel
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
                  <th className="py-2 px-2 font-medium">User ID</th>
                  <th className="py-2 px-2 font-medium">Name</th>
                  <th className="py-2 px-2 font-medium">referrals</th>
                  <th className="py-2 px-2 font-medium">Active</th>
                  <th className="py-2 px-2 font-medium">Expired</th>
                  <th className="py-2 px-2 font-medium">Payout</th>
                  <th className="py-2 px-2 font-medium">Assign</th>
                  <th className="py-2 px-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {affiliateRows.map((row) => (
                  <tr key={row.id} className="border-b last:border-b-0 hover:bg-[#f7f7fb]">
                    <td className="py-2 px-2">
                      <input type="checkbox" />
                    </td>
                    <td className="py-2 px-2">{row.id}</td>
                    <td className="py-2 px-2 text-[#1a73e8] cursor-pointer hover:underline">{row.userId}</td>
                    <td className="py-2 px-2">{row.name}</td>
                    <td className="py-2 px-2">{row.referrals}</td>
                    <td className="py-2 px-2">{row.active}</td>
                    <td className="py-2 px-2">{row.expired}</td>
                    <td className="py-2 px-2">
                      <span className={row.payout === "Pending" ? "text-[#f59120] font-medium" : "text-[#22c55e] font-medium"}>
                        {row.payout}
                      </span>
                    </td>
                    <td className="py-2 px-2">{row.assign}</td>
                    <td className="py-2 px-2 flex gap-2">
                      <button
                        className="text-[#1a73e8] bg-white rounded-xl p-1"
                        title="Edit"
                        onClick={() => setShowDetailModal(true)}
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-400 bg-white rounded-xl p-1" title="Delete">
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
          {/* Release Button */}
          <div className="max-w-[1200px] mx-auto">
            <button className="bg-[#f59120] text-white px-6 py-2 rounded font-medium mt-2">
              Release
            </button>
          </div>
          <DetailModal open={showDetailModal} onClose={() => setShowDetailModal(false)} />
        </div>
      ) : (
        // Affiliate Commission Card
        <div className="bg-white rounded-xl shadow p-8 max-w-[1100px] mx-auto">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Affiliate Level Commission</label>
              <input className="w-full border rounded px-3 py-2" placeholder="abhinwww3215@gmail.com" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Discount Amount</label>
              <input className="w-full border rounded px-3 py-2" placeholder="1000" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Discount Percentage</label>
              <input className="w-full border rounded px-3 py-2 bg-gray-100" placeholder="10%" readOnly />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Minimum Referral</label>
              <input className="w-full border rounded px-3 py-2" placeholder="10" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Maximum Referral</label>
              <input className="w-full border rounded px-3 py-2" placeholder="1000" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Maximum Withdrawal Limit</label>
              <input className="w-full border rounded px-3 py-2" placeholder="20-05-2025" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-xs text-gray-500 mb-1">Notes</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Add you text here..."
            />
          </div>
          <div className="flex gap-4">
            <button className="bg-[#f59120] text-white px-6 py-2 rounded font-medium">
              Create Commision
            </button>
            <button className="bg-[#f59120] text-white px-6 py-2 rounded font-medium">
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}