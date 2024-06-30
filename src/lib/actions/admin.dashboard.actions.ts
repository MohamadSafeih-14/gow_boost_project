"use server"
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose"
import { NextResponse } from "next/server";
import Order from "../database/models/order.model";
import Booster from "../database/models/booster.model";
import AdminsOrder from "../database/models/orders_for_admins.model";
import Report from "../database/models/report.model"; 


export const getOrders = async () => {
    try {
        await connectToDatabase();
        const droppedOrders = await AdminsOrder.find({type: "drop_order"})
        const boosterChanged = await AdminsOrder.find({type: "change_booster"});
        const boosterFinished = await AdminsOrder.find({type: "booster_finished"});
        const deniedOrders = await AdminsOrder.find({type: "denied"});
        const completedOrders = await AdminsOrder.find({type: "completed_order"})
        const reports = await Report.find({});
        return {droppedOrders, boosterChanged, boosterFinished, deniedOrders, reports, completedOrders, status: 200}
    } catch (error) {
        
    }
}

export const getDetails = async () => {
    try {
        await connectToDatabase();
        const summoners = await User.find({})
        const boosters = await Booster.find({});
        const orders = await Order.find({});
        return {summoners: summoners.length, boosters: boosters.length, orders: orders.length, status:200}
    } catch (error) {
        return {message: "Failed To Get Details", status: 400}
    }
}

export const getBoosters = async () => {
    try {
        await connectToDatabase();
        const boosters = await Booster.find({});
        return {boosters, status: 200}
    } catch (error) {
        return {message: "Failed To Get Boosters", status: 400}
    }
}

export const getBoosterDetails = async (booster_id: string) => {
    try {
        await connectToDatabase();
        const booster = await Booster.findById(booster_id);
        const clerkBooster = await clerkClient.users.getUser(booster.clerkId);
        return {booster, boosterImage: clerkBooster.imageUrl, status: 200}
    } catch (error) {
        return {message: "Failed To Get Boosters", status: 400}
    }
}

export const editWallet = async (booster_id: string, wallet: string) => {
    try {
        await connectToDatabase();
        const booster = await Booster.findByIdAndUpdate(booster_id, {
            wallet,
        });
        return {message: "The Wallet Has Been Successfuly Updated!", status: 200}
    } catch (error) {
        return {message: "Failed To Edit The Wallet"}
    }
}

export const getReports = async () => {
    try {
        await connectToDatabase();
        const reports = await Report.find({});
        return {status: 200, reports}
    } catch (error) {
        return {message: "failed to render reports", status: 400}
    }
}

export const getUserImage = async (author_id: string) => {
    console.log(author_id)
    try {
        
        const userImage = await clerkClient.users.getUser(author_id);
        console.log(userImage)
        return {image: userImage.imageUrl, status: 200}
    } catch (error) {
        return {message: "Something Went Wrong...", status: 400}
    }
}

export const getOrderDetails = async (jsonOrder: string, type: string) => {
        const newOrder = JSON.parse(jsonOrder);
    try {
        await connectToDatabase();
        const order = await Order.findById(newOrder.orderId);
        const adminsOrder = await AdminsOrder.findOne({orderId: order._id, type});
        const booster = await Booster.findById(adminsOrder.booster_id);
        const customer = await User.findById(adminsOrder.customer_id);
        const customerImg = await clerkClient.users.getUser(customer.clerkId);
        const boosterImg = await clerkClient.users.getUser(booster.clerkId);
        const data = {
            starting_rank: order.starting_rank,
            starting_division: order.starting_division,
            ending_rank: order.ending_rank,
            ending_division: order.ending_division,
            server: order.server,
            lp: order.lp,
            price: order.price,
            createdAt: order.createdAt,
            openGG: order.openGG,
            booster_id: adminsOrder.booster_id,
            customer_id: adminsOrder.customer_id,
            orderId: adminsOrder.orderId,
            reason: adminsOrder.reason,
            current_lp_rank_from_booster: adminsOrder.current_lp_rank_from_booster,
            current_lp_rank_from_customer: adminsOrder.current_lp_rank_from_customer,
            type: adminsOrder.type,
            requestDate: adminsOrder.createdAt,
            customer_username: customer.username,
            booster_username: booster.username,
            customer_img: customerImg.imageUrl,
            booster_img: boosterImg.imageUrl,
            status: 200
        }
        return data
    } catch (error) {
        return {message: "failed to get order details", status: 400}
    }
}


export const sendMessage = async (message: string, customer_id: string) => {
    try {
        await connectToDatabase();
        const customer = await User.findByIdAndUpdate(customer_id, {
            message
        })
        return {message: "The Message Was Successfuly Sent!", status: 200}
    } catch (error) {
        return {message: "Failed to Send the Message!", status: 500}
    }
}

export const editOrder = async (orderId: string, starting_rank: string, starting_division: string, price: number, server: string, lp: string) => {
    try {
        await connectToDatabase();
        const order = await Order.findByIdAndUpdate(orderId, {
            starting_rank,
            starting_division,
            price,
            server,
            lp,
        })
        return {message: "The Order Was Successfuly Updated!", status: 200}
    } catch (error) {
        return {message: "Failed to Update the Order!", status: 500}
    }
}

export const sendBackToOrdeList = async (orderId: string) => {
    try {
        await connectToDatabase();
        const order = await Order.findByIdAndUpdate(orderId, {
            status: "pending",
        })
        await AdminsOrder.findOneAndDelete({orderId: orderId})
        return {message: "The Order Was Successfuly Sent Back To Order List!", status: 200}
    } catch (error) {
        return {message: "Failed to Send Back the Order!", status: 500}
    }
}

export const acceptReport = async (reportId: string, message: string) => {
    try {
        const report = await Report.findById(reportId)
        await connectToDatabase();
        if(report.role === "customer") {
            await User.findByIdAndUpdate(report.author_id, {
                message: message,
            })
        } else if(report.role === "booster") {
            await Booster.findByIdAndUpdate(report.author_id, {
                message: message,
            })
        }
        await Report.findByIdAndDelete(reportId);
        return {message: "The Report Has Been Successfuly Accepted!", status: 200}
    } catch (error) {
        return {message: "Failed To Accept The Report!", status: 500}
    }
}


export const completeOrder = async (orderId: string, type: string) => {
    try {
        await connectToDatabase();
        const order = await Order.findByIdAndUpdate(orderId, {
            status: 'done',
            complete: true,
            customer_id: "",
        });
        const newOrder = await AdminsOrder.findOne({orderId: orderId});

        await User.findByIdAndUpdate(newOrder.customer_id, {
            orderId: '',
            message: 'Your Order Has Been Closed Successfully!'
        })
        
        if(type === "booster_finished") {
            await AdminsOrder.findOneAndUpdate({orderId, type: 'booster_finished'}, {
                type: "completed_order"
            });
        } else if(type === "denied_order") {
            await AdminsOrder.findOneAndUpdate({orderId, type: 'denied'}, {
                type: "completed_order"
            });
        }
        return {message: "The Requst Has Been Successfuly Completed!", status: 200}
    } catch (error) {
        return {status: 400, message: "Something Went Wrong..."};
    }
}

export const deleteOrder = async (orderId: string) => {
    try {
        await connectToDatabase();
        await Order.findByIdAndDelete(orderId);
        const order = await AdminsOrder.findOneAndDelete({orderId: orderId, type: "completed_order"});
        return {message: "The Requst Has Been Successfuly Deleted!", status: 200}
    } catch (error) {
        return {status: 400, message: "Something Went Wrong..."};
    }
}