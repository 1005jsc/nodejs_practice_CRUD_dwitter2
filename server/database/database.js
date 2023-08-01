import MongoDb from 'mongodb';
import { config } from '../config.js';
import mongoose from 'mongoose';

export const connectDB = async () => {
  return mongoose.connect(config.db.host);
};

// TODO(재신) : Delete below
let db;

export const getUsers = () => {
  return db.collection('users');
};

export const getTweets = () => {
  return db.collection('tweets');
};
