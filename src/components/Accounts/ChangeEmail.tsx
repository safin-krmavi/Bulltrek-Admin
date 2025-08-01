import { useState } from "react";

export default function ChangeEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg min-h-screen px-8 py-8 shadow-lg flex flex-col">
        {/* Enter New Email */}
        <div className="mb-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-500">Enter New Email</label>
          </div>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Verification Code */}
        <div className="mb-4 w-full max-w-md">
          <label className="text-xs text-gray-500 mb-1 block">Enter Verification Code</label>
          <div className="relative">
            <input
              type="text"
              className="w-full border rounded px-3 py-2 pr-20" 
              placeholder="Enter Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1a73e8] font-medium text-xs bg-white"
              onClick={() => setSent(true)}
            >
              Send
            </button>
          </div>
        </div>

        {/* Info text */}
        <div className="mb-6 text-xs text-gray-700 w-full max-w-md">
          We will send a verification code to your email ID.
          <div>
            <a href="#" className="text-[#1a73e8] underline text-xs">Did not receive email?</a>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          className="w-full max-w-md bg-[#f59120] text-white py-3 rounded font-medium text-base"
          onClick={() => setShowModal(true)}
        >
          Confirm
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-[350px] max-w-full text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-700 text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex justify-center mb-4">
              <div className="bg-green-400 rounded-full w-16 h-16 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#34d399" />
                  <path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="mb-6 text-gray-800 font-medium">
              Your Email ID Successfully Changed
            </div>
            <button
              className="bg-[#5a2323] text-white px-6 py-2 rounded font-medium w-32 mx-auto"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
