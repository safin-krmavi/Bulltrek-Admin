import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

const areaData = [
  { name: "Oct", value: 180 },
  { name: "2024", value: 209 },
  { name: "Apr", value: 200 },
  { name: "Jul", value: 205 },
];

// const gaugeData = [
//   { label: "Sell", value: 7, color: "#E57373" },
//   { label: "Neutral", value: 12, color: "#222" },
//   { label: "Buy", value: 8, color: "#1976D2" },
// ];

// function Gauge() {
//   const total = gaugeData.reduce((sum, d) => sum + d.value, 0);
//   const angles = gaugeData.map((d) => (d.value / total) * 180);
//   let startAngle = -90;
//   const paths = gaugeData.map((d, i) => {
//     const endAngle = startAngle + angles[i];
//     const largeArc = angles[i] > 90 ? 1 : 0;
//     const r = 60;
//     const x1 = 75 + r * Math.cos((Math.PI * startAngle) / 180);
//     const y1 = 75 + r * Math.sin((Math.PI * startAngle) / 180);
//     const x2 = 75 + r * Math.cos((Math.PI * endAngle) / 180);
//     const y2 = 75 + r * Math.sin((Math.PI * endAngle) / 180);
//     const dPath = `M75,75 L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
//     startAngle = endAngle;
//     return <path key={d.label} d={dPath} fill={d.color} opacity={0.7} />;
//   });
//   const pointerAngle = -90 + (gaugeData[0].value + gaugeData[1].value / 2) / total * 180;
//   const pointerX = 75 + 50 * Math.cos((Math.PI * pointerAngle) / 180);
//   const pointerY = 75 + 50 * Math.sin((Math.PI * pointerAngle) / 180);
//   return (
//     <svg width={150} height={90} viewBox="0 0 150 90">
//       {paths}
//       <line x1={75} y1={75} x2={pointerX} y2={pointerY} stroke="#222" strokeWidth={4} />
//       <circle cx={75} cy={75} r={6} fill="#fff" stroke="#222" strokeWidth={2} />
//     </svg>
//   );
// }

