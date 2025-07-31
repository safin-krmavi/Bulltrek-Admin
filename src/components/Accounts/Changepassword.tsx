import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
  const [activeTab, setActiveTab] = useState("Change Password");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setShowError(e.target.value.length < 8); // Example: show error if less than 8 chars
  };

  return (
    <div className="bg-[#f7f7fb] min-h-screen px-8 py-8">
      {/* Card */}
      <div className="bg-white rounded-xl shadow p-8 max-w-[600px] mx-auto">
        <div className="mb-6">
          <label className="block text-xs text-gray-500 mb-1">Old Password</label>
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              className="w-full border rounded px-3 py-2 pr-12"
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
            <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">Hide</span>
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-xs text-gray-500 mb-1">New Password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              className="w-full border rounded px-3 py-2 pr-12"
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
            <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">Hide</span>
          </div>
        </div>
        {showError && (
          <div className="text-xs text-red-500 mb-2 ml-1">
            Please add all necessary characters to create a safe password.
          </div>
        )}
        <div className="mb-6">
          <label className="block text-xs text-gray-500 mb-1">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full border rounded px-3 py-2 pr-12"
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
            <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">Hide</span>
          </div>
        </div>
        <button className="w-full bg-[#f59120] text-white py-3 rounded font-medium text-base">
          Change Password
        </button>
      </div>
    </div>
  );
}