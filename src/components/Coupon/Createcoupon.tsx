import { useState } from "react";

export default function Createcoupan() {
  const [activeTab, setActiveTab] = useState("Create Coupon");

  return (
    <div className="bg-[#f7f7fb] min-h-screen px-8 py-8">
      {/* Card */}
      <div className="bg-white rounded-xl shadow p-8 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Coupon Code</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="abhinwww3215@gmail.com" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Discount Amount</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="1000" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Discount Percentage</label>
            <input className="w-full border rounded px-3 py-2 bg-gray-100" defaultValue="10%" readOnly />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Start Date</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="20-05-2025" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Start Time</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="00:02 AM" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">End Date</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="20-05-2025" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">End time</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="00:05 PM" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-xs text-gray-500 mb-1">Notes</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            defaultValue="Jaffai dfjgo fpgfg pgekwl gkacjk ajlejelg 3agphitwj4gji"
          />
        </div>
        <div className="flex gap-4">
          <button className="bg-[#f59120] text-white px-6 py-2 rounded font-medium">
            Save
          </button>
          <button className="bg-[#f59120] text-white px-6 py-2 rounded font-medium">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}