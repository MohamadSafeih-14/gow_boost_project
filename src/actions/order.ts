"use server"
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { handleCheckout } from './checkoutStripe';
import { getUserById } from 'src/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { connectToDatabase } from 'src/lib/database/mongoose';
import User from 'src/lib/database/models/user.model';
import Booster from 'src/lib/database/models/booster.model';

export const createOrder = async (starting_rank: string, starting_division: number, ending_rank: string,ending_division: number,server: string,lp: string,boosting_type: string, price: number, userId: any) => {

}

export const handleSuccessPayment = async (starting_rank: string, starting_division: number, ending_rank: string,ending_division: number,server: string,lp: string,boosting_type: string, price: string) => { 
}


export const handlepayment = async (startRank: string, startDivision: number, endRank: string, endDivision: number, server: string, lpRange: string, boostType: string, spells: boolean, offlineVpn: boolean, priorityOrder: boolean, queueType: string,result: number) => {
  'use server'
    const userClerkId = await currentUser();
    if(!userClerkId) {
      return {message: "Please Sign In First", status: 400}
    }
    try {
        await connectToDatabase();
        const customer = await User.findOne({clerkId: userClerkId?.id});
        const booster = await Booster.findOne({clerkId: userClerkId?.id});
      if(customer) {  
        if(customer.orderId !== "" && customer.orderId) {
          return {message: "You Already Have An Order", status: 400}
        }
      } else if(booster && !customer) {
        return {message: "Create a new account to proceed!", status: 400}
      }
    } catch (error) {
        
    }
  const addons = {
    spells: spells.toString(),
    offlineVpn: offlineVpn.toString(),
    priorityOrder: priorityOrder.toString(),
    queueType,
  }
  const user = await currentUser();
  const userDB = await getUserById(user?.id!);
  const url = await handleCheckout(startRank, startDivision, endRank, endDivision, server, lpRange, boostType, addons, result, userDB?._id!);
  return redirect(url)
}
