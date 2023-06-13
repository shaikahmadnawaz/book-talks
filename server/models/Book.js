import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    author: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    rating: {
      type: Number,
      // required: true,
      default: 0,
    },
    category: {
      type: String,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    coverImage: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

BookSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "book",
});

export default mongoose.model("Book", BookSchema);
