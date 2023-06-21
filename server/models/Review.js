import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
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

ReviewSchema.virtual("reviewer", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});

export default mongoose.model("Review", ReviewSchema);
