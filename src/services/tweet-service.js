const { TweetRepository, HashtagRepository } = require("../repository/index");

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    const content = data.content;
    const tags = content.match(/#[a-zA-Z0-9_]+/g).map((tag) => tag.substring(1));
    const tweet = await this.tweetRepository.create(data);
    
    let alreadyPresenttags = await this.hashtagRepository.findByName(tags);
    let titleOfPresentTags = alreadyPresenttags.map(tags => tags.title)
    let newTags = tags.filter((tag) => !titleOfPresentTags.includes(tag));
    newTags = newTags.map((tag) => {
      return { title: tag, tweets: [tweet.id] };
    });

    await this.hashtagRepository.bulkCreate(newTags);
    alreadyPresenttags.forEach((tag) =>{
      tag.tweets.push(tweet.id);
      tag.save();
    })
    return tweet;
  }
}

module.exports = TweetService;