import { Schema, model, models } from "mongoose";

const BoosterSchema = new Schema({
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
  wallet: {
    type: String,
    required: true,
    unique: false,
  },
  message: {
    type: String,
    required: false,
    unique: false,
  },
  dropped_order_date: {
    type: String,
    required: false,
    unique: false,
  },
  oldOrder: {
    type: String,
    required: false,
    unique: false,
  }
});

const Booster = models?.boosters || model("boosters", BoosterSchema);

export default Booster;
