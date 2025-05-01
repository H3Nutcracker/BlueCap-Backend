import express, { json, Request, Response, urlencoded } from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { router } from "./routes/index";
import { connectDB } from "./config/database";

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

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
