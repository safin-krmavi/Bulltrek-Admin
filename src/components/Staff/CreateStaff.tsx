// import { useState } from "react";

export default function CreateUser() {
  // const [kyc, setKyc] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-[1200px] mx-auto flex flex-col justify-center">
      <div className="font-semibold text-lg mb-6">Personal Detail</div>
      <form>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              placeholder="abhinavvw32156@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="7043000000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              placeholder="2025-05-20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              placeholder="************"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder="Add you Note"
          />
        </div>
      </form>
       <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="bg-[#f59120] text-white px-6 py-2 rounded font-medium"
          >
            Create User
          </button>
          <button
            type="button"
            className="bg-[#f59120] text-white px-6 py-2 rounded font-medium"
          >
            Send Invite Mail
          </button>
          <button
            type="button"
            className="bg-[#f59120] text-white px-6 py-2 rounded font-medium"
          >
            Resend Invite Mail
          </button>
        </div>
    </div>
  );
}