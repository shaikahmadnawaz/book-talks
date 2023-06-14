import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  comment: {
    type: String,
    // required: true,
  },
  rating: {
    type: Number,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Review", ReviewSchema);
