import { CameraIcon } from "@heroicons/react/24/solid";

const documentFields = [
  { label: "Pan Card Image", count: 2 },
  { label: "Aadhaar card Images", count: 2 },
  { label: "Bank Passbook Images", count: 1 },
  { label: "Ouification Degree", count: 2 },
  { label: "10th & 12th Marksheet", count: 1 },
  { label: "Experience Certificate", count: 2 },
];

export default function Documents() {
  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-[1100px] mx-auto">

      {/* Document Upload Grid */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {documentFields.map((field) => (
          <div key={field.label}>
            <div className="mb-2 font-medium text-gray-700">{field.label}</div>
            <div className="flex gap-4">
              {Array.from({ length: field.count }).map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-700 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-400"
                >
                  <CameraIcon className="w-8 h-8 text-white" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}