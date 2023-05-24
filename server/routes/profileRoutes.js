import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getUserProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", protect, getUserProfile);

export default router;
