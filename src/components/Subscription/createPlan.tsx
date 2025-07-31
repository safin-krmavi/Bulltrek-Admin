import { useState } from "react";

const membershipTypes = ["Advance", "Basic", "Premium"];
const multiBrokerOptions = ["Yes", "No"];
const paperTradeOptions = ["Yes (As per strategy Limits)", "No"];
const basketSectionOptions = ["Yes2", "No"];
const backTestOptions = ["250 Allowed", "100 Allowed"];
const marketPlaceOptions = ["Yes", "No"];
const smartAnalysisOptions = ["250 Allowed", "100 Allowed"];
const copyTradeOptions = ["Yes", "No"];
const alertsOptions = ["Email: Unlimited", "Email: 100", "SMS: 300"];
const addOnOptions = ["Allowed Buy", "Allowed Sell"];

export default function CreatePlan() {
  const [membership, setMembership] = useState(membershipTypes[0]);
  const [price, setPrice] = useState("1500");

  return (
    <div className="min-h-screen px-1 py-0">
      {/* Card */}
      <div className="bg-white rounded-xl shadow p-8 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Membership Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={membership}
              onChange={e => setMembership(e.target.value)}
            >
              {membershipTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Price</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-lg">User Details</div>
          <button className="bg-[#f59120] text-white rounded-full p-2">
            <span className="text-xl font-bold">+</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Strategy 1</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="15" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Strategy 2</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="15" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Strategy 3</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="15" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Strategy 4</label>
            <input className="w-full border rounded px-3 py-2" defaultValue="15" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Multi-Broker Connect</label>
            <select className="w-full border rounded px-3 py-2">
              {multiBrokerOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Paper Trade</label>
            <select className="w-full border rounded px-3 py-2">
              {paperTradeOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Basket Section</label>
            <select className="w-full border rounded px-3 py-2">
              {basketSectionOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Back Test</label>
            <select className="w-full border rounded px-3 py-2">
              {backTestOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Creator Market Place</label>
            <select className="w-full border rounded px-3 py-2">
              {marketPlaceOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Smart Analysis</label>
            <select className="w-full border rounded px-3 py-2">
              {smartAnalysisOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Copy Trade</label>
            <select className="w-full border rounded px-3 py-2">
              {copyTradeOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Copy Trade</label>
            <select className="w-full border rounded px-3 py-2">
              {copyTradeOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Alerts</label>
            <select className="w-full border rounded px-3 py-2">
              {alertsOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Add-on</label>
            <select className="w-full border rounded px-3 py-2">
              {addOnOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
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