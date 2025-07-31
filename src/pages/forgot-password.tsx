import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter the code sent to your email/phone.");
      return;
    }
    setLoading(true);
    // TODO: Add your verify code logic here
    setTimeout(() => {
      setLoading(false);
      toast.success("Code verified!");
      // Redirect or show next step
    }, 1200);
  };

  return (
    <div className="flex bg-[#fafbfc] items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-transparent px-4">
        <div className="w-full bg-white rounded-xl shadow-lg p-10 flex flex-col items-center border border-[#eee]">
          <img src="/logo.svg" alt="Bulltrek" className="h-10 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Verify Code</h2>
          <p className="text-[15px] text-gray-600 mb-6 text-center">
            An authentication code has been sent to your email/Phone Number.
          </p>
          <form onSubmit={handleVerify} className="w-full flex flex-col gap-4">
            <label className="text-[15px] font-medium text-[#222] mb-1">Enter Code</label>
            <Input
              placeholder=""
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#f59120]"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#f59120] to-[#f59120] text-white text-[18px] py-3 rounded-md font-semibold mt-2 hover:bg-[#e07e0b] transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;