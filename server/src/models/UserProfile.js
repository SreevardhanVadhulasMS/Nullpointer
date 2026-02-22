import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      default: "",
    },

    age: Number,
    contact: String,
    avatar: String,
  },
  { timestamps: true }
);

export default mongoose.model("UserProfile", userProfileSchema);