export default class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;

    this._profileName = document.querySelector("#profile__name");
    this._profileAbout = document.querySelector("#profile__about");
  }

  getUserInfo() {
    return { name: this._name, about: this._about };
  }

  setUserInfo({ name, about }) {
    this._name = name;
    this._about = about;

    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }
}
