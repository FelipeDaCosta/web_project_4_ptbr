class Api {
  constructor() {
    this._baseUrl = "https://around.nomoreparties.co";
    this._fetchParams = { headers: { authorization: "auth-token" } };
  }

  _makeRequest(callback) {
    return fetch(this._baseUrl, this._fetchParams)
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => callback(data))
      .catch((err) => err);
  }
}
