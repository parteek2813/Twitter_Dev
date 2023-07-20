import TweetRepository from "../../src/repository/tweet-repository";
import Tweet from "../../src/models/tweet.js";

// basic logic for ES6 is mock whole module using jest.mock
jest.mock("../../src/models/tweet.js");

describe("Create Tweet tests", () => {
  test("Should create a new tweet and return it", async () => {
    const data = {
      content: "Testing tweet ",
    };

    //   whenever say tweet.create --- just mocks its implementation
    //   appending the data with more contents
    //   whenever we have to mock the implementation of any object, pass the Whole object[Tweet] and some method
    //   defined in it and then just mockImplementation
    const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
      return { ...data, createdAt: "2022-01-12", updatedAt: "2022-01-12" };
    });

    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data); // telling here to create the tweet with the data object
    expect(spy).toHaveBeenCalledTimes(1);
    expect(tweet.content).toEqual(data.content);
    expect(tweet.createdAt).toBeDefined();
  });

  test("should not create the tweet and throw exception", async () => {
    const data = {
      content: "Testing tweet ",
    };

    const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
      throw new Error("Something went wrong");
    });
    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data).catch((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Something went wrong");
    });
  });
});

describe("get all tweet tests", () => {
  test("testing limit for get all ", async () => {
    const data = {
      content: "Testing tweet",
    };

    const tweetsArray = [
      { ...data, createdAt: "2022-01-12", updatedAt: "2022-01-12" },
      { ...data, createdAt: "2022-01-12", updatedAt: "2022-01-12" },
      { ...data, createdAt: "2022-01-12", updatedAt: "2022-01-12" },
    ];

    const findResponse = { tweetsArray };
    findResponse.limit = jest.fn((limit) =>
      findResponse.tweetsArray.slice(0, limit)
    );
    findResponse.skip = jest.fn((offset) => findResponse);

    const spy = jest.spyOn(Tweet, "find").mockImplementation(() => {
      return findResponse;
    });

    const tweetRepository = new TweetRepository();
    const tweets = await tweetRepository.getAll(0, 2);
    expect(spy).toHaveBeenCalled();
    expect(tweets).toHaveLength(2);
  });
});

// test("actually callign the model", async () => {
//   const data = {
//     content:
//       "dfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnjdfksnjskajnaskdjnsakdnj",
//   };

//   const tweet = await Tweet.create(data);
//   expect(tweet).toBeUndefined();
// });
