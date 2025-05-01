import { Router } from "express";
import { registerUser } from "../controllers/userControllers";

const router = Router();

router.post("/register", (req, res, next) => {
  registerUser(req, res).catch(next);
});

export default router;
