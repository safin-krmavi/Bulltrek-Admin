import { Maximize2 } from "lucide-react";

const messages = [
  {
    id: 1,
    sender: "other",
    name: "Sanjay Singh",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Who was that philosopher you shared with me recently?",
    time: "2:14 PM",
    type: "text",
  },
  {
    id: 2,
    sender: "me",
    text: "Roland Barthes",
    time: "2:16 PM",
    type: "text",
  },
  {
    id: 3,
    sender: "other",
    name: "Sanjay Singh",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "That's him!\nWhat was his vision statement?",
    time: "2:18 PM",
    type: "text",
  },
  {
    id: 4,
    sender: "me",
    text: `“Ultimately in order to see a photograph well, it is best to look away or close your eyes.”`,
    time: "2:20 PM",
    type: "text",
  },
  {
    id: 5,
    sender: "other",
    name: "Sanjay Singh",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    type: "media",
    media: {
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=96&h=96",
      title: "Aerial photograph from the Helsinki urban environment division",
      link: "https://dribbble.com",
      linkText: "https://dribbble.com",
    },
    text: "Check this",
    time: "2:21 PM",
  },
];

export default function ChatConversation() {
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto min-h-[420px] relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-lg text-[#222]">Sanjay Singh</div>
        <button className="p-1 rounded hover:bg-gray-100">
          <Maximize2 className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      {/* Messages */}
      <div className="flex flex-col gap-4">
        {messages.map((msg) =>
          msg.sender === "me" ? (
            <div key={msg.id} className="flex flex-col items-end">
              <div className="bg-[#eaf3fb] text-[#222] rounded-xl px-4 py-2 max-w-[70%] text-[15px] shadow-sm">
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-400">{msg.time}</span>
                <svg width="18" height="18" className="text-[#1a73e8]" viewBox="0 0 24 24" fill="none">
                  <path d="M7 13l3 3 7-7" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ) : msg.type === "media" ? (
            <div key={msg.id} className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1">
                <img src={msg.avatar} alt={msg.name} className="w-8 h-8 rounded-full" />
                <div className="bg-[#f2f2f2] rounded-xl px-4 py-2 max-w-[70%] text-[15px] shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={msg.media?.image} alt="media" className="w-10 h-10 rounded object-cover" />
                    <div className="text-xs text-gray-700">{msg.media?.title}</div>
                  </div>
                  <div className="text-[#222]">{msg.text}</div>
                  <div>
                    <a href={msg.media?.link} target="_blank" rel="noopener noreferrer" className="text-[#1a73e8] text-sm underline">
                      {msg.media?.linkText}
                    </a>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400 ml-10">{msg.time}</span>
            </div>
          ) : (
            <div key={msg.id} className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1">
                <img src={msg.avatar} alt={msg.name} className="w-8 h-8 rounded-full" />
                <div className="bg-[#f2f2f2] text-[#222] rounded-xl px-4 py-2 max-w-[70%] text-[15px] shadow-sm whitespace-pre-line">
                  {msg.text}
                </div>
              </div>
              <span className="text-xs text-gray-400 ml-10">{msg.time}</span>
            </div>
          )
        )}
      </div>
    </div>
      );
}