import { db } from '../db/database.js';

export const getAllUsers = async () => {
  // return users;
  return db.execute('SELECT * FROM users').then((result) => result[0][0]);
};

export const findByUsername = async (username) => {
  // return users.find((v) => v.username === username);

  return db.execute('SELECT * FROM users WHERE username=?', [username]).then((result) => {
    return result[0][0];
  });
};

export const findById = async (id) => {
  // return users.find((v) => v.id === id);
  return db.execute('SELECT * FROM users WHERE id=?', [id]).then((result) => result[0][0]);
};

export const createUser = async (user) => {
  const { username, password, name, email, url } = user;

  return db
    .execute('INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)', [
      username,
      password,
      name,
      email,
      url,
    ])
    .then((result) => result[0].insertId);
};
