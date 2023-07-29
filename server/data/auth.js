import SQ from 'sequelize';
import { db, sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT,
  },
  { timestamps: false }
);

export const getAllUsers = async () => {
  // return users;
  return db.execute('SELECT * FROM users').then((result) => result[0][0]);
};

export const findByUsername = async (username) => {
  return User.findOne({ where: { username } });

  // return users.find((v) => v.username === username);

  // return db.execute('SELECT * FROM users WHERE username=?', [username]).then((result) => {
  //   return result[0][0];
  // });
};

export const findById = async (id) => {
  return User.findByPk(id);
  // return users.find((v) => v.id === id);
  // return db.execute('SELECT * FROM users WHERE id=?', [id]).then((result) => result[0][0]);
};

export const createUser = async (user) => {
  return User.create(user).then((data) => {
    console.log(data);
    return data.dataValues.id;
  });

  // const { username, password, name, email, url } = user;

  // return db
  //   .execute('INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)', [
  //     username,
  //     password,
  //     name,
  //     email,
  //     url,
  //   ])
  //   .then((result) => result[0].insertId);
};
