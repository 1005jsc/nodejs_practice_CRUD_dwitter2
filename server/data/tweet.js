// import { getTweets, useVirtualId } from '../database/database.js';
import { useVirtualId } from '../database/database.js';
import * as userRepository from './auth.js';
import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);

const Tweet = mongoose.model('Tweet', tweetSchema);

export const getAll = async () => {
  return Tweet.find().sort({ createdAt: -1 });

  // return getTweets() //
  //   .find()
  //   .sort({ createdAt: -1 })
  //   .toArray()
  //   .then((data) => {
  //     console.log(data);
  //     return data;
  //   });
};

export const getAllByUsername = async (username) => {
  return Tweet.find({ username }).sort({ createdAt: -1 });

  // return getTweets() //
  //   .find({ username })
  //   .sort({ createdAt: -1 })
  //   .toArray()
  //   .then(mapTweets);
};

export const getById = async (id) => {
  return Tweet.findById(id);

  // return getTweets()
  //   .findOne({ _id: new ObjectId(id) })
  //   .then(mapOptionalTweet);
};

export const create = async (text, username) => {
  const { name, id: userId, url } = await userRepository.findByUsername(username);

  return new Tweet({ text, userId, name, username }).save();

  // const tweet = {
  //   text,
  //   createdAt: new Date().toString(),
  //   userId,
  //   name,
  //   username,
  //   url,
  // };

  // return getTweets()
  //   .insertOne(tweet)

  //   .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
};

export const update = async (id, text) => {
  return Tweet.findByIdAndUpdate(id, { text }, { returnDocument: 'after' });

  // return getTweets()
  //   .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { text } }, { returnDocument: 'after' })
  //   .then((result) => result.value)
  //   .then(mapOptionalTweet);
};

export const remove = async (id) => {
  return Tweet.findByIdAndDelete(id);

  // return getTweets().deleteOne({ _id: new ObjectId(id) });
};

// function mapOptionalTweet(tweet) {
//   return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
// }

// function mapTweets(tweets) {
//   return tweets.map(mapOptionalTweet);
// }
