import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

const documentFields = [
  { label: "Pan Card Image" },
  { label: "Aaddhar card Images" },
  { label: "Bank Passbook Image" },
  { label: "Qualification Degree" },
  { label: "10 & 12 Marksheet" },
  { label: "Experince Lateer" },
];

function FileUploadBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center mb-2 min-w-[270px]">
      <div
        className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-6 cursor-pointer hover:border-[#f59120] transition"
        onClick={() => inputRef.current?.click()}
      >
        <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
        <div className="text-gray-700 text-sm mb-1">
          {file ? file.name : "Click or drag file to this area to upload"}
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      <div className="w-full text-xs text-gray-600 bg-gray-200 rounded px-2 py-1 mt-2 mb-3 text-center">
        Formats accepted are .csv and .xlsx
      </div>
      <div className="flex w-full gap-2">
        <button
          className="flex-1 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
          onClick={() => setFile(null)}
          type="button"
        >
          Cancel
        </button>
        <button
          className="flex-1 py-2 rounded bg-[#f59120] text-white font-semibold hover:bg-[#e07d13] transition"
          type="button"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default function Documents() {
  return (
    <div className="bg-[#f7f7fb] min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          {documentFields.map((field) => (
            <div key={field.label}>
              <div className="mb-2 font-medium text-[#222]">{field.label}</div>
              <FileUploadBox/>
            </div>
          ))}
        </div>
        {/* Upload Documents Button */}
        <div className="mt-6">
          <button className=" px-2 py-3 rounded bg-[#f59120] text-white font-semibold hover:bg-[#e07d13] transition">
            Upload All Documents
          </button>
        </div>
      </div>
    </div>
  );
}