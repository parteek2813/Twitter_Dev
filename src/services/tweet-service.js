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

    alreadyPresenttags = alreadyPresenttags.map(tags => tags.title)
    let newTags = tags.filter((tag) => !alreadyPresenttags.includes(tag));
    newTags = newTags.map((tag) => {
      return { title: tag, tweets: [tweet.id] };
    });

    
    const response = await this.hashtagRepository.bulkCreate(newTags);
    return tweet;
  }
}

module.exports = TweetService;
