// 이제 사용자의 모든 유저정보는 auth 에 있다
// 기존의 tweets에는 name, username과 같은 유저의 정보들이 들어있었는데
// 이는 꽤 좋지 않다
// 중복이니까 지워줘야하는 것은둘째치고
// 같은 의미를 나타내는 정보가 두 개 이상이면 나중에 어느것이 옳은 정보인지 알 수 없을 수가 있다 .

// tweets에는 userId만을 넣고

// 물론 tweets라는 데이터를 가져오는 로직도 새로 바뀐 tweets에 맞춰서 모두 바꾼다

// let tweets = [
//   {
//     id: '1',
//     text: '드림코더분들 화이팅',
//     createdAt: new Date().toString(),
//     name: 'Bob',
//     username: 'bob',
//     // url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
//   },
//   {
//     id: '2',
//     text: '안뇽',
//     createdAt: new Date().toString(),
//     name: 'Bob',
//     username: 'ellie',
//     // url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
//   },
// ];

import * as userRepository from './auth.js';

let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '안뇽',
    createdAt: new Date().toString(),
    userId: '1',
  },
];

export const getAll = async () => {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(tweet.userId);
      return { ...tweet, username, name, url };
    })
  );
};

export const getAllByUsername = async (username) => {
  return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
};

export const getById = async (id) => {
  const found = tweets.find((tweet) => tweet.id === id);

  const yo = await userRepository.getAllUsers();

  if (!found) {
    return null;
  }

  const yo2 = await userRepository.findById(found.userId);

  const { username, name, url } = yo2;
  return { ...found, username, name, url };
};

export const create = async (text, name, username) => {
  console.log(username);

  const user = await userRepository.findByUsername(username);

  console.log(user);

  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date().toString(),
    userId: user.id,
  };

  tweets = [tweet, ...tweets];
  return getById(tweet.id);
};

export const update = async (id, text) => {
  const tweet = await getById(id);
  tweets = [
    ...tweets.filter((v) => v.id !== id),
    {
      ...tweet,
      text,
    },
  ];

  return {
    ...tweet,
    text,
  };
};

export const remove = async (id) => {
  tweets = tweets.filter((t) => t.id != id);
};
