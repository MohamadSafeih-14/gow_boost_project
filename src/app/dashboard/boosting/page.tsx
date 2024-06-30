import React from 'react'
import Boosting from '../../../components/dashboard/Boosting'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import Order from '../../../lib/database/models/order.model';
import User from '../../../lib/database/models/user.model';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '../../../lib/database/mongoose';
import Booster from '../../../lib/database/models/booster.model';
const page = async () => {
  const isUserLogged =  auth();
  if (!isUserLogged) {
    redirect('/sign-in');
  }
  try {
    await connectToDatabase()
  } catch (error) {
   console.log('failed to connect to the database!')
  }
  let order: any;
  let booster: any;
  const user = JSON.stringify(await currentUser());
  const userClerkId = await currentUser();
  try {
    const detectUser =  await User.findOne({clerkId: userClerkId?.id});
    if (!detectUser) {
      redirect('/')
    }
  } catch (error: any) {
    redirect('/')
  }
  const userfromDB = await User.findOne({clerkId: userClerkId?.id});
  const getUserOrderId = await User.findOne({clerkId: userClerkId?.id});
  if (!getUserOrderId.orderId) {
  } else {
    try {
      order = await Order.findById(getUserOrderId.orderId);
      booster = await Booster.findById(order.booster_id);
      if(booster) {

        booster = await clerkClient.users.getUser(booster.clerkId);
      }
    } catch (error) {
    }
  }
  return (
 <Boosting user={user} order={order ? JSON.stringify(order) : ''} booster={booster ? JSON.stringify(booster) : ''} userfromDB={userfromDB ? JSON.stringify(userfromDB) : ''}/>
  )
}

export default page
