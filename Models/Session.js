import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: "course"
    },
    isFree: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const model = mongoose.model('session', schema);

export default model