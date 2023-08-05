export default class AuthService {
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
  }

  async login(username, password) {
    return await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async me() {
    return this.http.fetch('/auth/me', {
      method: 'GET',
    });
  }

  // 프론트에서는 '로그아웃'만 보내주면 된다

  async logout() {
    return await this.http.fetch('/auth/logout', {
      method: 'POST',
    });
  }
}
