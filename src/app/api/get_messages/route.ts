import { NextResponse } from 'next/server';
import Room from 'src/lib/database/models/room.model';
import { connectToDatabase } from 'src/lib/database/mongoose';

export async function POST(req: Request, res: Response) {
    try {
        let requestBody: { customer?: { username: string; _id: string }; booster?: any } | null;
        
        requestBody = await req.json();
        let customer = {
            customer_name: requestBody?.customer?.username || '',
        };

        await connectToDatabase();
        const room = await Room.findOne({ customer_name: customer.customer_name });

        if (!room) {
            return NextResponse.json({ message: 'No messages found for this customer', status: 404 });
        }

        return NextResponse.json({
            messages: room.messages,
            status: 200,
            success: true,
            message: 'Successfully fetched the messages',
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed to get messages', status: 400 });
    }
}
