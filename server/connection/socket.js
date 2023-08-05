import { Server } from 'socket.io';
import { config } from '../config.js';
import jwt from 'jsonwebtoken';

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: { origin: config.cors.allowedOrigin },
    });

    this.io.use((socket, next) => {
      // client에서 요청이 들어올때 그 요청의 token을 아래의 코드로 받는다
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error('Authentication error'));
        }
        next();
      });

      next();
    });

    this.io.on('connection', (socket) => {
      console.log('Socket client connected');
    });
  }
}

let socket;

// 소켓 생성하기
export function initSocket(server) {
  // socket의 instance를 딱 한번만 만들기 싱글톤 패턴
  if (!socket) {
    socket = new Socket(server);
  }
}

// 소켓 가져다 쓰기
export function getSocketIO() {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.io;
}
