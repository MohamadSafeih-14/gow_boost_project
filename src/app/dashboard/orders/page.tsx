import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import User from 'src/lib/database/models/user.model';
import Order from 'src/lib/database/models/order.model';
import Orders from 'src/components/Orders';
import Booster from 'src/lib/database/models/booster.model';
import { connectToDatabase } from 'src/lib/database/mongoose';
import Link from 'next/link';
import arrowImage from '../../../../public/images/icons8-left-arrow-50.png'
import Image from 'next/image'
interface Props {}

const page = async () => {
    const isUserLogged =  auth();
    if (!isUserLogged) {
      return redirect('/sign-in')
    }
    const getUser2verify = await currentUser();
    await connectToDatabase()
    const verifyUser = await Booster.findOne({clerkId: getUser2verify?.id})
    if (!verifyUser) {
        redirect('/dashboard/boosting')
    }
    const orders = await Order.find({status: 'pending'});
  return <div className='w-full h-fit min-h-[100vh] pt-[150px]'>
    <div className='text-white bg-gray-900 rounded-xl px-5 py-2 absolute top-5 left-5 flex flex-row flex-nowrap'><Image src={arrowImage} height={25} width={50} alt='left-arrow'/><Link className='ml-3 mt-3.5 align-middle' href={'/dashboard/booster'}>Go Back To Dashboard</Link></div>
    <h1 className='text-white text-[70px] text-center'>Orders</h1>
    <Orders orders={orders}/>
  </div>
}

export default page