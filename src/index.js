import express from "express";
import {connect} from "./config/database.js"

const app = express();
// const Tweet = require("./models/tweet");
// const HashtagRepository = require("./repository/hashtag-repository");

import HashtagRepository from "./repository/hashtag-repository.js";
import service from "./services/tweet-service.js"
const PORT = 3000;

// // const { TweetRepository } = require("./repository/index");
// const TweetService = require("./services/tweet-service");
// const Comment = require("./models/comments");

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
  console.log("Mongo db connected");
  let ser = new service();
  await ser.create({
    content: "my other #code #WORKS"
  }) 
});
