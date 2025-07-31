import { useState } from "react";
import UserDetailsTable from "@/components/Staff/CreateStaff";
import Userhistory from "@/components/Users/Userhistory";

export default function StaffDetailsPage() {
  const [activeTab, setActiveTab] = useState("create");

  return (
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
          Create Staff
        </button>
        <button
          className={`py-2 px-4 text-base font-medium ${
            activeTab === "history"
              ? "border-b-2 border-[#f59120] text-[#f59120]"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "create" ? <UserDetailsTable /> : <Userhistory />}
    </div>
  );
}