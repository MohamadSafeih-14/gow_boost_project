"use server";

import { revalidatePath } from "next/cache";
import Order from "../database/models/order.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import { getUserById } from "./user.actions";
import Booster from '../database/models/booster.model';
import Room from "../database/models/room.model"; 
import { redirect } from "next/navigation";
// CREATE
export async function createOrder(order: any) {
  try {
    await connectToDatabase();

    const newOrder = await Order.create(order);
    await User.findByIdAndUpdate(order.customer_id, {
      orderId: newOrder._id
    }) 
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// // READ
// export async function getUserById(userId: string) {
//   try {
//     await connectToDatabase();

//     const user = await User.findOne({ clerkId: userId });

//     if (!user) throw new Error("User not found");

//     return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // UPDATE
// export async function updateUser(clerkId: string, user: UpdateUserParams) {
//   try {
//     await connectToDatabase();

//     const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
//       new: true,
//     });

//     if (!updatedUser) throw new Error("User update failed");
    
//     return JSON.parse(JSON.stringify(updatedUser));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // DELETE
// export async function deleteUser(clerkId: string) {
//   try {
//     await connectToDatabase();

//     // Find user to delete
//     const userToDelete = await User.findOne({ clerkId });

//     if (!userToDelete) {
//       throw new Error("User not found");
//     }

//     // Delete user
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id);
//     revalidatePath("/");

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
//   } catch (error) {
//     handleError(error);
//   }
// }


export const handleClaimOrder = async (orderId: string) => {
  const user = await currentUser();
  const userfromdb = await Booster.findOne({clerkId: user?.id});
  const order = await Order.findById(orderId);
  
  const customer = await User.findById(order.customer_id);
  if (userfromdb.orderId === "" && userfromdb.orderId !== undefined && order.booster_id === '' && userfromdb.oldOrder !== orderId) {
    try {
      await Booster.findOneAndUpdate({clerkId: user?.id}, {
        orderId,
      })
      await Order.findByIdAndUpdate({_id: orderId}, {
        booster_id: userfromdb._doc._id,
        status: 'waiting'
      })
      const newRoom = await Room.create({
        customer_name: customer.username,
        customer_id: customer._id,
        booster_name: userfromdb.username,
        booster_id: userfromdb._id,
        orderId,
        messages: []
      })
      return {
        status: 200,
        message: "Order Has Been Claimed!"
      }
    } catch (error: any) {
     return {
      status: 400,
      message: "Couldn't Claim The Order"
     }
    }
  } else if (userfromdb.orderId !== '' && userfromdb.orderId !== undefined ) {
    return {
      status: 400,
      message: "You Already Have An Order"
    }
  } else if (order.booster_id !== '' && order.booster_id !== undefined) {
    return {
      status: 400,
      message: "This Order Is Taken!"
    }
  } else if (order.booster_id === '' && order.booster_id !== undefined && userfromdb.orderId === '' && userfromdb.oldOrder === orderId) {
    return {
      status: 400,
      message: "You Can't Claim This Order"
    }
  } else {
    return {
      status: 400,
      message: "Something Went Wrong!"
    }
  }
  
}