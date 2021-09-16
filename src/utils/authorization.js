class Authorization {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._a = 'dsfsdfs';
  }
  /**
   * метод отправки запроса регистрации
   * @param {{email, password}}} data 
   * @returns Promise
   */
  signUp ({email, password}) {
    return fetch(`${this._url}/signup`,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(this._resolve)
  }
  /**
   * signIn метод отправки запроса авторизации
   */
  signIn ({email, password}) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(this._resolve);
  }
  /**
   * 
   */
  checkUser({jwt}) {
    const headers = Object.assign(this._headers);
    headers['Authorization'] = `Bearer ${jwt}`;
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers
    })
    .then(this._resolve);
  }
  _resolve(response) {
    if(response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`)
  }
}

const auth = new Authorization({url: 'https://auth.nomoreparties.co', headers: {
  "Content-Type": "application/json" 
  }
}, 'test');

export default auth;