import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/authRoute.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

// Routes for user authentication
app.use("/api/auth", authRouter);

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
