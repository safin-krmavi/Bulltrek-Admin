import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/api/apiClient";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  // Store token in localStorage on mount
  useEffect(() => {
    if (token) {
      localStorage.setItem("RESET_PASSWORD_TOKEN", token);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token) {
      toast.error("Invalid or missing reset link.");
      return;
    }
    if (!password || !passwordConfirmation) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await apiClient.post("/api/v1/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      toast.success("Password reset successfully!", {
        description: "You can now login with your new password.",
        duration: 5000,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      toast.error("Failed to reset password.", {
        description: err.response?.data?.message || "Please try again or request a new link.",
        duration: 5000,
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-8 items-center h-full w-full">
      <h1 className="font-medium text-[32px] text-center pt-16">Reset Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 p-8 w-full max-w-md">
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="rounded-lg px-[28px] py-[24px] text-[16px] text-greyText w-full"
          required
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          className="rounded-lg px-[28px] py-[24px] text-[16px] text-greyText w-full"
          required
        />
        <Button type="submit" className="w-full text-[20px] py-6" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage; 