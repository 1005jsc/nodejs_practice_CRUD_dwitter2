import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import TweetService from './service/tweet';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, fetchToken } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';
import HttpClient from './network/http';

import { io } from 'socket.io-client';
import Socket from './network/socket';

// 1. db 폴더의 token.js를 날려버렸다

// 2. index.js에 와서 tokenStorage관련 코드들을 다 지운다

const baseURL = process.env.REACT_APP_BASE_URL;

const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, authErrorEventBus);
const authService = new AuthService(httpClient);

// 6. 이제 토큰을 메모리에 보관한다 보안에 안전!

const socketClient = new Socket(baseURL, () => fetchToken());

const tweetService = new TweetService(httpClient, socketClient);

const socketIO = io(baseURL);

socketIO.on('connect_error', (err) => {
  console.log('socket error', err);
});

socketIO.on('dwitter', (msg) => console.log(msg));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
