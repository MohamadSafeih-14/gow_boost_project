import { currentUser } from "@clerk/nextjs"
import { connectToDatabase } from "../database/mongoose"; 
import User from "../database/models/user.model";

export const getMessages = async () => {
    try {
        const user = await currentUser();
        await connectToDatabase()
        const userFromDB = await User.findOne({clerkId: user?.id});
    } catch (error) {
        
    }
}