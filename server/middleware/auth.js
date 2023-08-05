import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  // * header에 받는 값은 req.get으로 받아온다 (참고로 body값은 req.body이다 )

  // 4.
  // 이제 쿠키를 보내주는 로직은 다 만들었으니 쿠키를 받는 로직을 만들 차례이다
  // 두가지 경우에 대해 생각한다
  // 1. cookie 검사하기 : 브라우저에서 오는 경우
  // 2. header 검사하기 : 브라우저 이외의 요청일 경우 여전히 header를 검사해 줘야한다

  let token;

  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // 5. 실제 로직 만들기
    // 일단 받아오는 authHeader에 토큰을 까본다
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    // header에 토큰이 없다면 그러면 쿠키를 봐본다
    token = req.cookies['token'];
  }

  if (!token) {
    // 쿠키에도 없다면 그러면 그때 AUTH_ERROR를 리턴한다
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }

    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }

    req.userId = user.id;
    req.token = token;
    next();
  });
};
