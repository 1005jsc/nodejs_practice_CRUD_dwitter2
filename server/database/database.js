import MongoDb from 'mongodb';
import { config } from '../config.js';

let db;

export const connectDB = async () => {
  return MongoDb.MongoClient.connect(config.db.host) //
    .then((client) => {
      db = client.db();
    });
};

export const getUsers = () => {
  return db.collection('users');
};

export const getTweets = () => {
  return db.collection('tweets');
};
