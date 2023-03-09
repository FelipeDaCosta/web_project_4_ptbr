import Card from "./components/Card.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/API.js";

const modal = document.querySelector(".modal");
const body = document.querySelector(".body");

const userPfp = document.querySelector("#user-profile-picture");

const modalBox = document.querySelector("#modal__box");
const modalFigure = document.querySelector("#modal__figure");

const inputCardTitle = document.querySelector("#modal__input-title");
const inputCardPhoto = document.querySelector("#modal__input-photo");

const inputName = document.querySelector("#modal__input-name");
const inputAbout = document.querySelector("#modal__input-about");

const modalOverlay = document.querySelector("#modal-overlay");

const elementsList = document.querySelector(".elements");

const popupWithImage = new PopupWithImage(".modal");

const userInfo = new UserInfo("Jacques Cousteau", "Explorar");

export const API = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_cohort_02",
  headers: {
    authorization: "0b4ce9f6-4f44-414d-99c2-e403584baa6e",
    "Content-Type": "application/json",
  },
});

export function addCard(name, link, deleteFn, cardId, likesArr) {
  const newElement = new Card(name, link, deleteFn, cardId, likesArr);
  elementsList.prepend(newElement.getCardElement());
}

export function openFigureModal(link, name) {
  popupWithImage.open({ name: name, link: link });
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo({ name: inputName.value, about: inputAbout.value });
  API.setUserInfo(inputName.value, inputAbout.value);
  body.classList.remove("stop-scroll");
  modal.classList.remove("popup__opened");
}

export function getUserInfo() {
  return userInfo.getUserInfo();
}

export function setUserInfo(name, about, id = undefined, pfp = "") {
  userInfo.setUserInfo({ name, about, id });
  if (pfp) {
    const userPfp = document.querySelector("#user-profile-picture");
    userPfp.src = pfp;
  }
}

export function handleAddCardSubmit(evt) {
  evt.preventDefault();

  addCard(inputCardTitle.value, inputCardPhoto.value);
  API.addCard(inputCardTitle.value, inputCardPhoto.value);
  body.classList.remove("stop-scroll");
  modal.classList.remove("popup__opened");
}

export function handlePfpChange(evt) {
  evt.preventDefault();
  const newPfp = document.querySelector("#user-pfp-input").value;

  userPfp.src = newPfp;
  API.setUserPfp(newPfp);
  body.classList.remove("stop-scroll");
  modal.classList.remove("popup__opened");
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

function closeModalOverlay(evt) {
  if (evt.target === modalOverlay) {
    closeModal();
  }
}

export function addCloseModalEventListener() {
  modalOverlay.addEventListener("click", closeModalOverlay);
  document.addEventListener("keydown", closeModalEsc);
}

function removeCloseModalEventListener() {
  modalOverlay.removeEventListener("click", closeModalOverlay);
  document.removeEventListener("keydown", closeModalEsc);
}

export function closeModal() {
  body.classList.remove("stop-scroll");
  modal.classList.remove("popup__opened");
  removeCloseModalEventListener();
}

export function getInitialCards() {
  return API.getCards();
}

export function likeCard(cardId) {
  return API.likeCard(cardId);
}

export function getCurrentUserId() {
  return userInfo.getId();
}
