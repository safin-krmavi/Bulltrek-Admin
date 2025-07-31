import React from 'react'
import homeRightImg from "@/assets/homeright.png";

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex min-h-screen w-screen bg-[#fafbfc] items-center justify-center">
      {/* Left: Image */}
      <div className="flex flex-col justify-center items-center w-[48%] min-h-screen bg-transparent">
        <img
          src={homeRightImg}
          alt="login visual"
          className="max-w-[640px] w-full h-auto object-contain"
          style={{ maxHeight: 490 }}
        />
      </div>
      {/* Right: Form */}
      <div className="flex flex-col justify-center items-center w-[52%] min-h-screen bg-transparent px-4"> 
          {children}

      </div>
      <style>{`
        @media (max-width: 900px) {
          .login-image-col { display: none; }
          .login-form-col { width: 100% !important; }
        }
        @media (max-width: 700px) {
          .login-image-col { display: none !important; }
          .login-form-col { width: 100% !important; }
        }
      `}</style>
    </div>
  )
}

export default AuthLayout