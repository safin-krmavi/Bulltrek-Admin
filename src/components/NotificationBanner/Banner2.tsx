import { useState } from "react";

export default function Banner2() {
  const [textMessage, setTextMessage] = useState("10");
  const [buttonName, setButtonName] = useState("1000");
  const [buttonUrl, setButtonUrl] = useState("https://");
  const [countdown, setCountdown] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call save API
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    // reset or cancel edits
    setTextMessage("10");
    setButtonName("1000");
    setButtonUrl("https://");
    setCountdown("");
    setIsEditing(false);
  };

  return (
    <div className="bg-[#f7f7fb] min-h-[360px] rounded-lg">
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-[1100px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#222]">Banner 2</h3>
          <div className="text-sm text-gray-500">Configure banner with countdown</div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Message</label>
              <input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 rounded-md border ${
                  isEditing ? "border-gray-300" : "border-transparent bg-gray-50"
                } focus:outline-none focus:ring-2 focus:ring-[#f59120]`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Name</label>
              <input
                value={buttonName}
                onChange={(e) => setButtonName(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 rounded-md border ${
                  isEditing ? "border-gray-300" : "border-transparent bg-gray-50"
                } focus:outline-none focus:ring-2 focus:ring-[#f59120]`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Button URL Link</label>
            <input
              value={buttonUrl}
              onChange={(e) => setButtonUrl(e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-md border ${
                isEditing ? "border-gray-300" : "border-transparent bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-[#f59120]`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Countdown Timer</label>
            <input
              type="datetime-local"
              value={countdown}
              onChange={(e) => setCountdown(e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-md border ${
                isEditing ? "border-gray-300" : "border-transparent bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-[#f59120]`}
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="px-5 py-2 rounded-md bg-[#f59120] text-white font-medium text-sm hover:bg-[#e07d13]"
              >
                Edit
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-[#f59120] text-white font-medium text-sm hover:bg-[#e07d13]"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}