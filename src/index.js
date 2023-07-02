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
  //   const tweet = await Tweet.create({
  //     content: "4th tweet",
  //     userEmail: "user4@example.com",
  //   });

  // const tweet = await Tweet.find({
  //   userEmail: "user@example.com",
  // });

  // const tweet = await Tweet.findById("649fe3606802b54d9a599907");
  // tweet.userEmail = "b@c.com";
  // await tweet.save();

  const tweetRepo = new TweetRepository();
  // const tweet = await tweetRepo.get("649fe3606802b54d9a599907");
  // const tweet = await tweetRepo.update("649fe3606802b54d9a599907", {
  //   content: "now i am too good",
  // });

  // tweet.comments.push({
  //   content: "First Comment",
  // });

  // await tweet.save();

  // // when we does findByIdAndUpdate, then it updates doc properly but return the current old doc only
  // console.log(tweet);

  // const tweet = await tweetRepo.create({
  //   content: "Tweet with comment schema",
  // });
  // console.log(tweet);

  // const comment = await Comment.create({
  //   content: "This might definately be new comment ",
  // });
  // tweet.comments.push(comment);
  // await tweet.save();

  // const tweet = await tweetRepo.getWithComments("649feeeeb9b4ffcfab8793a3");
  const tweet = await tweetRepo.create({ content: "With hooks now" });
  console.log(tweet);
});
