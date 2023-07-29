import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import devRouter from './router/dev.js';
import { config } from './config.js';
import { Server } from 'socket.io';
import { initSocket } from './connection/socket.js';
import { connectDB } from './database/database.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);
app.use('/dev', devRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then((db) => {
    console.log('init');

    const server = app.listen(config.host.port);

    initSocket(server);
  })
  .catch(console.error);

// const socketIO = new Server(server, {
//   cors: { origin: '*' },
// });

// socketIO.on('connection', (socket) => {
//   console.log('client is here');
//   console.log(socket);
//   socketIO.emit('dwitter', 'Hello ~!');
//   socketIO.emit('dwitter', 'Hello ~!');
// });
