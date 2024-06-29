import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  orderId: {
    type: String,
    required: false,
    unique: false,
  },
  message: {
    type: String,
    required: false,
    unique: false,
  },
},
{
  timestamps: {
    createdAt: true
  }
},
);

const User = models?.users || model("users", UserSchema);

export default User;
