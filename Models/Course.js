import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true,
    },
    creatorID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true
    },
    isFree: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    sellCount: {
        type: Number,
        required: true,
        default: 0
    },
    meetingsCount: {
        type: Number,
        default: 0
    },
    support: {
        type: String,
        required: true
    },
    prerequisite: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "در حال برگزاری"
    },
}, { timestamps: true });
const model = mongoose.model('course', schema);
export default model; 
