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

// MVC의 Model(data)부분 옮겨주기

// 내가 어떤 데이터가 있는지는 모델에서 가장 잘 알기때문에
// 이 로직은  모델에 있어야 한다

// 처음에 이름을 getAllTweets 이렇게 만들고
// controller 에서 TweetRepository.getAllTweets
// 이런식으로 불러왔었는데
// 'Tweet' 이 중복되는 것 같아서 뒤에있는 함수들의 tweets를 전부 뺴버렸다

// TweetRepository.getAllTweets -> TweetRepository.getAll

export const getAll = async () => {
  return tweets;
};

export const getAllByUsername = async (username) => {
  return tweets.filter((v) => v.username === username);
};

export const getById = async (id) => {
  return tweets.find((t) => t.id == id);
};

export const create = async (text, name, username) => {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };

  tweets = [tweet, ...tweets];

  return tweet;
};

export const update = async (id, text) => {
  const tweet = tweets.find((t) => t.id === id);

  if (tweet) {
    tweet.text = text;
  }

  return tweet;
};

export const remove = async (id) => {
  tweets = tweets.filter((t) => t.id != id);
};
