import { useState } from "react";
import {PencilSquareIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { FileText, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const History = [
  { id: "01", StaffId: "#AHGA68",Notification:"Update", Remindertype:"Email",NotificationDate:"10-05-2025" },
  { id: "02", StaffId: "#AHGA68",Notification:"New Plan",Remindertype:"SMS",NotificationDate:"10-05-2025" },
  { id: "03", StaffId: "#AHGA68",Notification:"New Plan", Remindertype:"SMS",NotificationDate:"10-05-2025" },
  { id: "04", StaffId: "#AHGA68",Notification:"News", Remindertype:"Email",NotificationDate:"10-05-2025" },
  { id: "05", StaffId: "#AHGA68",Notification:"New Plan",Remindertype:"Email",NotificationDate:"10-05-2025" },
  { id: "06", StaffId: "#AHGA68",Notification:"Update", Remindertype:"SMS",NotificationDate:"10-05-2025" },
  { id: "07", StaffId: "#AHGA68",Notification:"New Plan",Remindertype:"SMS",NotificationDate:"10-05-2025" },
  { id: "08", StaffId: "#AHGA68",Notification:"Offer", Remindertype:"Email",NotificationDate:"10-05-2025" },
  { id: "09", StaffId: "#AHGA68",Notification:"Update", Remindertype:"Email",NotificationDate:"10-05-2025" },
];

export default function UserList() {
  const [page, setPage] = useState(1);
  const pageCount = 10;
  // const [editUserId, setEditUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Find the user to edit
  // const userToEdit = History.find(u => u.id === editUserId);

  // if (editUserId && userToEdit) {
  //   // Show the details page for the selected user
  //   return <Details user={userToEdit} onBack={() => setEditUserId(null)} />;
  // }

  return (
    <>
      {/* Card/Table */}
      <div className="bg-white rounded-xl shadow p-3 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-gray-800">Staff List</div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-4 py-2 bg-[#f59120] text-white rounded-md font-medium text-sm hover:bg-[#e07d13] shadow">
              {/* PDF */}
              <FileText className="w-5 h-5" />
              PDF
            </button>
            <button className="flex items-center gap-1 px-4 py-2 bg-[#ffb347] text-white rounded-md font-medium text-sm hover:bg-[#e0a030] shadow">
              {/* Excel */}
              <Plus className="w-5 h-5" />
              Excel
            </button>
            {/* Filter */}
            <button className="flex items-center gap-1 px-3 py-2 bg-[#ffb347] text-white border border-gray-200 rounded-md font-medium text-sm hover:bg-[#e0a030] shadow">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-700 border-b bg-[#f7f7fb]">
                <th className="py-2 px-2 font-medium">
                  <input type="checkbox" />
                </th>
                <th className="py-2 px-2 font-medium">No.</th>
                <th className="py-2 px-2 font-medium">User ID</th>
                <th className="py-2 px-2 font-medium">Notification</th>
                <th className="py-2 px-2 font-medium">Reminder Type</th>
                <th className="py-2 px-2 font-medium ">Notification Date</th>
                <th className="py-2 px-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {History.map((row) => (
                <tr key={row.id} className="border-b last:border-b-0 hover:bg-[#f7f7fb]">
                  <td className="py-2 px-2">
                    <input type="checkbox" />
                  </td>
                  <td className="py-2 px-2">{row.id}</td>
                  <td className="py-2 px-2 text-[#1a73e8] cursor-pointer hover:underline">{row.StaffId}</td>
                  <td className="py-2 px-2">{row.Notification}</td>
                  <td className="py-2 px-2 text-gray-700">{row.Remindertype}</td>
                   <td className="py-2 px-2 text-gray-700">{row.NotificationDate}</td>
                  <td className="py-2 px-2 flex gap-2">
                    {/* Edit */}
                    <button
                      className="text-[#1a73e8] bg-white rounded-xl p-1"
                      title="Edit"
                      onClick={() => navigate("/staff-details")}
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    {/* Cancel */}
                    <button className="text-red-600 hover:text-red-600 bg-white rounded-xl p-1" title="Delete">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-end mt-4 gap-2">
          <button
            className="px-2 py-1 rounded-sm border border-gray-300 text-gray-500 disabled:opacity-50 bg-white"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </button>
          {[1, 2, "...", pageCount].map((p, i) =>
            typeof p === "number" ? (
              <button
                key={p}
                className={`px-2 py-1 rounded border ${
                  page === p
                    ? "bg-[#f59120] text-white border-[#f59120]"
                    : "border-gray-300 text-gray-700 bg-white"
                }`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ) : (
              <span key={i} className="px-2 py-1 text-gray-400">
                {p}
              </span>
            )
          )}
          <button
            className="px-2 py-1 rounded border border-gray-300 text-gray-500 disabled:opacity-50 bg-white"
            disabled={page === pageCount}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}