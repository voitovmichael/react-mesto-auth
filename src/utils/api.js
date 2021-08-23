import {token} from './constants'

class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(this._resolve);
  }

  getCards(url) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(this._resolve);
  }

  changeUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._resolve);
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._resolve);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })    
    .then(this._resolve);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._resolve);
  }

  changeLike(id, isLike) {
    const method = isLike ? 'PUT' : 'DELETE';
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: method,
      headers: this._headers
    })
    .then(this._resolve);
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._resolve);
  }

  addLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
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

const api = new Api({url: 'https://mesto.nomoreparties.co/v1/cohort-23', headers: {
  authorization: token,
  'Content-Type': 'application/json'
}});

export default api