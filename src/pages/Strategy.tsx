import { useState } from "react";
import Strategy1 from "@/components/Strategies/Strategy1";
import Strategy2 from "@/components/Strategies/Strategy2";
import Strategy3 from "@/components/Strategies/Strategy3";
import Strategy4 from "@/components/Strategies/Strategy4";
import Strategy5 from "@/components/Strategies/Strategy5";
import Strategy6 from "@/components/Strategies/Strategy6";
import Strategy7 from "@/components/Strategies/Strategy7";
import Strategy8 from "@/components/Strategies/Strategy8";
import { Bell, Search } from "lucide-react";

const strategies = [
  "Strategy 1",
  "Strategy 2",
  "Strategy 3",
  "Strategy 4",
  "Strategy 5",
  "Strategy 6",
  "Strategy 7",
  "Strategy 8",
];

export default function UserDetailsPage() {
  const [activeTab, setActiveTab] = useState("Strategy 1");

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-5">
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
      <div className="flex gap-4 border-b mb-6">
        {strategies.map((tab) => (
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
      {activeTab === "Strategy 1" ? (
        <Strategy1 />
      ) : activeTab === "Strategy 2" ? (
        <Strategy2 />
      ) : activeTab === "Strategy 3" ? (
        <Strategy3 />
      ) : activeTab === "Strategy 4" ? (
        <Strategy4 />
      ) : activeTab === "Strategy 5" ? (
        <Strategy5 />
      ) : activeTab === "Strategy 6" ? (
        <Strategy6 />
      ) : activeTab === "Strategy 7" ? (
        <Strategy7 />
      ) : activeTab === "Strategy 8" ? (
        <Strategy8 />
      ) : (
        <Strategy1 />
      )}
    </div>
  );
}