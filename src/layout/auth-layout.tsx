import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex flex-row h-screen w-screen'>
        <div className='w-2/6 h-full bg-secondary-50 dark:bg-[#18181b] p-20 transition-colors duration-300'>
            <img src="/logo.svg" alt="logo" className='aspect-square w-[180px]'/>
            <img src="/login.svg" alt="login logo" />
        </div>
        <div className='w-4/6 h-full bg-background text-foreground transition-colors duration-300'>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout