import { ChevronLeft } from "lucide-react";

export default function Logdetails() {
  return (
    <div className="bg-[#f7f7fb] min-h-screen px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="mr-2 text-gray-700 hover:text-[#f59120]">
          <ChevronLeft size={22} />
        </button>
        <span className="text-lg font-medium text-gray-800">User Log Details</span>
      </div>
      {/* Card */}
      <div className="bg-white rounded-xl shadow p-8 max-w-[700px] mx-auto">
        <div className="text-lg font-semibold mb-6 text-gray-800">User Log Details</div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">User ID</label>
            <select className="w-full border rounded px-3 py-2">
              <option>#ANDKGJG</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Device</label>
            <input className="w-full border rounded px-3 py-2" value="Android" readOnly />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">IP Address</label>
            <input className="w-full border rounded px-3 py-2" value="198.165.1.2" readOnly />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Login Time/Date</label>
            <input className="w-full border rounded px-3 py-2" value="04-05-2025/09:45" readOnly />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Logout Time/ Date</label>
            <input className="w-full border rounded px-3 py-2" value="04-05-2025/02:30" readOnly />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Duration</label>
            <input className="w-full border rounded px-3 py-2" value="06 hr" readOnly />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Login Link</label>
            <select className="w-full border rounded px-3 py-2">
              <option>
                https://www.figma.com/design/pzxWIBb-PQ6PgCOBdKX0jx/Bull-Trek?node-id=467-5931&t=YcCWTDT5RtaIxDeva-0
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}