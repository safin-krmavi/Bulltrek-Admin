import { useState } from "react";
import { Search, Bell } from "lucide-react";
import StaffTicketDetailsTable from "@/components/StaffComponents/Tickets";
import DetailsForm from "@/components/ui/DetailsForm";

export default function TicketDetailsPage() {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="w-full max-w-[1200px] mx-auto px-6 py-8 bg-[#fafbfc]">
            {/* Search Bar - only show when not viewing details */}
            {!showDetails && (
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
            )}

            {/* Ticket List Table or Details Form */}
            {showDetails ? (
                <DetailsForm onBack={() => setShowDetails(false)} />
            ) : (
                <StaffTicketDetailsTable onViewDetails={() => setShowDetails(true)} />
            )}
        </div>
    );
}