import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import multer from "multer";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const upload = multer({
  storage: multer.memoryStorage(), // Store the file in memory as a Buffer
  limits: {
    fileSize: 25 * 1024 * 1024, // Limit the file size to 5MB
  },
});

// Routes for user authentication
app.use("/api/auth", authRouter);

app.use("/api/books", upload.single("coverImage"), bookRoutes);

app.use("/api/profile", profileRoutes);

const port = process.env.PORT || 5000;

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
