import mongoose from "mongoose";

const schama = new mongoose.Schema({
    creatorID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: true
    },
    body: {
        type: String,
        required: true
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

const model = mongoose.model('questions', schama)

export default model