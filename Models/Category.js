import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    }
},{ timestamps: true })
const model = mongoose.model('category', schema);

export default model
