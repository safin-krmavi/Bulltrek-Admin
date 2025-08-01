import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setShowError(e.target.value.length < 8);
  };

  return (
    <>
      <div className="bg-white min-h-screen px-8 py-8 flex shadow-lg items-start rounded-lg">
        <div className="w-full max-w-md bg-white rounded-lg p-6">
          {/* Old Password */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-gray-500">Old Password</label>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <button
                  type="button"
                  className="text-gray-400"
                  onClick={() => setShowOld((v) => !v)}
                  tabIndex={-1}
                >
                  {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <span>{"Hide"}</span>
              </div>
            </div>
            <input
              type={showOld ? "text" : "password"}
              className="w-full border rounded px-3 py-2"
              placeholder="Old Password"
            />
          </div>

          {/* New Password */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-gray-500">New Password</label>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <button
                  type="button"
                  className="text-gray-400"
                  onClick={() => setShowNew((v) => !v)}
                  tabIndex={-1}
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <span>{"Hide"}</span>
              </div>
            </div>
            <input
              type={showNew ? "text" : "password"}
              className="w-full border rounded px-3 py-2"
              placeholder="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>

          {showError && (
            <div className="text-xs text-red-500 mb-2 ml-1">
              Please add all necessary characters to create a safe password.
            </div>
          )}

          {/* Confirm Password */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-gray-500">Confirm Password</label>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <button
                  type="button"
                  className="text-gray-400"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <span>{"Hide"}</span>
              </div>
            </div>
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full border rounded px-3 py-2"
              placeholder="Confirm Password"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-[#f59120] text-white py-3 rounded font-medium text-base">
            Change Password
          </button>
        </div>
      </div>
    </>
  );
}
