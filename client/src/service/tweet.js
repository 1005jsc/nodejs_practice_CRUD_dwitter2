export default class TweetService {
  tweets = [
    {
      id: 1,
      text: '드림코딩에서 강의 들으면 너무 좋으다',
      createdAt: '2021-05-09T04:20:57.000Z',
      name: 'Bob',
      username: 'bob',
      url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
  ];

  constructor(http) {
    this.http = http;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';

    return this.http.fetch(`/tweets${query}`, { method: 'GET' });

    // const data = await response.json();
    // if (response.status !== 200) {
    //   throw new Error(data.message);
    // }
    // return data;
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: 'POST',

      body: JSON.stringify({
        text,
        username: 'ellie',
        name: 'Ellie',
      }),
    });

    // const data = await response.json();
    // if (response.status !== 201) {
    //   throw new Error(data.message);
    // }
    // return data;
  }

  async deleteTweet(tweetId) {
    console.log(tweetId);
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
    });

    // if (response.status !== 204) {
    //   throw new Error();
    // }
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',

      body: JSON.stringify({
        text,
      }),
    });

    // const data = await response.json();
    // if (response.status !== 200) {
    //   throw new Error(data.message);
    // }
    // return data;
  }
}
