import socket from 'socket.io-client';

export default class Socket {
  constructor(baseURL, getAccessToken) {
    console.log(getAccessToken());

    this.io = socket(baseURL, {
      // query를 통해 token을 전달해줄 수는 있다
      // 근데 query 는 맘먹으면 다 뺴갈 수 있다
      // 그래서 auth를 사용해야 한다
      // https://socket.io/docs/v4/middlewares#sending-credentials
      // 공식사이트 한번 볼래?
      // (cb) => cb({token}) 은 특이한 이유가 있는 것은 아니고 그냥 함수로 리턴하는듯
      // 똑 같다
      auth: (cb) =>
        cb({
          token: getAccessToken(),

          //   reconnection: false,
          //   tranports: ['websocket'],
        }),
    });

    this.io.on('connect_error', (err) => {
      console.log('socket error', err.message);
    });
  }

  // onSync :  event를 커스텀하게 만들 수 있도록 함
  onSync = (event, callback) => {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message) => callback(message));
    // 나중에 const stopSync = 라고 쓰기위하여 거기에 () => this.io.off(event)가 들어있는거다
    // Tweets.jsx
    return () => this.io.off(event);
  };
}
