import MongoDb from 'mongodb';
import { config } from '../config.js';

export const connectDB = async () => {
  return MongoDb.MongoClient.connect(config.db.host) //
    .then((client) => client.db());
};
