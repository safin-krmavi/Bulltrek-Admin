import { useState } from "react";
import { Bell, Search } from "lucide-react";
import  ChangePassword  from "@/components/Accounts/Changepassword";
import  ChangeEmail  from "@/components/Accounts/ChangeEmail";
import  AddFundsSection  from "@/components/Accounts/AddRemove2RFS";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8">
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
        <button
          className={`py-2 px-4 text-base font-medium ${
            activeTab === "change"
              ? "border-b-2 border-[#f59120] text-[#f59120]"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("change")}
        >
          Change Password
        </button>
        <button
          className={`py-2 px-4 text-base font-medium ${
            activeTab === "Change Email"
              ? "border-b-2 border-[#f59120] text-[#f59120]"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Change Email")}
        >
          Change Email
        </button>
         <button
          className={`py-2 px-4 text-base font-medium ${
            activeTab === "Add/Remove2FA"
              ? "border-b-2 border-[#f59120] text-[#f59120]"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Add/Remove2FA")}
        >
          Add/Remove2FA
        </button>
      </div>

      {/* Tab Content */}
       {activeTab === "change" ? (
              <ChangePassword />
            ) : activeTab === "Change Email" ? (
              <ChangeEmail />
            ) : activeTab === "Add/Remove2FA"? (
              <AddFundsSection />
            ):(
            <ChangePassword />
            )}
    </div>
  );
}