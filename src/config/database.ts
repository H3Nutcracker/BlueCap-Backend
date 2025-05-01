import mongoose from "mongoose";
import { ENV } from "./env";

// Function to connect to the database
export const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string
    await mongoose.connect(ENV.DB_CONNECTION_STRING);
    console.log("🟢 Successfully connected to MongoDB");
  } catch (error) {
    console.error("🔴 Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};
