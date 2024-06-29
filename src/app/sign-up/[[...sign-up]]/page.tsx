import React from 'react'
import { SignUp } from "@clerk/nextjs";
interface Props {}

const page = () => {
    return (
        <div className='h-fit bg-[#020512] w-full pt-[200px] pb-[100px] sign-up'>
            <div className='w-fit h-fit mx-auto'>
                <SignUp/>
            </div>
        </div>
        )
}

export default page