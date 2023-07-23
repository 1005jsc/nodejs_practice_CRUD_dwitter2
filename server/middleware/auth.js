import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = { message: 'Authentication Error' };

// 유저의 토큰이 유용한가를 확인해주는 미들웨어(이걸 유효성 판단이라고 한다 )

// 이 isAuth는 앞으로 유저가 보내는 대부분의 요청에 이걸 middleward로 끼워 넣어서 토큰 판별을 할 것 이다

export const isAuth = async (req, res, next) => {
  // * header에 받는 값은 req.get으로 받아온다 (참고로 body값은 req.body이다 )
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }

    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }

    // * 아.. 이런식으로 req에 변수를 추가해서
    // 다음으로 넘겨줄 수 있다
    req.userId = user.id;
    next();
  });
};
