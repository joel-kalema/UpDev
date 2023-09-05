import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
    // Set strict query mode for Mongoose to prevent unknown field queries.
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL) return console.log("MongoDB_URL not found");

    // If the connection is already established, return without creating a new connection.
    if (isConnected) return console.log("MongoDB connection already established");
    
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true; // Set the connection status to true

        console.log("MongoDB connected");
        
    } catch (error) {
        console.log(error);
    }
}