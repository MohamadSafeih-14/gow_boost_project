import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  customer_id: {
    type: String,
    required: true,
    unique: false,
  },
  booster_id: {
    type: String,
    required: false,
    unique: false,
  },
  starting_rank: {
        type: String,
        required: true,
  },
  starting_division: {
        type: String,
        required: true,
  },
  ending_rank: {
        type: String,
        required: true,
  },
  ending_division: {
        type: String,
        required: true,
  },
  current_rank: {
      type: String,
      required: true,
  },
  current_division: {
      type: String,
      required: true,
  },
  server: {
        type: String,
        required: true,
  },
  lp: {
        type: String,
        required: true,
  },
  boost_type: {
        type: String,
        required: true,
  },
  addons: {
      type: Object,
      required: true,
  },
  status: {
        type: String,
        required: true,
  },
  boosting_status: {
      type: String,
      required: true,
  },
  price: {
        type: String,
        required: true,
        unique: false,
  },
  openGG: {
      type: String,
      required: false,
      unique: false,
  },
  change_booster: {
      type: String,
      required: false,
      unque: false,
  },
  drop_order: {
      type: String,
      required: false,
      unque: false,
  },
  booster_finish: {
      type: String,
      required: false,
      unque: false,
  },
  denie_order: {
      type: String,
      required: false,
      unque: false,
  },
  complete: {
      type: Boolean,
      required: false,
      unque: false,  
  }
}, {
      timestamps: true,
});

const Order = models?.orders || model("orders", OrderSchema);

export default Order;