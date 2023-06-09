import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Book from "../models/Book.js";

// @desc    Get user profile
// @route   GET /api/profile/me
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const books = await Book.find({ user: req.userId });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user profile", error: error.message });
  }
});
