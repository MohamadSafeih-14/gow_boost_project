"use server";
import React, { FC } from 'react'
import { redirect } from 'next/navigation';
import { auth, currentUser} from '@clerk/nextjs';
import { connectToDatabase } from 'src/lib/database/mongoose';
import Admin from 'src/lib/database/models/admins.model';import Details from 'src/components/dashboard/Admin/Home/Details';
import Boosters from 'src/components/dashboard/Admin/Home/Boosters';
const page: FC = async () => {
  const isUserLogged =  auth();
  if (!isUserLogged) {
    redirect('/sign-in');
  }
  try {
    await connectToDatabase()
  } catch (error) {
   console.log('failed to connect to the database!')
  }
  const userClerkId = await currentUser();
  const detectUser =  await Admin.findOne({clerkId: userClerkId?.id});
  if (!detectUser) {
    redirect('/')
  }
  return (
         <div className='w-full pr-[10%] pt-[50px]'>
              <h1 className='text-white text-[80px] max-xl:text-center'>Dashboard</h1>
              <div className='w-full'>
                  <Details />
                  <h1 className='text-white text-4xl mb-4'>Boosters</h1>
                  <div className='bg-[#060A1B] design2 rounded-3xl py-[15px] px-[20px]'>
                      <Boosters />
                  </div>
              </div>

      </div>
  )
}

export default page
