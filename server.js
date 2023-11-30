import app from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import questionModel from './Models/Comment.js'
dotenv.config();
const PORT = process.env.PORT;

(async () => {
    await mongoose.connect(process.env.MONGO);
    console.log('MongoDB Connected');
    await questionModel.deleteMany({});
})()

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
})
