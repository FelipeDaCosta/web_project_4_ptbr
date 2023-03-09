import {
  openFigureModal,
  likeCard,
  getCurrentUserId,
  unlikeCard,
} from "../utils.js";

const cardTemplateId = "#element-template";

export default class Card {
  constructor(name, link, deleteFn, cardId, likesArr = [], ownerId) {
    this._name = name;
    this._link = link;
    this._htmlElement = null;
    this._cardId = cardId;
    this._ownerId = ownerId;
    console.log(this._ownerId);

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

    const likeCounter = this._htmlElement.querySelector(
      ".element__like-counter"
    );
    this._htmlElement
      .querySelector(".element__like-button")
      .addEventListener("click", (evt) => {
        if (this._currentUserLiked) {
          unlikeCard(this._cardId);
          evt.target.classList.remove("element__like-active");
          this._likes -= 1;
        } else {
          likeCard(this._cardId);
          evt.target.classList.add("element__like-active");
          this._likes += 1;
        }
        if (this._likes > 0) {
          likeCounter.textContent = this._likes;
        } else {
          this._likes = 0;
          likeCounter.textContent = "";
        }
      });

    this._htmlElement
      .querySelector(".element__trash-bin")
      .addEventListener("click", (evt) =>
        this._deleteFn(evt.target, this._cardId)
      );
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

    if (this._ownerId !== getCurrentUserId()) {
      newElement.querySelector(".element__trash-bin").remove();
    }

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
