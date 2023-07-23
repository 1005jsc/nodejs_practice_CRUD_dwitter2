import * as TweetRepository from '../data/tweet.js';

export const getTweets = async (req, res, next) => {
  const username = req.query.username;
  const data = await (username
    ? TweetRepository.getAllByUsername(username)
    : TweetRepository.getAll());
  res.status(200).json(data);
};

export const getTweet = async (req, res, next) => {
  const id = req.params.id;

  const tweet = await TweetRepository.getById(id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

export const createTweet = async (req, res, next) => {
  const { text, name, username } = req.body;

  const tweet = await TweetRepository.create(text, name, username);

  res.status(201).json(tweet);
};

export const updateTweet = async (req, res, next) => {
  const id = req.params.id;

  const text = req.body.text;

  const tweet = await TweetRepository.getById(id);

  if (!tweet) {
    return res.sendStatus(404);
  }

  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }

  const updated = await TweetRepository.update(id, text);

  res.status(200).json(updated);
};

export const removeTweet = async (req, res, next) => {
  const id = req.params.id;
  const tweet = await TweetRepository.getById(id);

  if (!tweet) {
    return res.sendStatus(404);
  }

  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }

  await TweetRepository.remove(id);
  res.status(200).json({ message: '지웠으니 안심하라구~' });
};
