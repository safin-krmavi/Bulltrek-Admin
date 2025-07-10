import React from 'react'
import { Logo } from "@/pages/login/logo";

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex flex-row h-screen w-screen'>
        <div className='w-2/6 h-full bg-secondary-50 p-20 transition-colors duration-300'>
            <Logo width={200} height={100} className='w-[200px] drop-shadow-lg' />
            <img src="/login.svg" alt="login logo" />
        </div>
        <div className='w-4/6 h-full bg-background text-foreground transition-colors duration-300'>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout