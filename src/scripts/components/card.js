import { OpenFigureModal } from "../utils.js";

const cardTemplateId = "#element-template";

export default class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
    this._htmlElement = null;
  }

  _addCardEvents() {
    if (!this._htmlElement)
      throw Error("Attempted adding event to null card element");

    this._htmlElement
      .querySelector(".element__photo")
      .addEventListener("click", () => OpenFigureModal(this._link, this._name));

    this._htmlElement
      .querySelector(".element__like-button")
      .addEventListener("click", (evt) =>
        evt.target.classList.toggle("element__like-active")
      );

    this._htmlElement
      .querySelector(".element__trash-bin")
      .addEventListener("click", (evt) => evt.target.parentElement.remove());
  }

  _createTemplate() {
    const templateContent = document.querySelector(cardTemplateId).content;
    const newElement = templateContent.cloneNode(true);
    newElement.querySelector(".element__name").textContent = this._name;
    newElement.querySelector(".element__photo").src = this._link;
    newElement.querySelector(".element__photo").alt = this._name;

    this._htmlElement = newElement;

    this._addCardEvents();
  }

  getCardElement() {
    if (!this._htmlElement) {
      this._createTemplate();
    }
    return this._htmlElement;
  }
}
