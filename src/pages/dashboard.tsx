import { useState } from "react";
import { Bell, Search } from "lucide-react";
import UserDashboard from "@/components/dashboard/UserDashboard";
import StrategyDashboard from "@/components/dashboard/StrategyDashboard";
import MarketPlaceDashboard from "@/components/dashboard/MarketPlaceDashboard";
import CopyTradeDashboard from "@/components/dashboard/CopyTradeDashboard";
import AffiliateDashboard from "@/components/dashboard/AffiliateDashboard";
import TicketsDashboard from "@/components/dashboard/TicketsDashboard";


const tabs = [
  "Users",
  "Strategy",
  "Market Place",
  "Copyntrade",
  "Affiliate",
  "Tickets",
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Users");

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col px-8 py-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center w-full max-w-md bg-white border border-gray-200 rounded-lg px-4 py-2">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
        </div>
        <button className="ml-4 p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100">
          <Bell className="text-gray-500" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-10 py-2 font-medium rounded-md shadow-sm transition border
              ${
                activeTab === tab
                  ? "bg-[#f59120] text-white border-[#f59120]"
                  : "bg-white text-gray-700 border-[#ececec] hover:bg-[#f7f7fb]"
              }
            `}
            style={{
              minWidth: 160,
              boxShadow: "0 2px 8px 0 #ececec"
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render tab content */}
      {activeTab === "Users" && <UserDashboard />}
      {activeTab === "Strategy" && <StrategyDashboard />}
      {activeTab === "Market Place" && <MarketPlaceDashboard />}
      {activeTab === "Copyntrade" && <CopyTradeDashboard />}
      {activeTab === "Affiliate" && <AffiliateDashboard />}
      {activeTab === "Tickets" && <TicketsDashboard />}
      {/* Add other tab components here as needed */}
    </div>
  );
}