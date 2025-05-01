import express, { json, Request, Response, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/index";
import { connectDB } from "./config/database";

// This will load environment variables from a .env file into process.env
dotenv.config();

// Initialization of the express application
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use("/api", router);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("¡Express Server with TypeScript and MongoDB is running!");
});

// Connect to the database
connectDB();

// Port configuration
// The port is set to the value of the PORT environment variable or defaults to 5718
const PORT = process.env.PORT || 5718;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
