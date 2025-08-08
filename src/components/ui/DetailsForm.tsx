import { ChevronLeft } from "lucide-react";

export default function DetailsForm({ onBack }: { onBack?: () => void }) {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          className="mr-3 text-gray-600 hover:text-orange-500"
          onClick={onBack}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-lg font-medium text-gray-800">Ticket List</span>
      </div>
      
      {/* Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl">
        {/* User Details */}
        <div className="mb-8">
          <div className="text-sm font-semibold mb-4 text-gray-800">User Details</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">User ID</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-orange-500">
                <option>ANDKGJG</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Customer Name</label>
              <input 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none" 
                value="Abhineh kumar" 
                readOnly 
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Contact Number</label>
              <input 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none" 
                value="7045302008" 
                readOnly 
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Email ID</label>
              <input 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none" 
                value="abhinwww32156@gmail.com" 
                readOnly 
              />
            </div>
          </div>
        </div>
        
        {/* Complaint Details */}
        <div className="mb-8">
          <div className="text-sm font-semibold mb-4 text-gray-800">Complaint Details</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Area</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-orange-500">
                <option>Payment Fail</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Trade ID</label>
              <input 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none" 
                value="AIG250345" 
                readOnly 
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Broker</label>
              <input 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none" 
                value="Dhian" 
                readOnly 
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Assign</label>
              <input 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none" 
                value="Parakj" 
                readOnly 
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Time</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-orange-500">
                <option>11:30 AM</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Complaint Date</label>
              <input 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none" 
                value="15-03-2023" 
                readOnly 
              />
            </div>
          </div>
          
          {/* Full width textarea fields */}
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Complete Note</label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none resize-none"
                rows={4}
                value="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Staff Notes</label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none resize-none"
                rows={4}
                value="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
                readOnly
              />
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded text-sm font-medium transition-colors">
            Reply
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded text-sm font-medium transition-colors">
            Reply/Close
          </button>
        </div>
      </div>
    </div>
  );
}