'use server'
import React from 'react'
import { redirect } from 'next/navigation';
import { auth, currentUser, clerkClient} from '@clerk/nextjs/server';
import Order from 'src/lib/database/models/order.model';
import Booster from 'src/lib/database/models/booster.model';
import { connectToDatabase } from 'src/lib/database/mongoose';
import BoosterCmp from 'src/components/dashboard/Booster';
import User from 'src/lib/database/models/user.model';
import AdminsOrder from 'src/lib/database/models/orders_for_admins.model';
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
  const userClerkId = await currentUser();
  const detectUser =  await Booster.findOne({clerkId: userClerkId?.id});
  let booster: any;
  if (!detectUser) {
    redirect('/')
  }
  let order: any;
  let customer: any;
  let adminsOrder: any;
  const user = JSON.stringify(await currentUser());
  const getUserOrderId = await Booster.findOne({clerkId: userClerkId?.id});
  if (!getUserOrderId.orderId) {
    console.log("couldn't find user's order")
  } else {
      order = await Order.findById(getUserOrderId.orderId);
      customer = await User.findOne({orderId: order._id});
      customer = await clerkClient.users.getUser(customer.clerkId);
      adminsOrder = await AdminsOrder.findOne({orderId: order._id})
  }
  return (
      <BoosterCmp user={user || ''} order={JSON.stringify(order) || ''} customer={JSON.stringify(customer) || ''}  userfromDB={detectUser ? JSON.stringify(detectUser) : ''} adminsOrder={adminsOrder ? JSON.stringify(adminsOrder) : ''}/>
  )
}

export default page