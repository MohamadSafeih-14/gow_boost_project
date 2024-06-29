import { NextResponse } from 'next/server';
import { getPusherInstance } from '../../../../lib/pusher/server/index';
import Room from 'src/lib/database/models/room.model';

const pusherServer = getPusherInstance();

export async function POST(req: Request, res: Response) {
    let requestBody: { message?: any, channel_name?: any } | null;
    try {
        requestBody = await req.json();

        // Validate request body
        if (!requestBody || !requestBody.message || !requestBody.channel_name) {
            throw new Error('Invalid request body');
        }
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
    }
    const { message, channel_name } = requestBody;
    const message1 = {
        message: message,
        user: "ree",
        date: new Date(),
    };

    try {
        await pusherServer.trigger(
            `${channel_name.name}`,
            "evt::message",
            message1
        );

        const room = await Room.findOne({ customer_name: channel_name.owner });
        if (!room) {
            throw new Error('Room not found');
        }

        let newMessages = [...room.messages, message1];
        if (newMessages.length > 100) {
            newMessages = newMessages.slice(1); // Remove the oldest message
        }

        await Room.findByIdAndUpdate(room._id, {
            messages: newMessages
        });

        return NextResponse.json({ success: true, message: "Message sent successfully",status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Failed to send message", status: 500 });
    }
}
