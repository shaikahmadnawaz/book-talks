import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 5,
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

UserSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "user",
});

export default mongoose.model("User", UserSchema);
