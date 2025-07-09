import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/api/apiClient";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Sending reset link...", {
      description: "Please wait while we process your request.",
    });
  
    try {
      await apiClient.post("/api/v1/forgot-password", { email });
      toast.dismiss(loadingToast);
      toast.success("Reset link sent to your email!", {
        duration: 5000,
      });
      setEmail(""); // Clear input
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error("Failed to Send Reset Link", {
        description: err.response?.data?.message || "Failed to send reset email. Please try again.",
        duration: 6000,
      });
    }
  
    setLoading(false);
  };
  

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full w-full">
      <h1 className="font-medium text-[32px] text-center">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="w-[25rem] flex flex-col gap-6 items-center">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="rounded-lg px-[28px] py-[24px] text-[16px] text-greyText w-full"
        />
        <Button type="submit" className="w-full text-[20px] py-6" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage; 