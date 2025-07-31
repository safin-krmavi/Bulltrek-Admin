import StrategyStatusChart from "@/components/ui/StrategyStatusChart";
import TopProfitableUsers from "@/components/dashboard/TopProfitableUsers";
import { Card } from "@/components/ui/card";

// Dummy stats for the top row (replace with real data as needed)
const stats = [
  { label: "Strategies Created", value: "156" },
  { label: "Active Strategies", value: "2,318" },
  { label: "Total Strategies", value: "7,265" },
  { label: "Copytrade Strategies", value: "3,671" },
  { label: "Marketplace Strategies", value: "3,671" },
];

export default function StrategyDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="h-[110px] min-w-[180px] p-4 flex flex-col items-start border border-gray-200 rounded-lg bg-[#f7f7fb]"
          >
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Strategy Status Chart */}
      <StrategyStatusChart />

      {/* Top Profitable Users Table */}
      <TopProfitableUsers />
      <TopProfitableUsers />
    </div>
  );
}