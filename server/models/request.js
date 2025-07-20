import mongoose from "mongoose"
import { Types } from "mongoose";

const requestSchema = new mongoose.Schema({
    sender:{
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    reciever:{
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"],
    }
})      

export const Request= mongoose.model("Request", requestSchema);

