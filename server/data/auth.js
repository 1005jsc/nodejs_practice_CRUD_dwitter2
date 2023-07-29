import { ObjectId } from 'mongodb';
import { getUsers } from '../database/database.js';

export const getAllUsers = async () => {
  return getUsers();

  // return users;
};

export const findByUsername = async (username) => {
  return getUsers() //
    .findOne({ username }) //
    .then(mapOptionalUser);
  // return users.find((v) => v.username === username);
};

export const createUser = async (user) => {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());

  // const created = { ...user, id: Date.now().toString() };
  // console.log(created);
  // users.push(created);
  // return created.id;
};

export const findById = async (id) => {
  return getUsers()
    .findOne({ _id: new ObjectId(id) }) //
    .then(mapOptionalUser);
  // return users.find((v) => v.id === id);
};

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id } : user;
}
