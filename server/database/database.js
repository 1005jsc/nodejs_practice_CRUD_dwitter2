import { config } from '../config.js';
import mongoose from 'mongoose';

export const connectDB = async () => {
  return mongoose.connect(config.db.host);
};

// TODO(재신) : Delete below
// let db;

// export const getTweets = () => {
//   return db.collection('tweets');
// };

export function useVirtualId(schema) {
  //_id -> id 같은 가상의 아이디 추가해주기
  // 여기 코드 모르겠다
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
}
