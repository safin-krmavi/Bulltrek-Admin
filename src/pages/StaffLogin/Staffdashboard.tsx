import { Bell, LogOut, Search } from "lucide-react";

// Ticket and Chat stats as in the reference image
const ticketStats = [
	{ label: "Total Tickets", value: "156", change: "+15.03%" },
	{ label: "Active Tickets", value: "2,318", change: "+6.08%" },
	{ label: "Pending Tickets", value: "7,265", change: "+11.01%" },
	{ label: "Closed Tickets", value: "156", change: "+15.03%" },
	{ label: "Avg time to solve / Ticket", value: "2,318", change: "+6.08%" },
];

const chatStats = [
	{ label: "Total Chat", value: "156", change: "+15.03%" },
	{ label: "Active Chat", value: "2,318", change: "+6.08%" },
	{ label: "Pending Chat", value: "7,265", change: "+11.01%" },
	{ label: "Closed Chat", value: "156", change: "+15.03%" },
	{ label: "Avg time to solve / Chat", value: "2,318", change: "+6.08%" },
];

export default function Staffdashboard() {
	return (
		<div className="min-h-screen bg-[#f7f7fb] px-0 py-0">
			{/* Top Bar */}
			<div className="flex items-center justify-between px-10 py-8">
				<div className="flex items-center w-full max-w-md bg-white border border-gray-200 rounded-lg px-4 py-2">
					<Search className="text-gray-400 mr-2" />
					<input
						type="text"
						placeholder="Search"
						className="flex-1 bg-transparent outline-none text-gray-700"
					/>
				</div>
				<div className="flex items-center gap-4">
					<button className="relative p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100">
						<Bell className="w-5 h-5 text-gray-500" />
						<span className="absolute top-1 right-1 w-2 h-2 bg-[#f59120] rounded-full" />
					</button>
					<button className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100">
						<LogOut className="w-5 h-5 text-gray-500" />
					</button>
				</div>
			</div>
			{/* Ticket Dashboard */}
			<div className="px-10">
				<h2 className="text-lg font-semibold mb-4">Ticket Dashboard</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
					{ticketStats.slice(0, 3).map((stat, idx) => (
						<div
							key={idx}
							className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 min-w-[320px]"
						>
							<div className="text-sm text-gray-500">{stat.label}</div>
							<div className="text-2xl font-bold text-[#222]">
								{stat.value}
							</div>
							<div className="text-xs text-green-600 font-semibold">
								{stat.change}{" "}
								<span className="ml-1">↗</span>
							</div>
						</div>
					))}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-10">
					{ticketStats.slice(3).map((stat, idx) => (
						<div
							key={idx}
							className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 min-w-[320px]"
						>
							<div className="text-sm text-gray-500">{stat.label}</div>
							<div className="text-2xl font-bold text-[#222]">
								{stat.value}
							</div>
							<div className="text-xs text-green-600 font-semibold">
								{stat.change}{" "}
								<span className="ml-1">↗</span>
							</div>
						</div>
					))}
				</div>
				{/* Live Chat */}
				<h2 className="text-lg font-semibold mb-4">Live Chat</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
					{chatStats.slice(0, 3).map((stat, idx) => (
						<div
							key={idx}
							className="bg-white rounded-xl shadow p-8 flex flex-col gap-2 min-w-[320px]"
						>
							<div className="text-sm text-gray-500">{stat.label}</div>
							<div className="text-2xl font-bold text-[#222]">
								{stat.value}
							</div>
							<div className="text-xs text-green-600 font-semibold">
								{stat.change}{" "}
								<span className="ml-1">↗</span>
							</div>
						</div>
					))}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
					{chatStats.slice(3).map((stat, idx) => (
						<div
							key={idx}
							className="bg-white rounded-xl shadow p-8 flex flex-col gap-2 min-w-[320px]"
						>
							<div className="text-sm text-gray-500">{stat.label}</div>
							<div className="text-2xl font-bold text-[#222]">
								{stat.value}
							</div>
							<div className="text-xs text-green-600 font-semibold">
								{stat.change}{" "}
								<span className="ml-1">↗</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}