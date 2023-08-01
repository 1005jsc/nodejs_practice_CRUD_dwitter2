import { ObjectId } from 'mongodb';
import { getTweets } from '../database/database.js';
import * as userRepository from './auth.js';

export const getAll = async () => {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then((data) => {
      console.log(data);
      return data;
    });

  // return Promise.all(
  //   tweets.map(async (tweet) => {
  //     const { username, name, url } = await userRepository.findById(tweet.userId);
  //     return { ...tweet, username, name, url };
  //   })
  // );
};

export const getAllByUsername = async (username) => {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);

  // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
};

export const getById = async (id) => {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);

  // const found = tweets.find((tweet) => tweet.id === id);

  // const yo = await userRepository.getAllUsers();

  // if (!found) {
  //   return null;
  // }

  // const yo2 = await userRepository.findById(found.userId);

  // const { username, name, url } = yo2;
  // return { ...found, username, name, url };
};

export const create = async (text, username) => {
  const { name, id: userId, url } = await userRepository.findByUsername(username);

  const tweet = {
    text,
    createdAt: new Date().toString(),
    userId,
    name,
    username,
    url,
  };

  return (
    getTweets()
      .insertOne(tweet)
      // 새롭게 만들어진 tweet을 리턴해줘야함
      .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }))
  );

  // const user = await userRepository.findByUsername(username);

  // console.log(user);

  // const tweet = {
  //   id: Date.now().toString(),
  //   text,
  //   createdAt: new Date().toString(),
  //   userId: user.id,
  // };

  // tweets = [tweet, ...tweets];
  // return getById(tweet.id);
};

export const update = async (id, text) => {
  return getTweets()
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { text } }, { returnDocument: 'after' })
    .then((result) => result.value)
    .then(mapOptionalTweet);

  // const tweet = await getById(id);
  // tweets = [
  //   ...tweets.filter((v) => v.id !== id),
  //   {
  //     ...tweet,
  //     text,
  //   },
  // ];

  // return {
  //   ...tweet,
  //   text,
  // };
};

export const remove = async (id) => {
  return getTweets().deleteOne({ _id: new ObjectId(id) });
  // tweets = tweets.filter((t) => t.id != id);
};

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
