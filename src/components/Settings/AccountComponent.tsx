import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Sidebar from "../sidebar";

export default function AccountComponent() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [activeTab, setActiveTab] = useState("ChangePassword");

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setShowError(e.target.value.length < 8);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between fixed w-full z-50 top-0 h-16">
        <div className="text-xl font-semibold text-gray-800">Bulltrek</div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1.5 w-64"
          />
          <div className="text-yellow-400 cursor-pointer">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-white p-10 h-full w-full">
          {/* Tab Headers */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            {["ChangePassword", "ChangeEmail", "AddRemove2FA"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-base font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-[#f59120] text-[#f59120]"
                    : "text-gray-600 hover:text-[#f59120]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "ChangePassword"
                  ? "Change Password"
                  : tab === "ChangeEmail"
                  ? "Change Email"
                  : "Add/Remove 2FA"}
              </button>
            ))}
          </div>

          {/* Change Password */}
          {activeTab === "ChangePassword" && (
            <>
              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    className="w-full border rounded-lg px-4 py-2 pr-12"
                    placeholder="Old Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowOld((v) => !v)}
                    tabIndex={-1}
                  >
                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                    Hide
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    className="w-full border rounded-lg px-4 py-2 pr-12"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowNew((v) => !v)}
                    tabIndex={-1}
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                    Hide
                  </span>
                </div>
              </div>

              {showError && (
                <div className="text-sm text-red-500 mb-4 ml-1">
                  Please add all necessary characters to create a safe password.
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="w-full border rounded-lg px-4 py-2 pr-12"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowConfirm((v) => !v)}
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                    Hide
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#f59120] text-white py-3 rounded-lg font-medium text-base hover:bg-[#e07d13] transition-colors">
                Change Password
              </button>
            </>
          )}

          {/* Change Email */}
          {activeTab === "ChangeEmail" && (
            <>
              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">
                  Enter New Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Enter New Email"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">
                  Enter Verification Code
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Enter Verification Code"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Send
                  </button>
                </div>
                <p className="text-sm text-blue-500 mt-2">
                  We will send verification code to your email id. Did not receive
                  email?
                </p>
              </div>

              <button className="w-full bg-[#f59120] text-white py-3 rounded-lg font-medium text-base hover:bg-[#e07d13] transition-colors">
                Confirm
              </button>
            </>
          )}

          {/* Add/Remove 2FA */}
          {activeTab === "AddRemove2FA" && (
            <>
              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">
                  Add/Remove 2FA
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Add/Remove 2FA"
                />
              </div>

              <button className="w-full bg-[#f59120] text-white py-3 rounded-lg font-medium text-base hover:bg-[#e07d13] transition-colors">
                Confirm
              </button>
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 p-4 flex items-center gap-2 fixed bottom-0 w-full">
        <img
          src="/avatar.svg"
          alt="User"
          className="w-8 h-8 rounded-full border"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div>
          <div className="text-xs font-semibold">Rajkiran Kondaveeti</div>
          <div className="text-xs text-gray-500">
            rajkirankondaveeti@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}