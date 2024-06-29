import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
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
});

const Admin = models?.admins || model("admins", AdminSchema);

export default Admin;
