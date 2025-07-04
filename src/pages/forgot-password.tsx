import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/api/apiClient";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await apiClient.post("/api/v1/forgot-password", { email });
      setMessage("If this email is registered, a password reset link has been sent.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset email. Please try again.");
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
        {message && <div className="text-green-600 text-center">{message}</div>}
        {error && <div className="text-red-600 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default ForgotPasswordPage; 