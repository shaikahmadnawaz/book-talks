import User from "../models/User.js";
import asyncHandler from "express-async-handler";

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length > 0) {
      res
        .status(200)
        .json({ message: "Users found", totalUsers: users.length, users });
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get a user by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("books");

    if (user) {
      res.status(200).json({ message: "User found", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
