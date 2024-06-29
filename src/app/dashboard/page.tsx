import React, { FC } from 'react'
import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import User from 'src/lib/database/models/user.model';
import Booster from 'src/lib/database/models/booster.model';
import { connectToDatabase } from 'src/lib/database/mongoose';
const page: FC = async () => {
  const isUserLogged =  auth();
  if (!isUserLogged) {
    redirect('/sign-in');
  }
    await connectToDatabase();
    const user = await currentUser();
    const customer = await User.findOne({clerkId: user?.id});
    const booster = await Booster.findOne({clerkId: user?.id});
  
    if(customer && !booster || booster === null) {
      redirect('/dashboard/boosting')
    } else if(booster && !customer || customer === null) {
      redirect('/dashboard/booster')
    } else {
      redirect('/')
    }

  return (
    <div className='w-full h-[100vh]'>
      <h1>You&#39;ll Be Directed</h1>
    </div>
  )
}

export default page
