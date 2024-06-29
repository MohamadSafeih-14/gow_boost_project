"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import Booster from "../database/models/booster.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils"; 

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}



// ADD BOOSTER 

export async function handleBoosterSubmit(name: string, email: string) {
    await connectToDatabase();
    const user: any = await User.findOne({ username: name, email });
    const findBooster: any = await Booster.findOne({username: name, email});
    if (!user && !findBooster) {
      return {
        message: 'user not found'
      }
    } else if(findBooster) {
      return {
        message: 'This Booster Is Already Exists!'
      }
    } else {
      await User.findOneAndDelete({username: name, email});
      const { _id, email: boosterEmail, username, clerkId } = user;
      const booster = {
        _id,
        clerkId: clerkId,
        email: boosterEmail,
        username,
        wallet: '$0',
        orderId: '',
      }
      const newBooster = await Booster.create(booster)
  
  
      return {status: 200, message: 'The Booster Has Been Added!'};
    }
}