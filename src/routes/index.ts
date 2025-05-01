import { Router } from "express";
import userRoutes from "../users/routes/userRoutes";

const router = Router();

router.use("/users", userRoutes);

export { router };
