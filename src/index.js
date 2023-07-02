const express = require("express");
const connect = require("./config/database");

const app = express();
const Tweet = require("./models/tweet");

const PORT = 3000;

const TweetRepository = require("./repository/tweet-repository");
const Comment = require("./models/comments");

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
  console.log("Mongo db connected");

  const tweets = await Tweet.find({
    content: ["First tweet", "4th tweet", "12123me"],
  });

  console.log(tweets);
});
