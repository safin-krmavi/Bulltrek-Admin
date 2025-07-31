import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !password2) {
      toast.error("Please fill in both password fields.");
      return;
    }
    if (password !== password2) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    // TODO: Add your API call here
    setTimeout(() => {
      setLoading(false);
      setSuccessOpen(true); // Show success modal
    }, 1200);
  };

  return (
    <>
      <div className="w-full max-w-[500px] rounded-xl p-10 flex flex-col items-center border border-[#E0E0E0] bg">
        <img src="/logo.svg" alt="Bulltrek" className="h-10 mb-4" />
        <h2 className="text-2xl font-semi-bold mb-2">Set a Password</h2>
        <p className="text-[15px] text-gray-600 mb-6 text-center">
          Your previous password has been reset.<br />
          Please set a new password for your account.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <label className="text-[15px] font-medium text-[#222] mb-1">Create a Password</label>
          <PasswordInput
            placeholder="Create a Password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#f59120]"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label className="text-[15px] font-medium text-[#222] mb-1">Re enter Password</label>
          <PasswordInput
            placeholder="Re enter Password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#f59120]"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#f59120] to-[#f59120] text-white text-[18px] py-3 rounded-md font-semibold mt-2 hover:bg-[#e07e0b] transition"
            disabled={loading}
          >
            {loading ? "Setting Password..." : "Set Password"}
          </Button>
        </form>
      </div>

      {/* Success Modal */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="max-w-[400px] bg-white text-center relative">
          <button
            className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600"
            onClick={() => setSuccessOpen(false)}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
          <div className="flex flex-col items-center justify-center py-6">
            <img
              src="/success-check.png"
              alt="Success"
              className="w-20 h-20 mx-auto mb-4"
              style={{ minWidth: 80, minHeight: 80 }}
            />
            <div className="text-lg font-medium text-[#222] mb-6">
              Your Password Succesfully Changed
            </div>
            <Button
              className="w-40 bg-[#601825] text-white py-2 rounded-md font-semibold text-lg hover:bg-[#4a131e] transition shadow"
              onClick={() => {
                setSuccessOpen(false);
                navigate("/login");
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResetPasswordPage;