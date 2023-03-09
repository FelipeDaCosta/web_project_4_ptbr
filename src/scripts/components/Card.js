import {
  openFigureModal,
  openDeleteModal,
  likeCard,
  getCurrentUserId,
} from "../utils.js";

const cardTemplateId = "#element-template";

export default class Card {
  constructor(name, link, deleteFn, cardId, likesArr = []) {
    this._name = name;
    this._link = link;
    this._htmlElement = null;
    this._cardId = cardId;

    this._deleteFn = deleteFn;
    this._likesArr = likesArr;
    this._currentUserLiked = this._likesArr.find(
      (user) => user._id == getCurrentUserId()
    );
    this._likes = this._likesArr.length;
  }

  _addCardEvents() {
    if (!this._htmlElement)
      throw Error("Attempted adding event to null card element");

    this._htmlElement
      .querySelector(".element__photo")
      .addEventListener("click", () => openFigureModal(this._link, this._name));

    this._htmlElement
      .querySelector(".element__like-button")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__like-active");
        likeCard(this._cardId);
      });

    this._htmlElement
      .querySelector(".element__trash-bin")
      .addEventListener("click", (evt) => this._deleteFn(evt.target));
  }

  _createTemplate() {
    const templateContent = document.querySelector(cardTemplateId).content;
    const newElement = templateContent.cloneNode(true);
    newElement.querySelector(".element__name").textContent = this._name;
    newElement.querySelector(".element__photo").src = this._link;
    newElement.querySelector(".element__photo").alt = this._name;
    if (this._likes > 0) {
      newElement.querySelector(".element__like-counter").textContent =
        this._likes;
      if (this._currentUserLiked) {
        newElement
          .querySelector(".element__like-button")
          .classList.add("element__like-active");
      }
    }

    this._htmlElement = newElement;

    this._addCardEvents();
  }

  like() {
    this._likes += 1;
    newElement.querySelector(".element__like-counter").textContent =
      this._likes;
  }

  unlike() {
    this._likes -= 1;
    if (this._likes) {
      newElement.querySelector(".element__like-counter").textContent =
        this._likes;
    }
  }

  getCardElement() {
    if (!this._htmlElement) {
      this._createTemplate();
    }
    return this._htmlElement;
  }
}
