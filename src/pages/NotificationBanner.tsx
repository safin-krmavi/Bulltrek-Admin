import { useState } from "react";
import Banner1 from "@/components/NotificationBanner/Banner1";
import Banner2 from "@/components/NotificationBanner/Banner2";
import History from "@/components/NotificationBanner/History";
import { Bell, Search } from "lucide-react";

const tabs = [
  "Banner1",
  "Banner2",
  "History",
];

export default function UserDetailsPage() {
  const [activeTab, setActiveTab] = useState("User Details");

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8 bg-grey-700">
        	{/* Search Bar */}
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
      {activeTab === "Banner1" ? (
        <Banner1 />
      ) : activeTab === "Banner2" ? (
        <Banner2 />
      ) : activeTab === "History" ? (
        <History />
      )  :(
        <Banner1 />
      )}
    </div>
  );
}