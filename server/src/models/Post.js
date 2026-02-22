import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    authorName:  { type: String, required: true },
    authorEmail: { type: String, required: true },
    avatarId:    { type: String, default: "boy" },
    text:        { type: String, required: true, maxlength: 300 },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    authorName:  { type: String, required: true },
    authorEmail: { type: String, required: true },
    avatarId:    { type: String, default: "boy" },

    content: { type: String, required: true, maxlength: 1000 },

    tag: {
      type: String,
      enum: ["DSA","System Design","AI & ML","Networks","DBMS","Cloud","Career","General"],
      default: "General",
    },

    // stores emoji counts e.g. { "🔥": 5, "💡": 3 }
    reactions: {
      type: Map,
      of: Number,
      default: {},
    },

    comments: [commentSchema],
    edited:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);