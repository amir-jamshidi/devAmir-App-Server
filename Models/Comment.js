import mongoose from "mongoose";

const schema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    creatorID: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: "course",
        required: true
    },
    score: {
        type: Number,
        default: 5,
        required: true
    },
    isShow: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const model = mongoose.model('comment', schema);

export default model ; 