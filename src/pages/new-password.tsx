import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import apiClient from "@/api/apiClient"

const NewPasswordPage = () => {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error("Please enter the verification code", {
        description: "The code is required to proceed",
        duration: 5000,
      });
      return;
    }

    setLoading(true);
    try {
      // Verify the reset code
      await apiClient.post("/api/v1/verify-reset-code", { code });
      
      toast.success("Code Verified Successfully", {
        description: "You can now set your new password",
        duration: 5000,
      });
      
      // Redirect to recover password page with the verified code
      setTimeout(() => {
        navigate('/recover-password', { state: { verifiedCode: code } });
      }, 2000);
      
    } catch (error: any) {
      toast.error("Invalid Code", {
        description: error.response?.data?.message || "Please check your code and try again",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center h-full w-full">
      <h1 className="font-medium text-[32px] text-center pt-16">New Password</h1>
        <div className="flex flex-col items-center gap-20 p-16  w-full"> 
            <p className="text-center text-greyText font-medium text-[14px]">
              Please enter the verification code sent to your email address to reset your password.
            </p>
            <Input 
              placeholder="Enter code" 
              className="rounded-lg px-[28px] max-w-xl py-[24px] text-[16px] text-greyText"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button 
              className="max-w-xl w-full border-none text-[20px] shadow-none bg-secondary-50 text-white py-6"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Submit"}
            </Button>
        </div>
    </div>
  )
}

export default NewPasswordPage