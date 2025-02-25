import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.REACT_APP_MONGODB_URI);
        console.log(">>> DB is connected");
    } catch (error) {
        console.log(error);
    }
};
