import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    icon: "📊",
    path: "/dashboard",
  },
  {
    label: "Ticket Details",
    icon: "🎫",
    path: "/ticket-details",
  },
  {
    label: "Users",
    icon: "👤",
    children: [
      { label: "User List", path: "/user-List" },
      { label: "Create User", path: "/create-user" },
    ],
  },
  {
    label: "Staff",
    icon: "🧑‍💼",
    children: [
      { label: "Staff List", path: "/staff-list" },
      { label: "Create Staff", path: "/create-staff" },
    ],
  },
  {
    label: "Payment",
    icon: "💳",
    path: "/payment",
    children: [
      { label: "Finance Info", path: "/finance-info" },
      { label: "Affiliate", path: "/affiliate" },
      { label: "Coupon & Discount", path: "/coupon" },
    ],
  },
  {
    label: "Subscription",
    icon: "📦",
    path: "/subscriptions",
    children: [
      { label: "Subscription List", path: "/subscriptions" },
      { label: "Create Plan", path: "/create-plan" },
    ],
  },
  { label: "Push Notification", icon: "🔔", path: "/push-notification" },
  { label: "Logs", icon: "📄", path: "/logs" },
  { label: "Chat History", icon: "💬", path: "/chat-history" },
  {
    label: "Setting",
    icon: "⚙️",
    path: "/settings",
    children: [
      { label: "Accounts", path: "/account" },
      { label: "Delete Info", path: "/delete-info" },
      { label: "Notification", path: "/language" },
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
        <div className="bg-[#F5F5F5] rounded-lg p-3 flex items-center gap-2">
          <img
            src="/avatar.svg"
            alt="User"
            className="w-8 h-8 rounded-full border"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div>
            <div className="text-xs font-semibold">Rajkiran Kondaveeti</div>
            <div className="text-xs text-gray-500">rajkirankondaveeti@gmail.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}