import mongoose from "mongoose";

const schema = new mongoose.Schema({
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    price: {
        type: Number,
        required: true
    },
    orderNumber: {
        type: String,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('courseRegister', schema);
export default model;