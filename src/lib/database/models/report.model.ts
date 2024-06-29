import { Schema, model, models } from "mongoose";

const ReportSchema = new Schema({
    author_name: {
        type: String,
        required: true,
        unique: false,
    },
    author_id: {
        type: String,
        required: true,
        unique: false,
    },
    author_clerkId: {
        type: String,
        required: true,
        unique: false,
    },
    role: {
        type: String,
        required: true,
        unique: false,  
    },
    report: {
        type: String,
        required: true,
        unique: false,  
    },
    },{
    timestamps: {
      createdAt: true
    }
  });

const Report = models?.reports || model("reports", ReportSchema);

export default Report;
