import mysql from 'mysql2';
import { config } from '../config.js';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

// 비동기버젼을 실행하고 싶으니까 pool의 promise버젼을 사용
export const db = pool.promise();
