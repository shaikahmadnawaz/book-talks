import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Book from "../models/bookModel.js";

// @desc    Get user profile
// @route   GET /api/profile/me
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const books = await Book.find({ user: req.user._id });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      books,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
