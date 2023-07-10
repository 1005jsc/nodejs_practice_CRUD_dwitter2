class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // const data = await response.json()
    // 보통 이렇게 훈련이 되어서 이런식으로 바로 코드가 나갈 것 같은데
    // 만약 response가 undefined 라면 에러가 터지기 때문에 아래와 같이 바꾼다

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error(error);
    }

    // 200이 안뜨는 경우도 처리해줘야함
    if (response.status > 299 || response.status < 200) {
      const message = data && data.message ? data.message : 'Something went wrong...';

      throw new Error(message);
    }

    return data;
  }
}

export default HttpClient;
