const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    userEmail: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// defining a virtual here.
tweetSchema.virtual("contentWithEmail").get(function process() {
  return this.content + "\n" + "Created By: " + this.userEmail;
});

tweetSchema.pre("save", function (next) {
  console.log("Inside a hook");
  this.content = this.content + "....";
  next();
});

tweetSchema.index({ name: -1, userEmail: -1 });

const Tweet = mongoose.model("Tweet", tweetSchema); // mongo auto names plural
module.exports = Tweet;
