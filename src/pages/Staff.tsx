import { useState } from "react";
import StaffLogin from "../components/Logs/StaffLogin";
import TicketLoad from "../components/Logs/TicketLoad";

export default function UserDetailsPage() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <>
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8">
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        <button 
          className={`py-2 px-4 text-base font-medium ${
            activeTab === "create"
              ? "border-b-2 border-[#f59120] text-[#f59120]"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("create")}
        >
          User Login/Logout
        </button>
        <button
          className={`py-2 px-4 text-base font-medium ${
            activeTab === "history"
              ? "border-b-2 border-[#f59120] text-[#f59120]"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Ticket Load
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "create" ? <StaffLogin /> : <TicketLoad />}
    </div>
    </>
  );
}