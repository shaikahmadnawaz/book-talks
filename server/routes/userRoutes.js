import express from "express";
import { getUsers, getUserById } from "../controllers/userController.js";

const router = express.Router();

// Public routes
router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
