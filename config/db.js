// Import mongoose to connect with MongoDB
import mongoose from 'mongoose';

// Code logic to connect with MongoDB
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected with MongoDB.")
    } catch (error) {
        console.error("Couldn't connect with MongoDB", error);
        process.exit(1);
    };
};

export default connectDb

