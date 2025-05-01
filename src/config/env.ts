import dotenv from "dotenv";

dotenv.config();

// Environment variables
export const ENV = {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || "",
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret_key",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1d",
};
