export default function Details() {
  return (
    <>
      {/* Personal Detail Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 p-6">
        <div className="font-semibold text-lg mb-2">Personal Detail</div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs text-gray-500">Name</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="AHKJSG" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Email ID</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="abhinavvw32156@gmail.com" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Contact Number</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="7043660000" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Alternate Number</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="7043660000" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Parent Number</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="7043660000" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Author number</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="7043660000" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Gender</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="Male" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Date Of Birth</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="06-04-1989" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Assign Role</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="Help Desk" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Date of Joining</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="12-10-2025" readOnly />
          </div>
        </div>
      </div>
      {/* Address Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 p-6">
        <div className="font-semibold text-lg mb-2">Address</div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-xs text-gray-500">Country</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="AHKJSG" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Address Line 1</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="AHKJSG" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Address Line 2</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="AHKJSG" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">City/Town</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="AHKJSG" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">State</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="AHKJSG" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Postal/Zip code</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="AHKJSG" readOnly />
          </div>
        </div>
      </div>
      {/* Account Detail Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="font-semibold text-lg mb-2">Account Detail</div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-xs text-gray-500">Bank Name</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="AHKJSG" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Account Holder Name</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="abhinavvw32156@gmail.com" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Account Number</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="7043660000" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">IFSC Code</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="7043660000" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Bank Branch Name</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="AHKJSG" readOnly />
          </div>
        </div>
      </div>
    </>
  );
}