const express = require("express");
const connect = require("./config/database");

const app = express();
const Tweet = require("./models/tweet");
const HashtagRepository = require("./repository/hashtag-repository");

const PORT = 3000;

// const { TweetRepository } = require("./repository/index");
const TweetService = require("./services/tweet-service");
const Comment = require("./models/comments");

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
  console.log("Mongo db connected");
  let service = new TweetService();
  const tweet = await service.create({
    content:
      "is #tweet working ?",
  });
  console.log(tweet);
});
