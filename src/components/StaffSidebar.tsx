import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    icon: "📊",
    path: "/staffdashboard",
  },
  {
    label: "Ticket",
    icon: "🎫",
    path: "/staffTickets",
  },
    {
    label: "Live Chat",
    icon: "🎫",
    path: "/livechats",
  },
  {
    label: "Setting",
      icon: "⚙️",
      path: "/settings",  
    children: [
      { label: "Accounts", path: "/staffaccounts" },
      { label: "Profile", path: "/profile" },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleMenuClick = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <aside className="h-screen min-h-screen w-[240px] bg-white border-r border-[#E0E0E0] flex flex-col justify-between fixed left-0 top-0 z-40">
      <div>
        <div className="flex items-center justify-start h-20 border-b border-[#E0E0E0]">
          <img src="/logo.svg" alt="Bulltrek" className="h-8 px-4" />
        </div>
        <nav className="flex flex-col gap-1 mt-4 px-2">
          {menu.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className={`flex items-center w-full px-3 py-2 rounded-md font-medium text-left hover:bg-[#f59120]/10 transition ${
                    openMenus[item.label] ? "bg-[#f59120]/10" : ""
                  }`}
                  onClick={() => handleMenuClick(item.label)}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="ml-auto">
                    {openMenus[item.label] ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </span>
                </button>
                {openMenus[item.label] && (
                  <div className="ml-8 mt-2 flex flex-col gap-2">
                    {item.children.map((sub) => (
                      <button
                        key={sub.label}
                        className={`px-3 py-1.5 rounded-md text-sm text-left hover:bg-[#f59120]/10 transition ${
                          isActive(sub.path)
                            ? "bg-[#f59120] text-white font-semibold"
                            : "text-[#222]"
                        }`}
                        onClick={() => navigate(sub.path)}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.label}
                className={`flex items-center w-full px-3 py-2 rounded-md font-medium hover:bg-[#f59120]/10 transition ${
                  isActive(item.path)
                    ? "bg-[#f59120] text-white"
                    : "text-[#222]"
                }`}
                onClick={() => navigate(item.path)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            )
          )}
        </nav>
      </div>
      <div className="p-4">
        <div className="bg-gradient-to-br from-[#E8E1FF] to-[#F0ECFF] rounded-xl p-4 flex items-center gap-3 shadow-sm border border-[#E0D9FF]">
          <div className="relative">
            <img
              src="/avatar.svg"
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            {/* Fallback avatar with initials */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-semibold text-sm border-2 border-white shadow-md hidden">
              RK
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-[#1F2937] truncate">
              Rajesham Kondavali
            </div>
            <div className="text-xs text-[#6B7280] truncate">
              rajeshm.kondavali@gmail.com
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}