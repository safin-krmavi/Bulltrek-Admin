import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const notificationPurposes = ["New Plans", "Updates", "Reminders"];
const userIds = ["All", "User 01", "User 02"];
const intervals = ["Every Wednesday", "Daily"];

const notificationRows = [
  {
    id: "01",
    startDate: "01-09-2025",
    endDate: "22-09-2025",
    time: "10:30 AM",
    interval: "Every Wednesday",
  },
  {
    id: "02",
    startDate: "23-09-2025",
    endDate: "30-09-2025",
    time: "12:00 PM",
    interval: "Daily",
  },
];

export default function SendNotification() {
  const [selectedUserId, setSelectedUserId] = useState(userIds[0]);
  const [selectedPurpose, setSelectedPurpose] = useState(notificationPurposes[0]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const options = [
    { label: "Email", value: "email" },
    { label: "SMS", value: "sms" },
    { label: "Web Notification", value: "web" },
    { label: "Mobile Notification", value: "mobile" },
  ];

  const handleOptionChange = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="bg-[#f7f7fb] min-h-screen px-8 py-8">
      {/* Card */}
      <div className="bg-white rounded-xl shadow p-8 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">User ID</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedUserId}
              onChange={e => setSelectedUserId(e.target.value)}
            >
              {userIds.map(id => (
                <option key={id}>{id}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Notification Purpose</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedPurpose}
              onChange={e => setSelectedPurpose(e.target.value)}
            >
              {notificationPurposes.map(purpose => (
                <option key={purpose}>{purpose}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Options */}
        <div className="flex gap-4 mb-6">
          {options.map(opt => (
            <label
              key={opt.value}
              className={`flex items-center gap-2 px-4 py-2 rounded border cursor-pointer ${
                selectedOptions.includes(opt.value)
                  ? "bg-[#f59120] text-white border-[#f59120]"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(opt.value)}
                onChange={() => handleOptionChange(opt.value)}
                className="accent-[#f59120]"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {/* Table */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-700 border-b bg-[#f7f7fb]">
                <th className="py-2 px-2 font-medium"><input type="checkbox" /></th>
                <th className="py-2 px-2 font-medium">No.</th>
                <th className="py-2 px-2 font-medium">Start Date</th>
                <th className="py-2 px-2 font-medium">End Date</th>
                <th className="py-2 px-2 font-medium">Time</th>
                <th className="py-2 px-2 font-medium">Intervals</th>
                <th className="py-2 px-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {notificationRows.map(row => (
                <tr key={row.id} className="border-b last:border-b-0 hover:bg-[#f7f7fb]">
                  <td className="py-2 px-2"><input type="checkbox" /></td>
                  <td className="py-2 px-2">{row.id}</td>
                  <td className="py-2 px-2">{row.startDate}</td>
                  <td className="py-2 px-2">{row.endDate}</td>
                  <td className="py-2 px-2">{row.time}</td>
                  <td className="py-2 px-2">{row.interval}</td>
                  <td className="py-2 px-2">
                    <button className="text-red-600 hover:text-red-400 bg-white rounded-xl p-1" title="Delete">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Message Content */}
        <div className="mb-6">
          <label className="block text-xs text-gray-500 mb-1">Massage Content</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder="Name"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="bg-[#f59120] text-white px-6 py-2 rounded font-medium">
            Save
          </button>
          <button className="bg-[#f59120] text-white px-6 py-2 rounded font-medium">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}