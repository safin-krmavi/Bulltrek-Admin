import { useState } from "react";

export default function AddRemove2RFS() {
  const [kycActive, setKycActive] = useState(true);

  return (
    <>
      <div className="bg-white rounded min-h-screen shadow-lg px-8 py-8">
        <div className="mb-2">
          <label className="text-sm text-gray-700 block mb-2">Activate 2FA KYC</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={kycActive}
              onChange={() => setKycActive(!kycActive)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-400 transition-colors"></div>
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                kycActive ? "translate-x-5" : ""
              }`}
            ></div>
          </label>
        </div>
      </div>
    </>
  );
}
