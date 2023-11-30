import mongoose from "mongoose";

const schema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

const model = mongoose.model('ban', schema);

export default model; 