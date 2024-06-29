import React from 'react'
import { SignIn } from "@clerk/nextjs";

interface Props {}

const page = () => {
  return (
    <div className='h-[100vh] bg-[#020512] w-full pt-[200px]'>
        <div className='w-fit h-fit mx-auto'>
            <SignIn/>
        </div>
    </div>
    )
}

export default page