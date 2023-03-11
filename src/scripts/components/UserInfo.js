/**
 * Classe que guarda as informações do usuário logado
 */
export default class UserInfo {
  constructor(name, about, id = undefined) {
    this._name = name;
    this._about = about;

    this._id = id;

    this._profileName = document.querySelector("#profile__name");
    this._profileAbout = document.querySelector("#profile__about");
  }

  getUserInfo() {
    return { name: this._name, about: this._about };
  }

  getId() {
    return this._id;
  }

  setUserInfo({ name, about, id = undefined }) {
    this._name = name;
    this._about = about;
    this._id = id;

    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }
}
