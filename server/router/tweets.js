import express from 'express';
import 'express-async-errors';

let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    text: '안뇽',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'ellie',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

const router = express.Router();

// GET /tweets , /tweets?username=:username

router.get('/', (req, res, next) => {
  const username = req.query.username;
  const data = username ? tweets.filter((v) => v.username === username) : tweets;
  res.status(200).json(data);
});

// GET /tweets/:id

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  const tweet = tweets.find((t) => t.id == id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    // res.sendStatus(404) // 근데 이건 url을 찾을 수 없을때 사용하는 거와 겹치기 떄문에 아래와 같이 쓰는것이 좋을 듯
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// POST /tweets

router.post('/', (req, res, next) => {
  // 1. 상단에는 필요한 변수들을 정의해줌
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };

  tweets = [tweet, ...tweets];
  // 200 : 성공이다, 201 : '성공적으로 만들어졌다'
  res.status(201).json(tweet);
});

// PUT /tweets/:id

router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  const text = req.body.text;

  const tweet = tweets.find((t) => t.id === id);

  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((t) => t.id != id);
  res.sendStatus(204);
});

export default router;

//
