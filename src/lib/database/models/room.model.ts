import { Schema, model, models } from "mongoose";

const RoomSchema = new Schema({
    customer_name: {
        type: String,
        required: true,
        unique: true
    },
    customer_id: {
        type: String,
        required: true,
        unique: true
    },
    booster_name: {
        type: String,
        required: true,
        unique: false
    },
    booster_id: {
        type: String,
        required: true,
        unique: false
    },
    orderId: {
        type: String,
        required: true,
        unique: false
    },
    messages: {
        type: Array,
        required: false,
        unique: false,
    }
});

const Room = models?.rooms || model("rooms", RoomSchema);

export default Room;
