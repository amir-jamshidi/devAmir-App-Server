import mongoose from "mongoose";
const alertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    btn: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        required: true
    },
    isShow: {
        type: Number,
        default: 0
    },
    href: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
},{ timestamps: true })
const alertModel = mongoose.model('alerts', alertSchema);
export default alertModel