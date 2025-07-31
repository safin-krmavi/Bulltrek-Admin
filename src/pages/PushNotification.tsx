import { useState } from "react";
import History from "@/components/PushNotification/History";
import SendNotification from "@/components/PushNotification/SendNotification";

const tabs = [
  "History",
  "Active Notification",
  "SendNotification"
];

export default function PushNotification() {
  const [activeTab, setActiveTab] = useState("User Details");

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8 bg-grey-700">
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-base font-medium ${
              activeTab === tab
                ? "border-b-2 border-[#f59120] text-[#f59120]"
                : "text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      {activeTab === "History" ? (
        <History />
      ) : activeTab === "SendNotification" ? (
        <SendNotification />
      ) : (
        <SendNotification />
      )}
    </div>
  );
}