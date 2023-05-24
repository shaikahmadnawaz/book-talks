import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Book from "../models/Book.js";

// @desc    Get user profile
// @route   GET /api/profile/me
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  if (user) {
    const books = await Book.find({ user: req.user._id });
    console.log(books);
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
