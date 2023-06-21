import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { uploadImage } from "../middlewares/uploadMiddleware.js";

// User registration
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("He;", req.body);
    console.log(req.file);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (req.file) {
      // Uploading the profile image to AWS S3
      await uploadImage(req.file, "profile-images", newUser._id);

      // Setting the cover image URL in the book model
      newUser.profileImage = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/profile-images/${newUser._id}/${req.file.originalname}`;
    }

    // Save the user to the database
    const newProfile = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", newProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Checking if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Comparing passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generating a JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expiration time
    });

    const userData = await User.findOne({ _id: user._id }).select("-password");
    res.status(200).json({ userData, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
