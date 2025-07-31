export default function Chatdetails() {
  return (
    <div className="bg-[#f7f7fb] min-h-screen px-8 py-8">
      {/* Card: User Info */}
      <div className="bg-white rounded-xl shadow p-6 max-w-[900px] mx-auto mb-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs text-gray-500">User ID</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="AHGA68" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Customer Name</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="Sanjay sing" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Customer Email ID</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="self@r9544@gmail.com" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Assign</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="09:02 AM" readOnly />
          </div>
          <div>
            <label className="text-xs text-gray-500">Date</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value="20-05-2025" readOnly />
          </div>
        </div>
      </div>
      {/* Card: Chat History */}
      <div className="bg-white rounded-xl shadow p-6 max-w-[900px] mx-auto">
        <div className="font-semibold text-lg mb-4">Chat History</div>
        <div className="flex flex-col gap-6">
          {/* Message 1 */}
          <div className="flex items-start gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="bg-[#f7f7fb] rounded-xl px-4 py-2 text-gray-800 max-w-[320px]">
                Who was that philosopher you shared with me recently?
              </div>
              <span className="text-xs text-gray-400 mt-1 block">2:13 PM</span>
            </div>
          </div>
          {/* Message 2 */}
          <div className="flex items-start gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="bg-[#f7f7fb] rounded-xl px-4 py-2 text-gray-800 max-w-[320px]">
                That's him!
              </div>
              <span className="text-xs text-gray-400 mt-1 block">2:15 PM</span>
            </div>
          </div>
          {/* Message 3 */}
          <div className="flex items-start gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="bg-[#f7f7fb] rounded-xl px-4 py-2 text-gray-800 max-w-[320px]">
                What was his vision statement?
              </div>
              <span className="text-xs text-gray-400 mt-1 block">2:19 PM</span>
            </div>
          </div>
          {/* Message 4 (right side, user reply) */}
          <div className="flex flex-col items-end">
            <span className="text-xs text-[#1a73e8] mb-1">Roland Barthes</span>
            <div className="bg-[#eaf3ff] rounded-xl px-4 py-2 text-gray-800 max-w-[320px]">
              "Ultimately in order to see a photograph well, it is best to look away or close your eyes."
            </div>
            <span className="text-xs text-gray-400 mt-1 block">2:16 PM</span>
          </div>
          {/* Message 5 (right side, user reply with image) */}
          <div className="flex flex-col items-end">
            <img
              src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
              alt="chat"
              className="rounded-xl mb-2 max-w-[200px]"
            />
            <div className="bg-[#eaf3ff] rounded-xl px-4 py-2 text-gray-800 max-w-[320px]">
              Aerial photograph from the Himalayan environment division.
            </div>
            <span className="text-xs text-gray-400 mt-1 block">2:20 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}