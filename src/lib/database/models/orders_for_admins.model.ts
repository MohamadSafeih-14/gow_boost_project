import { Schema, model, models } from "mongoose";

const OrdersForAdminsSchema = new Schema({
    customer_id: {
        type: String,
        required: true,
        unique: false,
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
    reason: {
        type: String,
        required: true,
        unique: false,
    },
    type: {
        type: String,
        required: true,
        unique: false,
    },
    current_lp_rank_from_booster: {
        type: String,
        required: false,
        unique: false
    },
    current_lp_rank_from_customer: {
        type: String,
        required: false,
        unique: false
    },  
},{
    timestamps: {
      createdAt: true
    }
  });

const AdminsOrder = models?.orders_for_admins || model("orders_for_admins", OrdersForAdminsSchema);

export default AdminsOrder;
