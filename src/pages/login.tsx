import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// PasswordInput import removed to match backend OTP flow
import { useAuth } from "@/hooks/useAuth"
// removed zodResolver import to avoid blocking submit when password is not required
// import { zodResolver } from "@hookform/resolvers/zod"
import { useForm} from "react-hook-form"
import { LoginInput /*, loginSchema */ } from "../schema"
import { toast } from "react-hot-toast"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "@/api/auth";
import apiClient from "@/api/apiClient";

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Support / Live Staff", value: "staff" }
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // NOTE: removed resolver so submission will run even if schema expects password.
  // If you prefer validation, update loginSchema to not require password and re-enable resolver.
  const loginForm = useForm<LoginInput>({
    // resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      role: roles[0].value,
    },
  });

  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // support 6-digit OTP from your example
  const [otpError, setOtpError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // Track the role & email for OTP submit
  // const [pendingRole, setPendingRole] = useState<string>("admin");
  const [pendingEmail, setPendingEmail] = useState<string>("");

  // Handle OTP input change (single digit)
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");
    if (value && index < otp.length - 1) {
      const next = document.getElementById(`otp-input-${index + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  // Trigger send-otp when user submits login form
  async function onSubmit(values: LoginInput) {
    try {
      setSendingOtp(true);
      await sendOtp(values.email, "login");
      toast.success("OTP sent successfully. Check your email.");
      // setPendingRole(values.role);
      setPendingEmail(values.email);
      setOtp(["", "", "", "", "", ""]);
      setOtpOpen(true);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      toast.error(msg);
      console.error("Send OTP error:", error);
    } finally {
      setSendingOtp(false);
    }
  }

  // Handle OTP submit - verify via API
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => d === "")) {
      setOtpError("Please enter all digits.");
      return;
    }
    const code = otp.join("");
    try {
      setVerifyingOtp(true);
      const res = await verifyOtp(pendingEmail, code, "login");

      // Normalize result safely (support axios-like and direct payload shapes)
      let token: string | undefined;
      let user: any;
      let message: string | undefined;

      if (res && typeof res === "object" && "data" in res && res.data) {
        // axios-like response: res.data might be wrapper { status, message, data }
        const outer = (res as any).data;
        const payload = outer.data ?? outer; // unwrap if nested
        token = payload?.token;
        user = payload?.user;
        message = outer?.message ?? payload?.message;
      } else {
        // direct payload or helper-returned object
        const payload = (res as any).data ?? (res as any);
        token = payload?.token;
        user = payload?.user;
        message = (res as any).message ?? payload?.message;
      }

      if (token) {
        localStorage.setItem("auth_token", token);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const userType = (user?.user_type ?? user?.userType ?? "").toString().toLowerCase();

      toast.success(message ?? "Login successful");
      setOtpOpen(false);

      if (userType.includes("staff")) {
        navigate("/staffdashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "OTP verification failed.";
      setOtpError(msg);
      toast.error(msg);
      console.error("Verify OTP error:", error);
    } finally {
      setVerifyingOtp(false);
    }
  };

  return (
    <>
      <style>{`
        .login-card {
          width: 100%;
          max-width: 70%;
          border: 1px solid;
          border-color:#E0E0E0;
          background: #fff;
          border-radius: 12px;
          padding: 40px 32px 32px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (max-width: 500px) {
          .login-card { padding: 24px 8px; }
        }
      `}</style>
      <div className="login-card">
        <img src="/logo.svg" alt="Bulltrek" className="h-10 mb-4" />
        <h2 className="text-2xl font-semibold  mb-6">Log in</h2>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            {/* Role Dropdown */}
            {/* <Controller
              control={loginForm.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1 text-[15px] font-medium text-[#222]">Role</FormLabel>
                  <FormControl>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#f59120]"
                      {...field}
                    >
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* Email/Phone */}
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1 text-[15px] font-medium text-[#222]">Phone number, or email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#f59120]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password field removed — backend uses OTP flow so password is not required */}

            {/* Login Button - triggers send-otp */}
            <Button
              type="submit"
              className="w-full bg-[#f59120] text-white text-[18px] py-3 rounded-md font-semibold mt-2 hover:bg-[#e07e0b] transition"
              disabled={sendingOtp || login.isPending}
            >
              {sendingOtp ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending OTP...</span>
                </div>
              ) : (
                "Log in"
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Forgot Password */}
            <button
              type="button"
              className=" text-[14px] underline font-medium hover:text-[#f59120] transition"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot your password?
            </button>
          </form>
        </Form>
      </div>

      {/* OTP Modal */}
      <Dialog open={otpOpen} onOpenChange={setOtpOpen}>
        <DialogContent className="max-w-[500px] bg-white text-center">
          <button
            className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600"
            onClick={() => setOtpOpen(false)}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
          <div className="mb-6 mt-2 text-[16px] text-[#222]">
            Please enter the authentication code sent to your email
          </div>
          <form onSubmit={handleOtpSubmit} className="flex flex-col items-center gap-4">
            <div className="flex gap-2 justify-center mb-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  className="w-10 h-10 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-[#7B1F2B]"
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            {otpError && <div className="text-red-500 text-sm mb-2">{otpError}</div>}
            <button
              type="submit"
              className="w-40 bg-[#601825] text-white py-2 rounded-md font-semibold text-lg hover:bg-[#4a131e] transition"
              disabled={verifyingOtp}
            >
              {verifyingOtp ? "Verifying..." : "Submit"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}