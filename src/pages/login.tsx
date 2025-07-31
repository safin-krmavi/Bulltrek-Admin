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
import { PasswordInput } from "@/components/ui/password-input"
import { useAuth } from "@/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginInput, loginSchema } from "../schema"
import { toast } from "react-hot-toast"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const roles = [
  { label: "Admin", value: "admin" },
  // Add more roles if needed
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth()

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      role: roles[0].value,
    },
  })

  async function onSubmit(values: LoginInput) {
    try {
      // You can show the OTP modal after successful login, or for demo, after clicking login:
      // await login.mutateAsync({ ... });
      // toast.success("Login Successfull...");
      setOtpOpen(true); // Show OTP modal
    } catch (error: any) {
      if (error?.response?.status === 404 || error?.response?.data?.message?.toLowerCase().includes("not found")) {
        toast.error("Account does not exist. Please check your email or register.")
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Login failed. Please try again.")
      }
      console.error("Login error:", error)
    }
  }
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow single digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");
    // Auto-focus next input
    if (value && index < 3) {
      const next = document.getElementById(`otp-input-${index + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  // Handle OTP submit
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some(d => d === "")) {
      setOtpError("Please enter all 4 digits.");
      return;
    }
    // TODO: Verify OTP here
    setOtpOpen(false);
    // Proceed to dashboard or next step
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
            <FormField
              control={loginForm.control}
              name="role"
              render={({ field }) => (
                <FormItem>
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
                </FormItem>
              )}
            />
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
            {/* Password */}
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1 text-[15px] font-medium text-[#222]">Your password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#f59120]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-[#f59120] text-white text-[18px] py-3 rounded-md font-semibold mt-2 hover:bg-[#e07e0b] transition"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
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
            
          </button>
          <div className="mb-6 mt-2 text-[16px] text-[#222]">
            Please enter the 2 factor authentication code below<br />
            to verify it is you
          </div>
          <form onSubmit={handleOtpSubmit} className="flex flex-col items-center gap-4">
            <div className="flex gap-4 justify-center mb-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md text-2xl focus:outline-none focus:ring-2 focus:ring-[#7B1F2B]"
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            {otpError && <div className="text-red-500 text-sm mb-2">{otpError}</div>}
            <button
              type="submit"
              className="w-40 bg-[#601825] text-white py-2 rounded-md font-semibold text-lg hover:bg-[#4a131e] transition"
            >
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginPage