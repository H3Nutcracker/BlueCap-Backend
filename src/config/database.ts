import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection string
const MONGODB_URI = process.env.DB_CONNECTION_STRING || "";

// Function to connect to the database
export const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string
    await mongoose.connect(MONGODB_URI);
    console.log("🟢 Successfully connected to MongoDB");
  } catch (error) {
    console.error("🔴 Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};
