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
    // res.sendStatus(404) // 근데 이건 url을 찾을 수 없을때 사용하는 거와 겹치기 떄문에 아래와 같이 쓰는것이 좋을 듯
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

export const createTweet = async (req, res, next) => {
  // 1. 상단에는 필요한 변수들을 정의해줌
  const { text, name, username } = req.body;

  const tweet = await TweetRepository.create(text, name, username);

  // 200 : 성공이다, 201 : '성공적으로 만들어졌다'
  res.status(201).json(tweet);
};

export const updateTweet = async (req, res, next) => {
  const id = req.params.id;

  const text = req.body.text;

  const tweet = await TweetRepository.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

export const removeTweet = async (req, res, next) => {
  const id = req.params.id;
  await TweetRepository.remove(id);
  res.sendStatus(204);
};