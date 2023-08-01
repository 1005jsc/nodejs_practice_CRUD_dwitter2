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
};

export const getAllByUsername = async (username) => {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
};

export const getById = async (id) => {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
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

  return getTweets()
    .insertOne(tweet)

    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
};

export const update = async (id, text) => {
  return getTweets()
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { text } }, { returnDocument: 'after' })
    .then((result) => result.value)
    .then(mapOptionalTweet);
};

export const remove = async (id) => {
  return getTweets().deleteOne({ _id: new ObjectId(id) });
};

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
