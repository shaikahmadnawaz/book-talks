import mongoose from "mongoose";
import validator from "validator";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Book", BookSchema);
