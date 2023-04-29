import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./db/connectDB.js";
import userRouter from "./routes/userRoute.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api", userRouter);

const port = process.env.PORT || 5000;

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
