"use server";
import React from 'react'
import DashboardNavbar from 'src/components/dashboard/Admin/DashboardNavbar';
import { redirect } from 'next/navigation';
import { auth, currentUser} from '@clerk/nextjs/server';
import { connectToDatabase } from 'src/lib/database/mongoose';
import Admin from 'src/lib/database/models/admins.model';
interface Props {}

const DashboardLayout = async ({children}: {children: React.ReactNode;
}) => {
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
    <div className='min-h-[100vh] h-fit w-full bg-[#020512]'>
        <div className='w-full min-h-[100vh] h-full flex flex-row flex-nowrap'>
            <DashboardNavbar />
            <div className='w-[70%] h-full flex flex-col flex-nowrap'>
                {children}
            </div>
        </div>
    </div>
)
}

export default DashboardLayout