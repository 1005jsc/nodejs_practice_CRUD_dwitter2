// import mysql from 'mysql2';
import { config } from '../config.js';
import SQ from 'sequelize';

const { host, user, database, password } = config.db;

export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  logging: false,
});

// const pool = mysql.createPool({
//   host,
//   user,
//   database,
//   password,
// });

// // 비동기버젼을 실행하고 싶으니까 pool의 promise버젼을 사용
// export const db = pool.promise();
