import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export const signup = async (req, res) => {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);

  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  const hashed = await bcrypt.hash(password, parseInt(config.bcrypt.saltRounds));

  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });

  // 1.
  // 지금 이 코드는 jwt를 body에 보내주고 있는 것임
  // 이제는 jwt를 body가 아니라 header에 보내주게하기 http only해서 cookie를 이용할거임
  // 근데 cookie라고 보내면 브라우저가 아닌 다른 client(모바일)같은 것들은 사용할 수 없게됨
  // 그래서 body에 보내는 건 여전히 둘거임
  const token = createJwtToken(userId);
  setToken(res, token);
  res.status(201).json({ token, username });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(user.id);
  setToken(res, token);
  res.status(200).json({ token, username });
};

export const me = async (req, res, next) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
};

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}

function setToken(res, token) {
  const options = {
    httpOnly: true,
    // 2.
    // 서버와 클라이언트가 같은 도메인이 아니더라도 http only가 동작할 수 있게 설정 cors와 비슷하게
    sameSite: 'none',
    // 다만 sameSite: 'none'으로 등록했다면 아래의 secure를 true로 줘야한다
    secure: true,
    // 그리고 만료시간도 넣어야한다 만료시간이 지나면 브라우저가 쿠키를 파괴해준다
    maxAge: config.jwt.expiresInSec * 1000,
  };

  res.cookie('token', token, options);
}
