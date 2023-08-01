// import { getUsers, useVirtualId } from '../database/database.js';
import mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

// mongoDB는 nosql이라 schema개념이 없는데
// mongoose에는 schema 개념이 있다

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);

const User = mongoose.model('User', userSchema);

export const getAllUsers = async () => {
  return getUsers()
    .find()
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const findByUsername = async (username) => {
  return User.findOne({ username });

  // return getUsers() //
  //   .findOne({ username }) //
  //   .then(mapOptionalUser);
};

export const createUser = async (user) => {
  return new User(user).save().then((data) => data.id);

  // return getUsers()
  //   .insertOne(user)
  //   .then((data) => data.insertedId.toString());
};

export const findById = async (id) => {
  return User.findById(id);
  // return getUsers()
  //   .findOne({ _id: new ObjectId(id) }) //
  //   .then(mapOptionalUser);
};

// function mapOptionalUser(user) {
//   return user ? { ...user, id: user._id.toString() } : user;
// }
