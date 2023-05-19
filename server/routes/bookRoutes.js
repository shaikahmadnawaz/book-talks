import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  addReview,
  updateReview,
  deleteReview,
} from "../controllers/bookController.js";

const router = express.Router();

// Public routes
router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected routes
router.post("/", protect, addBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);
router.post("/:id/reviews", protect, addReview);
router.put("/:id/reviews/:reviewId", protect, updateReview);
router.delete("/:id/reviews/:reviewId", protect, deleteReview);

export default router;
