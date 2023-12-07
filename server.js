import app from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

(async () => {
    await mongoose.connect(process.env.MONGO);
    console.log('MongoDB Connected');
})()

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
})
