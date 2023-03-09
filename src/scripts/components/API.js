export default class Api {
  constructor(options) {
    this._baseHeader = options.headers;
    this._baseUrl = options.baseUrl;
  }

  _makeRequest(endpoint, method = "GET", body = "") {
    const requestParams = {
      method: method,
      headers: this._baseHeader,
    };
    if (body != "") {
      requestParams.body = body;
    }
    return fetch(this._baseUrl + endpoint, requestParams)
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => err);
  }

  getUserInfo() {
    return this._makeRequest("/users/me").then((data) => data);
  }

  setUserInfo(name, about) {
    return this._makeRequest(
      "/users/me",
      "PATCH",
      JSON.stringify({ name, about })
    ).then((data) => data);
  }

  setUserPfp(link) {
    return this._makeRequest(
      "/users/me/avatar",
      "PATCH",
      JSON.stringify({ avatar: link })
    ).then((data) => data);
  }

  likeCard(cardId) {
    return this._makeRequest("/cards/likes/" + cardId, "PUT").then(
      (data) => data
    );
  }

  getCards() {
    return this._makeRequest("/cards").then((data) => data);
  }

  addCard(name, link) {
    return this._makeRequest(
      "/cards",
      "POST",
      JSON.stringify({ name, link })
    ).then((data) => data);
  }
}
