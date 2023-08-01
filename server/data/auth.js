import { ObjectId } from 'mongodb';
import { getUsers } from '../database/database.js';

export const getAllUsers = async () => {
  return getUsers()
    .find()
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const findByUsername = async (username) => {
  return getUsers() //
    .findOne({ username }) //
    .then(mapOptionalUser);
};

export const createUser = async (user) => {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
};

export const findById = async (id) => {
  return getUsers()
    .findOne({ _id: new ObjectId(id) }) //
    .then(mapOptionalUser);
};

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
