import express from "express";
import { connect } from "./config/database.js";
import apiRoutes from "./routes/index.js";
import bodyParser from "body-parser";
import { UserRepository, TweetRepository } from "./repository/index.js";
import LikeService from "./services/like-service.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
  console.log("Mongo db connected");

  const userRepo = new UserRepository();
  const tweetRepo = new TweetRepository();
  const tweets = await tweetRepo.getAll(0, 10);
  const user = await userRepo.create({
    email: "Parteek@admin.com",
    password: "1233456",
    name: "Parteek",
  });

  const likeService = new LikeService();
  await likeService.toggleLike(tweets[0].id, "Tweet", user.id);
});
