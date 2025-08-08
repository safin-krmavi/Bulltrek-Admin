import StaffSidebar from "@/components/StaffSidebar";
// import Footer from '@/components/footer'
// import Header from '@/components/header'
import { ReactNode } from 'react'

const GenericLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      <StaffSidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default GenericLayout