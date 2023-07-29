import { sequelize } from '../db/database.js';
import * as userRepository from './auth.js';

import SQ from 'sequelize';

const DataTypes = SQ.DataTypes;

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(userRepository.User);

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [SQ.Sequelize.col('user.name'), 'name'],
    [SQ.Sequelize.col('user.username'), 'username'],
    [SQ.Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: userRepository.User,
    attributes: [],
  },
};
const ORDER_DESC = { order: [['createdAt', 'DESC']] };

export const getAll = async () => {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });

  // return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);

  // return Promise.all(
  //   tweets.map(async (tweet) => {
  //     const { username, name, url } = await userRepository.findById(tweet.userId);
  //     return { ...tweet, username, name, url };
  //   })
  // );
};

export const getAllByUsername = async (username) => {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  });

  // return db
  //   .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
  //   .then((result) => result[0]);
  // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
};

export const getById = async (id) => {
  return Tweet.findOne({ where: { id }, ...INCLUDE_USER });

  // return db.execute(`${SELECT_JOIN} WHERE tw.id=? `, [id]).then((result) => result[0][0]);
  // const found = tweets.find((tweet) => tweet.id === id);
  // const yo = await userRepository.getAllUsers();
  // if (!found) {
  //   return null;
  // }
  // const yo2 = await userRepository.findById(found.userId);
  // const { username, name, url } = yo2;
  // return { ...found, username, name, url };
};

export const create = async (text, userId) => {
  return Tweet.create({ text, userId }).then((data) => getById(data.dataValues.id));

  // return db
  //   .execute(`INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)`, [
  //     text,
  //     new Date(),
  //     userId,
  //   ])
  //   .then((result) => getById(result[0].insertId));

  // const user = await userRepository.findByUsername(username);

  // const tweet = {
  //   id: Date.now().toString(),
  //   text,
  //   createdAt: new Date().toString(),
  //   userId: user.id,
  // };

  // tweets = [tweet, ...tweets];
  // return getById(tweet.id);
};

export const update = async (id, text) => {
  return Tweet.findByPk(id, INCLUDE_USER) //
    .then((tweet) => {
      tweet.text = text;
      return tweet.save();
    });
  // return db
  //   .execute('UPDATE tweets SET text=? WHERE id=?', [text, id]) //
  //   .then(() => getById(id));
  // const tweet = await getById(id);
  // tweets = [
  //   ...tweets.filter((v) => v.id !== id),
  //   {
  //     ...tweet,
  //     text,
  //   },
  // ];
  // return {
  //   ...tweet,
  //   text,
  // };
};

export const remove = async (id) => {
  return Tweet.findByPk(id) //
    .then((tweet) => {
      tweet.destroy();
    });

  // return db.execute('DELETE FROM tweets WHERE id=?', [id]);
  // tweets = tweets.filter((t) => t.id != id);
};
