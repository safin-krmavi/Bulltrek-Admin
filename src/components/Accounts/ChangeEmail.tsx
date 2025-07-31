import { useState } from "react";

export default function ChangeEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-[#f7f7fb] min-h-screen px-8 py-8">
      <div className="bg-white rounded-xl shadow p-8 max-w-[600px] mx-auto">
        <div className="mb-6">
          <label className="block text-xs text-gray-500 mb-1">Enter New Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter New Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block text-xs text-gray-500 mb-1">Enter Verification Code</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Verification Code"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <button
              type="button"
              className="text-[#1a73e8] font-medium px-3"
              onClick={() => setSent(true)}
            >
              Send
            </button>
          </div>
        </div>
        <div className="mb-4 text-xs text-gray-700">
          We Will Send Verification code on your email id.
          <div>
            <a href="#" className="text-[#1a73e8] underline text-xs">Did not Receive Email?</a>
          </div>
        </div>
        <button
          className="w-full bg-[#f59120] text-white py-3 rounded font-medium text-base"
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
    </div>
  );
}