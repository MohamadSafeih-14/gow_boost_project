"use server"
import { currentUser } from "@clerk/nextjs/server";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose"
import { NextResponse } from "next/server";
import Order from "../database/models/order.model";
import Booster from "../database/models/booster.model";
import AdminsOrder from "../database/models/orders_for_admins.model";
import Report from '../database/models/report.model';
import Room from "../database/models/room.model";
export const acceptBoosterChange = async (currentRankAndLp: string) => {
    const user = await currentUser(); 

    try {
        await connectToDatabase();
        const getUser = await Booster.findOne({clerkId: user?.id});
        const order = await Order.findById(getUser.orderId)
        await Booster.findByIdAndUpdate(getUser._id, {
            oldOrder: getUser.orderId,
            orderId: '',
        })
        await Order.findByIdAndUpdate(getUser.orderId, {
            change_booster: "changed",
            booster_id: '',
            status: 'reviewing',
        })
        await AdminsOrder.findOneAndUpdate({orderId: getUser.orderId}, {
            current_lp_rank_from_booster: currentRankAndLp,
        })
        await User.findByIdAndUpdate(order.customer_id, {
            message: "The booster has confirmed the change, and now it's being reviewed by the admins!"
        })
        await Room.findOneAndDelete({booster_id: getUser._id});
        return {message: "Success!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}

export const acceptMessage = async (id: any) => {
    const user =  await currentUser();
    try {
        await connectToDatabase();
        const acceptedMessage = await Booster.findByIdAndUpdate(id, {
            message: ""
        });
        return {message: "The System Message Marked As Read", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}


export const dropOrder = async (reason: string, currentRankAndLp: string) => {
    const droppingOrderDateInHours = 24;
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await Booster.findOne({clerkId: user?.id});
        const droppedOrderDate = getUser.dropped_order_date;
        const currentTime = Date.now();
        const cooldownEndTime = Number(droppedOrderDate) + (droppingOrderDateInHours * 60 * 60 * 1000);
        if (currentTime < cooldownEndTime) {
            const remainingCooldown = Math.ceil((cooldownEndTime - currentTime) / (60 * 60 * 1000)); 
            return { message: `You can perform this action again in ${remainingCooldown} hours.` };
        } else {
        }

        await Room.findOneAndDelete({booster_id: getUser._id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            status: 'reviewing',
            drop_order: 'dropped',
            booster_id: '',
        })
        await Booster.findByIdAndUpdate(getUser._id, {
            oldOrder: getUser.orderId,
            orderId: '',
            dropped_order_date: Date.now(),
        })
        const order = await Order.findById(getUser.orderId);
        await User.findByIdAndUpdate(order.customer_id, {
            message: "The Booster Has Been Changed, Please Wait Until A New Booster Claims Your Order, This Will Not Take Much Time!"
        })
        const droppedOrder = await AdminsOrder.create({
            customer_id: order.customer_id,
            booster_id: getUser._id,
            orderId: order._id,
            reason: reason,
            current_lp_rank_from_booster: currentRankAndLp,
            type: "drop_order",
        })
        await Room.findOneAndDelete({booster_id: getUser._id});
        return {message: "Success!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}


export const finishOrder = async (currentRankAndLp: string) => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await Booster.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            status: 'done',
            booster_finish: 'finished',
            booster_id: '',
        })
        await Booster.findByIdAndUpdate(getUser._id, {
            orderId: '',
        })
        const order = await Order.findById(getUser.orderId);
        await User.findByIdAndUpdate(order.customer_id, {
            message: "The booster has marked your order 'Finished'. If you've reached your desired rank, click 'Confirm', otherwise, click 'Deny'.",
        })
        const boosterFinish = await AdminsOrder.create({
            customer_id: order.customer_id,
            booster_id: getUser._id,
            orderId: order._id,
            reason: 'Booster Flagged The Order As Finished',
            type: "booster_finished",
            current_lp_rank_from_booster: currentRankAndLp,
        })
        await Room.findOneAndDelete({booster_id: getUser._id});
        return {message: "Success!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}


export const sendReport = async (role: string, report: string) => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await Booster.findOne({clerkId: user?.id});
        const newReport = await Report.create({author_name: user?.username, author_id: getUser._id, author_clerkId: user?.id, role, report});
        return {message: "Success!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}


export const editProgress = async (current_rank: string, current_division: string) => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await Booster.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            current_rank,
            current_division,
        })
        return {message: "Success!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}

export const activateBoosting = async () => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await Booster.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            boosting_status: "on",
        })
        return {message: "Success!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}

export const disableBoosting = async () => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await Booster.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            boosting_status: "off",
        })
        return {message: "Success!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}


export const startBoosting = async () => {
    const user = await currentUser();
    try {
        await connectToDatabase();
        const getUser = await Booster.findOne({clerkId: user?.id});
        const newOrder = await Order.findByIdAndUpdate(getUser.orderId, {
            status: "In Progress",
        })
        return {message: "Success!", status: 200}
    } catch (error) {
        return {status: 400, message: "Oops! Something went wrong... Try Again"};
    }
}
