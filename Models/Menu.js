import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    isSub: {
        type: Number,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "menu",
        required: false
    }
},{ timestamps: true })

const model = mongoose.model('menu', schema);

export default model