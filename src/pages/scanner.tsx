// import React from "react";

export default function Scanner() {
  return (
<div className="min-h-[calc(100vh-64px)] bg-[#f6f7f9] flex flex-col items-start justify-start py-8 px-8">
      <div className="flex-start bg-white rounded-xl shadow p-8 w-[700px] max-w-none">
        {/* Counters */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="border-2 border-[#4A0D0D] rounded-md px-6 py-3 flex items-center text-xl font-medium min-w-[170px] justify-center">
            Scanner Left: <span className="text-[#B23B16] ml-2 font-bold text-2xl">2</span>
          </div>
          <div className="border-2 border-[#4A0D0D] rounded-md px-6 py-3 flex items-center text-xl font-medium min-w-[170px] justify-center">
            SMS Left: <span className="text-[#B23B16] ml-2 font-bold text-2xl">5</span>
          </div>
        </div>
        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">API Name</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>API Name</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Add Condition</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>Lorem Ipsum</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Trigger</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>Only Once</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Scanner Name</label>
              <input className="w-full border rounded px-3 py-2 text-sm" placeholder="Only Once" />
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pair</label>
              <input className="w-full border rounded px-3 py-2 text-sm" placeholder="API Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expiry</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>On Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Send Notification On</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" className="accent-[#4A0D0D]" /> Email
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" className="accent-[#4A0D0D]" /> SMS
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" className="accent-[#4A0D0D]" /> Web
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" className="accent-[#4A0D0D]" /> App
                </label>
              </div>
            </div>
          </div>
          {/* Button (centered below both columns) */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button type="submit" className="bg-[#4A0D0D] text-white px-8 py-2 rounded shadow-lg hover:bg-[#2d0a0a] transition font-semibold">
              Create Scanner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 