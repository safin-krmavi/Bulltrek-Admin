import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Eye, MessageSquareReply, SlidersHorizontal } from "lucide-react";
import DetailsForm from "@/components/ui/DetailsForm";
import Chatdetails from "@/pages/StaffLogin/Chatdetails";

const ChatData = [
  {
    id: "01",
    userId: "#AHGA68",
    name: "Sanjay Singh",
    area: "Lorem",
    date: "03/02/2024",

    assign: "Pankaj",
  },
  {
    id: "02",
    userId: "#AHGA68",
    name: "Sanjay Singh",
    area: "Lorem",
    date: "03/02/2024",

    assign: "Pankaj",
  },
  {
    id: "03",
    userId: "#AHGA68",
    name: "Sanjay Singh",
    area: "Lorem",
    date: "03/02/2024",

    assign: "Pankaj",
  },
  {
    id: "04",
    userId: "#AHGA68",
    name: "Sanjay Singh",
    area: "Lorem",
    date: "03/02/2024",

    assign: "Pankaj",
  },
  {
    id: "05",
    userId: "#AHGA68",
    name: "Sanjay Singh",
    area: "Lorem",
    date: "03/02/2024",

    assign: "Pankaj",
  },
  {
    id: "06",
    userId: "#AHGA68",
    name: "Sanjay Singh",
    area: "Lorem",
    date: "03/02/2024",

    assign: "Pankaj",
  },
  {
    id: "07",
    userId: "#AHGA68",
    name: "Sanjay Singh",
    area: "Lorem",
    date: "03/02/2024",

    assign: "Pankaj",
  },
  {
    id: "08",
    userId: "#AHGA68",
    name: "Sanjay Singh",
    area: "Lorem",
    date: "03/02/2024",

    assign: "Pankaj",
  },
];

const assignPersons = [
  { value: "", label: "Select Name" },
  { value: "Pankaj", label: "Pankaj" },
  { value: "Sanjay", label: "Sanjay" },
  { value: "Ravi", label: "Ravi" },
];

export default function LiveChatDetailsTable({ onViewDetails }: { onViewDetails?: () => void }) {
  const [page, setPage] = useState(1);
  const pageCount = 10;
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [showDetails, setShowDetails] = useState(false); // State to control DetailsForm
  const [showChatDetails, setShowChatDetails] = useState(false); // State for Chatdetails

  // Handler to show DetailsForm
  // const handleViewDetails = () => {
  //   setShowDetails(true);
  // };

  // Handler to close DetailsForm (pass to DetailsForm if you want a back button)
  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  // Handler to show Chatdetails
  const handleShowChatDetails = () => {
    setShowChatDetails(true);
  };

  // Handler to close Chatdetails
  // const handleCloseChatDetails = () => {
  //   setShowChatDetails(false);
  // };

  if (showChatDetails) {
    return <Chatdetails />;
  }

  if (showDetails) {
    return <DetailsForm onBack={handleCloseDetails} />; // Pass onBack prop for back navigation
  }

  return (
    <Card className="p-6 border border-gray-200 bg-white w-full max-w-[1200px] mx-auto shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-gray-800">Live Chat History</div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-2 bg-[#f59120] text-white rounded font-medium text-sm hover:bg-[#e07d13] shadow">
            <SlidersHorizontal size={18} /> {/* Use the icon here */}
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
              <th className="py-2 px-2 font-medium">Cust. Name</th>
              <th className="py-2 px-2 font-medium">Cust. Email</th>
              <th className="py-2 px-2 font-medium">Date</th>
              <th className="py-2 px-2 font-medium">Assign</th>
              <th className="py-2 px-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {ChatData.map((row) => (
              <tr
                key={row.id}
                className="border-b last:border-b-0 hover:bg-[#f7f7fb]"
              >
                <td className="py-2 px-2">
                  <input type="checkbox" />
                </td>
                <td className="py-2 px-2">{row.id}</td>
                <td className="py-2 px-2 text-[#1a73e8] cursor-pointer hover:underline">
                  {row.userId}
                </td>
                <td className="py-2 px-2">{row.name}</td>
                <td className="py-2 px-2">{row.area}</td>
                <td className="py-2 px-2">{row.date}</td>
                <td className="py-2 px-2">{row.assign}</td>
                <td className="py-2 px-2 flex gap-2">
                  <button
                    className="text-[#1a73e8] hover:underline bg-white rounded p-1"
                    title="View"
                    onClick={onViewDetails}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="text-[#1a73e8] hover:underline bg-white rounded p-1"
                    title="Reply"
                    onClick={handleShowChatDetails}
                  >
                    <MessageSquareReply size={16} />
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
          className="px-2 py-1 rounded border border-gray-300 text-gray-500 disabled:opacity-50 bg-white"
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
      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[400px] max-w-full text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-700 text-xl"
              onClick={() => setShowAssignModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-lg font-medium mb-6">
              Please select Assign Person
            </div>
            <select
              className="w-full border rounded px-3 py-2 mb-8"
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
            >
              {assignPersons.map((person) => (
                <option key={person.value} value={person.value}>
                  {person.label}
                </option>
              ))}
            </select>
            <button
              className="bg-[#47171c] text-white px-10 py-2 rounded font-semibold text-lg shadow"
              onClick={() => setShowAssignModal(false)}
            >
              Assign
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}