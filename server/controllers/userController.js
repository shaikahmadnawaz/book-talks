import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUser = User.findOne({ email });

    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
