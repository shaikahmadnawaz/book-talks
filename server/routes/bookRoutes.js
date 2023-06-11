import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadCoverImage } from "../middlewares/uploadMiddleware.js";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  addReview,
  updateReview,
  deleteReview,
  getReviews,
} from "../controllers/bookController.js";

const router = express.Router();

// Public routes
router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected routes
router.post("/", protect, uploadCoverImage, addBook);
router.patch("/:id", protect, uploadCoverImage, updateBook);
router.delete("/:id", protect, deleteBook);
router.post("/:id/reviews", protect, addReview);
router.patch("/:id/reviews/:reviewId", protect, updateReview);
router.delete("/:id/reviews/:reviewId", protect, deleteReview);
router.get("/book/:bookId/reviews", protect, getReviews);

export default router;
