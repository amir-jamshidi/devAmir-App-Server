import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    profile: {
        type: String,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('user', schema);
export default model