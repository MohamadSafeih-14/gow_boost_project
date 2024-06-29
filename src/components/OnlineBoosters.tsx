"use client";
import React from 'react'
import { usePathname } from 'next/navigation'
interface Props {}

const OnlineBoosters = () => {
    const pathname  = usePathname();
    // Check if the pathname includes "/dashboard/boosting"
    const isBoostingPage = pathname.includes('/dashboard');
    if (isBoostingPage) {
      return null; // Return null to hide the navbar
    }
  return  <div className={`fixed bottom-10 left-10 h-fit bg-[#2c7cc7] hover-blue-glow p-3 w-[160px] text-white flex-row justify-evenly items-center rounded-xl cursor-pointer z-[10] ${isBoostingPage ? 'hidden' : 'flex'}`}>
  <div className="relative flex items-center justify-center h-fit">
   <div className="relative">
     <div className="absolute inset-0 flex items-center justify-center">
       <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-scale-fade"></div>
     </div>
     <div className="relative w-3 h-3 bg-green-400 rounded-full"></div>
   </div>
 </div>
 <p className='ml-2'>11 boosters online</p>
</div>
}

export default OnlineBoosters