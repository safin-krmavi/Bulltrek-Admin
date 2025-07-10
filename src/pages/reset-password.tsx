import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/api/apiClient";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  // Store token in localStorage on mount
  useEffect(() => {
    if (token) {
      localStorage.setItem("RESET_PASSWORD_TOKEN", token);
      toast.success("Your password reset link is valid. Please enter your new password below.", { duration: 5000 });
    } else {
      toast.error("The reset link is missing or invalid. Please request a new password reset.", { duration: 6000 });
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !token) {
      toast.error("The reset link is missing or invalid. Please request a new password reset.", { duration: 6000 });
      return;
    }
    
    if (!password || !passwordConfirmation) {
      toast.error("Please enter both password fields to continue.", { duration: 4000 });
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", { duration: 4000 });
      return;
    }
    
    if (password !== passwordConfirmation) {
      toast.error("Please make sure both passwords are identical.", { duration: 4000 });
      return;
    }

    setLoading(true);
    
    // Show loading toast
    const loadingToast = toast.loading("Resetting Password... Please wait.");
    
    try {
      const response = await apiClient.post("/api/v1/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Your password has been updated successfully. You can now login with your new password.", { duration: 8000 });
        
        // Clear stored token
        localStorage.removeItem("RESET_PASSWORD_TOKEN");
        
        // Redirect to login after 3 seconds
        setTimeout(() => navigate("/login"), 3000);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err: any) {
      console.error("Reset password error:", err);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Handle specific error cases
      if (err.response?.status === 400) {
        toast.error("The reset link may be expired or invalid. Please request a new password reset.", { duration: 6000 });
      } else if (err.response?.status === 401) {
        toast.error("Your reset link has expired. Please request a new password reset.", { duration: 6000 });
      } else if (err.response?.status === 422) {
        toast.error(err.response.data.message || "Please check your password requirements.", { duration: 5000 });
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message, { duration: 6000 });
      } else if (err.code === 'NETWORK_ERROR' || err.message?.includes('Network Error')) {
        toast.error("Please check your internet connection and try again.", { duration: 6000 });
      } else {
        toast.error("We're experiencing technical difficulties. Please try again in a few minutes.", { duration: 6000 });
      }
    } finally {
    setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white py-8 text-black">
      {/* Back to Login - fixed top left */}
      <Link
        to="/login"
        className="absolute left-6 top-6 flex items-center gap-2 text-greyText hover:text-secondary-50 text-[15px] font-medium transition-colors z-10"
        style={{ textDecoration: 'none' }}
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Login
      </Link>

      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10 animate-fadeIn text-black border border-border flex flex-col items-center">
        <h1 className="font-bold text-3xl md:text-4xl text-center mb-8 mt-2">Reset Password</h1>
        {/* Email Display */}
        {email && (
          <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-border w-full">
            <div className="flex items-center gap-2 text-greyText text-[15px]">
              <Mail className="w-4 h-4" />
              <span>Resetting password for: <strong>{email}</strong></span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          {/* New Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[15px] font-semibold text-black">New Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="rounded-lg px-[28px] py-[24px] text-[16px] text-greyText w-full border border-border focus:ring-2 focus:ring-secondary-50 focus:border-secondary-50 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-input hover:text-greyText transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {password.length > 0 && password.length < 6 && (
              <p className="text-[13px] text-red-500 mt-1">Password must be at least 6 characters</p>
            )}
          </div>
          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[15px] font-semibold text-black">Confirm New Password</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
                className="rounded-lg px-[28px] py-[24px] text-[16px] text-greyText w-full border border-border focus:ring-2 focus:ring-secondary-50 focus:border-secondary-50 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-input hover:text-greyText transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordConfirmation.length > 0 && password !== passwordConfirmation && (
              <p className="text-[13px] text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
          {/* Password Requirements */}
          <div className="bg-gray-50 rounded-lg p-4 border border-border w-full">
            <p className="text-[13px] font-semibold text-greyText mb-2">Password Requirements:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li className={`text-[13px] ${password.length >= 6 ? 'text-green-600' : 'text-greyText'}`}>At least 6 characters</li>
              <li className={`text-[13px] ${password === passwordConfirmation && password.length > 0 ? 'text-green-600' : 'text-greyText'}`}>Passwords match</li>
            </ul>
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full border-none text-[18px] shadow-none bg-secondary-50 text-white py-3 mt-1 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-100 font-semibold"
            disabled={loading || !password || !passwordConfirmation || password !== passwordConfirmation || password.length < 6}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Resetting Password...</span>
              </div>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>
      {/* Footer */}
      <div className="flex flex-col gap-2 items-center mt-6 text-black">
        <p className="text-greyText text-[13px]">Remember your password?</p>
        <Link to="/login" className="text-greyText text-[15px] underline hover:text-black transition-colors font-medium">
          Sign in here
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 