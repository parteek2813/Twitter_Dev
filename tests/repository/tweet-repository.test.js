import TweetRepository from "../../src/repository/tweet-repository";
import Tweet from "../../src/models/tweet.js";

// basic logic for ES6 is mock whole module using jest.mock
jest.mock("../../src/models/tweet.js");

test("Should create a new tweet and return it", async () => {
  const data = {
    content: "Testing tweet ",
  };

  //   whenever say tweet.create --- just mocks its implementation
  //   appending the data with more contents
  //   whenever we have to mock the implementation of any object, pass the Whole object[Tweet] and some method
  // defined in it and then just mockImplementation
  const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
    return { ...data, createdAt: "2022-01-12", updatedAt: "2022-01-12" };
  });

  const tweetRepository = new TweetRepository();
  const tweet = await tweetRepository.create(data); // telling here to create the tweet with the data object
  expect(spy).toHaveBeenCalledTimes(1);
  expect(tweet.content).toEqual(data.content);
  expect(tweet.createdAt).toBeDefined();
});
