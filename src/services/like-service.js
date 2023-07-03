import { TweetRepository, LikeRepository } from "../repository/index.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    // /api/v1/likes/toggle?id=modelId&type=Tweet
    console.log(modelId); // gettting the model id
    console.log(modelType);
    if (modelType == "Tweet") {
      var likeable = await this.tweetRepository.get(modelId);
      likeable.populate({ path: "likes" });
      console.log(likeable);
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

      likeable.likes.pull(exists.id);
      await likeable.save();
      await exists.remove(); // remove the doc of like
      var isAdded = false;
    } else {
      // otherwise create new like
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();

      var isAdded = true;
    }
    return isAdded;
  }
}

export default LikeService;
