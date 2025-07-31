import StaffList from "@/components/Staff/StaffList";
import { Search, Bell } from "lucide-react";

export default function StaffDetailsPage() {

	return (
		<div className="w-full max-w-[1200px] mx-auto px-6 py-8 bg-[#fafbfc]">
		{/* Search Bar */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center w-full max-w-md bg-white border border-gray-200 rounded-lg px-4 py-2">
					<Search className="text-gray-400 mr-2" />
					<input
						type="text"
						placeholder="Search"
						className="flex-1 bg-transparent outline-none text-gray-700"
					/>
				</div>
				<button className="ml-4 p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100">
					<Bell className="text-gray-500" />
				</button>
			</div>
			{/* User List Table */}
			<StaffList />
			
		</div>
	);
}