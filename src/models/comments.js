import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Tweet", "Comment"],
    },
    commentable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    // likes: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Like",
    //   },
    // ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema); // mongo auto names plural
export default Comment;
