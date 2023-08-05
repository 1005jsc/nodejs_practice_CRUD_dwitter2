export default class AuthService {
  // 4. 모든 service에서  tokenStorage관련된 것들 다 지우기
  // token은 client의 메모리에 저장이 된다

  constructor(http) {
    this.http = http;
  }

  async signup(username, password, name, email, url) {
    return await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    });
    //   this.tokenStorage.saveToken(data.token);
    //   return data;
  }

  async login(username, password) {
    return await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    // this.tokenStorage.saveToken(data.token);
    // return data;
  }

  async me() {
    // const token = this.tokenStorage.getToken();
    return this.http.fetch('/auth/me', {
      method: 'GET',
      // headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    // TODO(재신)
    this.tokenStorage.clearToken();
  }
}