export default function Trends() {
  const [activeTab, setActiveTab] = useState("1 Minute");
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f7f9] px-4">
      {/* Top Filter Bar */}
      <div className="w-full pt-8">
        <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 items-center justify-between w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto flex-1">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium mb-1">API Name</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>API Name</option>
              </select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium mb-1">Pair</label>
              <input className="w-full border rounded px-3 py-2 text-sm" placeholder="API Name" />
            </div>
          </div>
          <button className="bg-[#4A0D0D] text-white px-6 py-2 rounded shadow hover:bg-[#2d0a0a] transition font-semibold w-full md:w-auto">
            View Trends
          </button>
        </div>
      </div>
      {/* Main Content Grid */}
      <div className="flex-1 w-full mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* NVDA Card with Area Chart */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#4A0D0D] flex items-center justify-center text-white font-bold">NVDA</div>
                <div>
                  <div className="font-semibold text-[13px] text-[#4A0D0D] leading-tight">NVIDIA CORPORATION</div>
                </div>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-2xl font-bold text-[#222]">209.23</span>
                <span className="text-xs text-[#B23B16] font-bold">D</span>
                <span className="text-green-600 text-base font-semibold">+0.67% <span className="text-xs">(1.00)</span></span>
              </div>
              <div className="h-20 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4A0D0D" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#4A0D0D" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} padding={{ left: 10, right: 10 }} />
                    <YAxis hide domain={[180, 220]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#4A0D0D" fill="url(#colorArea)" strokeWidth={3} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              {/* <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Oct</span>
                <span>2024</span>
                <span>Apr</span>
                <span>Jul</span>
              </div> */}
            </div>
            {/* Technical Analysis Card */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="font-semibold text-[15px] text-[#222] mb-2">NVDA Technical Analysis</div>
              <div className="flex gap-2 mb-4 items-center">
                {['1 Minute', '5 Minutes', '15 Minutes'].map(tab => (
                  <button
                    key={tab}
                    className={`px-3 py-1 rounded font-medium text-xs transition-colors duration-150 ${activeTab === tab ? 'bg-[#FFE6EA] text-[#222]' : 'bg-transparent text-[#222] hover:bg-gray-100'}`}
                    style={activeTab === tab ? { boxShadow: '0 1px 4px #ffe6ea' } : {}}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <div className="flex items-center gap-1 cursor-pointer text-xs text-[#222] ml-2">
                  More <ChevronDown className="w-3 h-3" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                {/* Gauge with three colored arcs and centered label */}
                <div className="relative flex flex-col items-center justify-center" style={{height: 180}}>
                  <svg width={260} height={140} viewBox="0 0 260 140">
                    {/* Three colored arcs (true semicircle, split into thirds) */}
                    {/* Left arc: -90° to -30° */}
                    <path d="M30,130 A100,100 0 0,1 80,55" stroke="#FFE6EA" strokeWidth="24" fill="none" strokeLinecap="butt" />
                    {/* Middle arc: -30° to +30° */}
                    <path d="M80,55 A100,100 0 0,1 180,55" stroke="#C97A8D" strokeWidth="24" fill="none" strokeLinecap="butt" />
                    {/* Right arc: +30° to +90° */}
                    <path d="M180,55 A100,100 0 0,1 230,130" stroke="#4A0D0D" strokeWidth="24" fill="none" strokeLinecap="butt" />
                    {/* Needle as a filled triangle with rounded base */}
                    <g>
                      <ellipse cx="130" cy="130" rx="8" ry="8" fill="#222" />
                      <polygon points="130,50 122,130 138,130" fill="#222" />
                    </g>
                  </svg>
                  <div className="absolute left-0 right-0 top-[160px] text-center text-[28px] font-normal text-[#222] select-none">Neutral</div>
                </div>
                {/* Sell/Neutral/Buy row, spaced further below */}
                <div className="flex justify-between w-full mt-6 px-2">
                  <div className="flex flex-col items-center">
                    <span className="text-base text-[#222]">Sell</span>
                    <span className="text-base font-semibold text-[#E57373]">7</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-base text-[#222]">Neutral</span>
                    <span className="text-base font-semibold text-[#888]">12</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-base text-[#222]">Buy</span>
                    <span className="text-base font-semibold text-[#1976D2]">8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Center Column */}
          <div className="flex flex-col gap-6">
            {/* NVDA Stats Card */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#4A0D0D] flex items-center justify-center text-white font-bold">NVDA</div>
                <div>
                  <div className="font-semibold text-[13px] text-[#4A0D0D] leading-tight">NVIDIA CORPORATION</div>
                </div>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-2xl font-bold text-[#222]">209.23</span>
                <span className="text-xs text-[#B23B16] font-bold">D</span>
                <span className="text-green-600 text-base font-semibold">+0.67% <span className="text-xs">(1.00)</span></span>
              </div>
              <div className="text-xs text-gray-500 mb-2">Market Closed (Oct 25, 01:37 UTC+5:30)</div>
              <div className="flex gap-6 text-xs text-gray-700">
                <div>
                  <div>October 24</div>
                  <div>6.60</div>
                </div>
                <div>
                  <div>3.83T</div>
                  <div>0.45%</div>
                </div>
                <div>
                  <div>33.63</div>
                </div>
              </div>
            </div>
            {/* NVDA Financials Card */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="font-semibold text-[15px] text-[#4A0D0D] mb-2">NVDA Financials</div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="font-semibold">Valuation</div>
                  <div>Market capital.: 3.83T</div>
                  <div>Market capital.: 3.83T</div>
                  <div>Market capital.: 3.83T</div>
                  <div>Enterprise Val.: 3.83T</div>
                  <div>Enterprise Val.: 3.83T</div>
                </div>
                <div>
                  <div className="font-semibold">Valuation</div>
                  <div>Market capital.: 3.83T</div>
                  <div>Market capital.: 3.83T</div>
                  <div>Market capital.: 3.83T</div>
                  <div>Enterprise Val.: 3.83T</div>
                  <div>Enterprise Val.: 3.83T</div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* NVDA Profile Card */}
            <div className="bg-white rounded-xl shadow p-4 h-full min-h-[320px]">
              <div className="font-semibold text-[15px] text-[#4A0D0D] mb-2">NVDA Profile</div>
              <div className="text-xs mb-1"><span className="font-semibold">Sector:</span> Electronic Technology</div>
              <div className="text-xs mb-1"><span className="font-semibold">Industry:</span> LoremIpsum Equipment</div>
              <div className="text-xs mb-1"><span className="font-semibold">Employees (FY):</span> 122K</div>
              <div className="text-xs text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consecte tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 