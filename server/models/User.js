import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
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
    profileImage: {
      type: String,
      default:
        "https://booktalks.s3.ap-south-1.amazonaws.com/istockphoto-1305665241-1024x1024.jpg",
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

UserSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "user",
});

export default mongoose.model("User", UserSchema);
