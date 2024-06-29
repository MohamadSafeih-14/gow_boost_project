"use server"
import { currentUser } from "@clerk/nextjs";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose"
import { NextResponse } from "next/server";
import Order from "../database/models/order.model";
import Booster from "../database/models/booster.model";
import AdminsOrder from "../database/models/orders_for_admins.model";
import Report from "../database/models/report.model"; 


export const acceptMessage = async (id: any) => {
    const user =  await currentUser();
    try {
        await connectToDatabase();
        const acceptedMessage = await User.findByIdAndUpdate(id, {
            message: ""
        });
        return {message: "The System Message Marked As Read", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}


export const addOpenGGLink = async (openggLink: string) => {
    const user =  await currentUser();
    try {
        await connectToDatabase();
        const getUser = await User.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            openGG: openggLink,
            status: "pending"
        })
        return {message: "Your Account's Link Has Been Added Successfully", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}


export const changeBooster = async (reason: string, currentLpAndRank: string) => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await User.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            change_booster: 'waiting',
        })
        const order = await Order.findByIdAndUpdate(getUser.orderId, {
            status: "waiting for booster to confirm",
        });
        const newChangeBooster = await AdminsOrder.create({
            customer_id: order.customer_id,
            booster_id: order.booster_id,
            orderId: order._id,
            reason: reason,
            current_lp_rank_from_customer: currentLpAndRank,
            type: "change_booster",
        })
        return {message: "Your Request Has Been Successfully Sent!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}


export const pauseOrder = async () => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await User.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            status: 'paused',
        });
        const booster = await Booster.findByIdAndUpdate(newOrder.booster_id, {
            message: 'The Customer Has Paused The Order! Do Not Log Into Their Account Until They Resume.'
        });
        return {message: "Your Order Has Been Paused!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}


export const resumeOrder = async () => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await User.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            status: 'In Progress',
        });
        const booster = await Booster.findByIdAndUpdate(newOrder.booster_id, {
            message: 'The Customer Has Resumed The Order, You Can Continue The Process'
        });
        return {message: "Your Order Has Been Resumed!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}

export const confirmOrder = async () => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await User.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            status: 'done',
            complete: true,
            customer_id: "",
        });
        await User.findByIdAndUpdate(newOrder.customer_id, {
            orderId: '',
            message: 'Your Order Has Been Closed Successfully, Gg!'
        })
        await AdminsOrder.findOneAndUpdate({orderId: newOrder._id}, {
            type: 'completed_order',
        });
        return {message: "Success!", status: 200}
    } catch (error) {
        console.log(error)
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}

export const denieOrder = async (reason: string) => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await User.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            status: 'reviewing',
            denie_order: 'denied',
        });
        await User.findByIdAndUpdate(newOrder.customer_id, {
            message: 'Thank you! Your request has been received and will be reviewed by our team shortly.',
        })
        await AdminsOrder.findOneAndUpdate({orderId: newOrder._id}, {
            type: 'denied',
            reason: reason,
        });
        return {message: "Success!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}


export const sendReport = async (role: string, report: string) => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await User.findOne({clerkId: user?.id});
        const newReport = await Report.create({author_name: user?.username, author_id: getUser._id, author_clerkId: user?.id, role, report});
        return {message: "Your Report Has Been Sent Successfully!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}