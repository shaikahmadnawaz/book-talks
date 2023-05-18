import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getBooks,
  getBookById,
  addBook,
} from "../controllers/bookController.js";

const router = express.Router();

// Public routes
router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected routes
router.post("/", protect, addBook);

export default router;
