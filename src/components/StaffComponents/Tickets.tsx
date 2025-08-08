import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Eye, MessageSquareReply, SlidersHorizontal } from "lucide-react";
import DetailsForm from "@/components/ui/DetailsForm";

const ticketData = [
	{
		id: "01",
		userId: "#AHGA68",
		name: "Sanjay Singh",
		area: "Lorem",
		date: "03/02/2024",
		status: "Pending",
		assign: "Pankaj",
	},
	{
		id: "02",
		userId: "#AHGA68",
		name: "Sanjay Singh",
		area: "Lorem",
		date: "03/02/2024",
		status: "Pending",
		assign: "Pankaj",
	},
	{
		id: "03",
		userId: "#AHGA68",
		name: "Sanjay Singh",
		area: "Lorem",
		date: "03/02/2024",
		status: "Pending",
		assign: "Pankaj",
	},
	{
		id: "04",
		userId: "#AHGA68",
		name: "Sanjay Singh",
		area: "Lorem",
		date: "03/02/2024",
		status: "Pending",
		assign: "Pankaj",
	},
	{
		id: "05",
		userId: "#AHGA68",
		name: "Sanjay Singh",
		area: "Lorem",
		date: "03/02/2024",
		status: "Pending",
		assign: "Pankaj",
	},
	{
		id: "06",
		userId: "#AHGA68",
		name: "Sanjay Singh",
		area: "Lorem",
		date: "03/02/2024",
		status: "Pending",
		assign: "Pankaj",
	},
	{
		id: "07",
		userId: "#AHGA68",
		name: "Sanjay Singh",
		area: "Lorem",
		date: "03/02/2024",
		status: "Pending",
		assign: "Pankaj",
	},
	{
		id: "08",
		userId: "#AHGA68",
		name: "Sanjay Singh",
		area: "Lorem",
		date: "03/02/2024",
		status: "Pending",
		assign: "Pankaj",
	},
];

const assignPersons = [
	{ value: "", label: "Select Name" },
	{ value: "Pankaj", label: "Pankaj" },
	{ value: "Sanjay", label: "Sanjay" },
	{ value: "Ravi", label: "Ravi" },
];

export default function TicketDetailsTable({ onViewDetails }: { onViewDetails?: () => void }) {
	const [page, setPage] = useState(1);
	const pageCount = 10;
	const [showAssignModal, setShowAssignModal] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState("");
	const [showDetails, setShowDetails] = useState(false);
	const [showFilter, setShowFilter] = useState(false); // <-- Filter dropdown state

	// Filter dropdown state
	const [filter, setFilter] = useState({
		date: false,
		assign: false,
		status: false,
		area: true,
	});

	// Handler to show DetailsForm
	// const handleViewDetails = () => {
	// 	setShowDetails(true);
	// };

	// Handler to close DetailsForm
	const handleCloseDetails = () => {
		setShowDetails(false);
	};

	if (showDetails) {
		return <DetailsForm onBack={handleCloseDetails} />;
	}

	return (
		<Card className="p-6 border border-gray-200 bg-white w-full max-w-[1200px] mx-auto shadow-md relative">
			<div className="flex items-center justify-between mb-4">
				<div className="text-lg font-semibold text-gray-800">Ticket List</div>
				<div className="flex gap-2 relative">
					<button
						className="flex items-center gap-1 px-3 py-2 bg-[#f59120] text-white rounded font-medium text-sm hover:bg-[#e07d13] shadow"
						onClick={() => setShowFilter((prev) => !prev)}
					>
						<SlidersHorizontal size={18} />
					</button>
					{/* Filter Dropdown */}
					{showFilter && (
						<div className="absolute right-0 top-12 z-50 bg-white border border-gray-300 rounded-xl shadow-lg p-6 w-64 min-w-[220px]">
							<div className="flex items-center justify-between mb-4">
								<span className="font-medium text-[16px] text-[#222]">Date</span>
								<span className="text-[#47171c]">
									<svg width="20" height="20" fill="none" viewBox="0 0 24 24">
										<path d="M7 11H17M7 15H13M7 7H17" stroke="#47171c" strokeWidth="2" strokeLinecap="round" />
									</svg>
								</span>
							</div>
							<div className="flex items-center justify-between mb-4">
								<span className="font-medium text-[16px] text-[#222]">Assign</span>
								<input
									type="checkbox"
									checked={filter.assign}
									onChange={() => setFilter(f => ({ ...f, assign: !f.assign }))}
									className="w-5 h-5 accent-[#47171c]"
								/>
							</div>
							<div className="flex items-center justify-between mb-4">
								<span className="font-medium text-[16px] text-[#222]">Status</span>
								<input
									type="checkbox"
									checked={filter.status}
									onChange={() => setFilter(f => ({ ...f, status: !f.status }))}
									className="w-5 h-5 accent-[#47171c]"
								/>
							</div>
							<div className="flex items-center justify-between mb-6">
								<span className="font-medium text-[16px] text-[#222]">Area</span>
								<input
									type="checkbox"
									checked={filter.area}
									onChange={() => setFilter(f => ({ ...f, area: !f.area }))}
									className="w-5 h-5 accent-[#47171c]"
								/>
							</div>
							<button
								className="w-full bg-[#f59120] text-white py-2 rounded font-semibold text-base"
								onClick={() => setShowFilter(false)}
							>
								Apply
							</button>
						</div>
					)}
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
							<th className="py-2 px-2 font-medium">Area</th>
							<th className="py-2 px-2 font-medium">Date</th>
							<th className="py-2 px-2 font-medium">Status</th>
							<th className="py-2 px-2 font-medium">Assign</th>
							<th className="py-2 px-2 font-medium">Action</th>
						</tr>
					</thead>
					<tbody>
						{ticketData.map((row) => (
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
								<td className="py-2 px-2">
									<span className="text-[#f59120] font-medium">
										{row.status}
									</span>
								</td>
								<td className="py-2 px-2">{row.assign}</td>
								<td className="py-2 px-2 flex gap-2">
									<button
										className="text-[#1a73e8] hover:underline bg-white rounded p-1"
										title="View"
										onClick={onViewDetails}
									>
										<Eye size={16} />
									</button>
									<button className="text-[#1a73e8] hover:underline bg-white rounded p-1" title="Reply">
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