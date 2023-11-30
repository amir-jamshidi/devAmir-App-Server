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
    isFree: {
        type: Number,
        required: true
    },
    video: {
        type: String,
        required: true

    },
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: 'course'

    },
    sessionID: {
        type: mongoose.Types.ObjectId,
        ref: 'session'
    },
    href: {
        type: String,
        required: true
    }
})

const model = mongoose.model('meeting', schema);
export default model