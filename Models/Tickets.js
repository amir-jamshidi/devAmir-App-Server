import mongoose from "mongoose";

const schema = new mongoose.Schema({
    creatorID: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    body: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        default: 2
    },
    isAnswer: {
        type: Number,
        default: 0
    },
    answerContent: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const model = mongoose.model('ticket', schema);
export default model;