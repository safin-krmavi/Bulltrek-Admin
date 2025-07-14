// import React from "react";

export default function Scanner() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f6f7f9] dark:bg-[#18181b] flex flex-col items-start justify-start py-8 px-8 text-[#222] dark:text-white">
      <div className="flex-start bg-white dark:bg-[#232326] rounded-xl shadow p-8 w-[700px] max-w-none">
        {/* Counters */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="border-2 border-[#4A0D0D] rounded-md px-6 py-3 flex items-center text-xl font-medium min-w-[170px] justify-center bg-white dark:bg-[#18181b] text-[#222] dark:text-white border-[#4A0D0D] dark:border-[#B23B16]">
            Scanner Left: <span className="text-[#B23B16] ml-2 font-bold text-2xl">2</span>
          </div>
          <div className="border-2 border-[#4A0D0D] rounded-md px-6 py-3 flex items-center text-xl font-medium min-w-[170px] justify-center bg-white dark:bg-[#18181b] text-[#222] dark:text-white border-[#4A0D0D] dark:border-[#B23B16]">
            SMS Left: <span className="text-[#B23B16] ml-2 font-bold text-2xl">5</span>
          </div>
        </div>
        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">API Name</label>
              <select className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-[#222] dark:text-white border-gray-300 dark:border-gray-700">
                <option>API Name</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Add Condition</label>
              <select className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-[#222] dark:text-white border-gray-300 dark:border-gray-700">
                <option>Lorem Ipsum</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Trigger</label>
              <select className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-[#222] dark:text-white border-gray-300 dark:border-gray-700">
                <option>Only Once</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Scanner Name</label>
              <input className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-[#222] dark:text-white border-gray-300 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-400" placeholder="Only Once" />
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Pair</label>
              <input className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-[#222] dark:text-white border-gray-300 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-400" placeholder="API Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Expiry</label>
              <select className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-[#18181b] text-[#222] dark:text-white border-gray-300 dark:border-gray-700">
                <option>On Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Send Notification On</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" className="accent-[#4A0D0D] dark:accent-[#B23B16]" /> Email
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" className="accent-[#4A0D0D] dark:accent-[#B23B16]" /> SMS
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" className="accent-[#4A0D0D] dark:accent-[#B23B16]" /> Web
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" className="accent-[#4A0D0D] dark:accent-[#B23B16]" /> App
                </label>
              </div>
            </div>
          </div>
          {/* Button (centered below both columns) */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button type="submit" className="bg-[#4A0D0D] text-white px-8 py-2 rounded shadow-lg hover:bg-[#2d0a0a] transition font-semibold dark:bg-[#4A0D0D] dark:hover:bg-[#2d0a0a]">
              Create Scanner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 