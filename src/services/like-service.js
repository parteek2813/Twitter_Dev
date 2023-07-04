import Tweet from "../models/tweet.js";
import { TweetRepository, LikeRepository } from "../repository/index.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    // /api/v1/likes/toggle?id=modelId&type=Tweet

    if (modelType == "Tweet") {
      var likeable = await this.tweetRepository.find(modelId);
    } else if (modelType == "Comment") {
      //todo
    } else {
      throw new Error("Unknown model type");
    }

    const exists = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });

    if (exists) {
      // if there is like, we gonna delete it
      if (exists instanceof Tweet) {
        likeable.likes.pull(exists.id);
        await likeable.save();
      } else {
        console.log("Unable to remove like. Invalid data type.");
      }
      await this.likeRepository.destroy(exists._id);
      var isAdded = true;
    } else {
      // otherwise create new like
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();

      var isAdded = false;
    }
    return isAdded;
  }
}

export default LikeService;
