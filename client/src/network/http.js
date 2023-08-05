export default class HttpClient {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  // 3. 여기에만 업데이트 해주면 됨
  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // 브라우저가 httponly를 읽게하려면 credentials: 'include'을 넣어주면 된다
      // 이제 fetch를 지나면 알아서 cookie에 저장시켜준다
      credentials: 'include',
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message = data && data.message ? data.message : 'Something went wrong! 🤪';
      const error = new Error(message);

      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }
      throw error;
    }
    return data;
  }
}
