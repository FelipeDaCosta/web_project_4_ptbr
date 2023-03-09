import "../style/index.css";

import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";

import Api from "./components/API.js";

import {
  API,
  addCard,
  addCloseModalEventListener,
  getUserInfo,
  handleProfileFormSubmit,
  initialCards,
  setUserInfo,
  getInitialCards,
  handlePfpChange,
  getCurrentUserId,
  deleteCard,
} from "./utils.js";

const body = document.querySelector(".body");
const modal = document.querySelector(".modal");
const editButton = document.querySelector("#edit-button");
const addCardButton = document.querySelector("#add-card-button");
const changePfpButton = document.querySelector("#profile__picture-wrapper");

const modalBox = document.querySelector("#modal__box");
const modalFigure = document.querySelector("#modal__figure");

const inputName = document.querySelector("#modal__input-name");
const inputAbout = document.querySelector("#modal__input-about");

const inputCardTitle = document.querySelector("#modal__input-title");
const inputCardPhoto = document.querySelector("#modal__input-photo");

const editProfileForm = new PopupWithForm(
  ".modal",
  handleProfileFormSubmit,
  "#modal-form-edit-profile"
);

let cardTobeDeleted = undefined;

editProfileForm.setEventListeners();

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  API.addCard(inputCardTitle.value, inputCardPhoto.value)
    .then((card) => {
      addCard(
        inputCardTitle.value,
        inputCardPhoto.value,
        openDeleteModal,
        card._id,
        card.likes,
        card.owner?._id
      );
    })
    .catch((err) => console.log(err))
    .finally(() => {
      body.classList.remove("stop-scroll");
      modal.classList.remove("popup__opened");
    });
}

const addCardForm = new PopupWithForm(
  ".modal",
  handleAddCardSubmit,
  "#modal-form-add-card"
);

addCardForm.setEventListeners();

function handleDeleteCard(evt) {
  evt.preventDefault();
  deleteCard(cardTobeDeleted.id);
  const selectedCard = cardTobeDeleted.element;
  selectedCard.parentElement.remove();
  cardTobeDeleted = undefined;
  body.classList.remove("stop-scroll");
  modal.classList.remove("popup__opened");
  deleteConfirmForm.hide();
}

const deleteConfirmForm = new PopupWithForm(
  ".modal",
  handleDeleteCard,
  "#modal__delete-confirm"
);

deleteConfirmForm.setEventListeners();

const changePfpForm = new PopupWithForm(
  ".modal",
  handlePfpChange,
  "#modal__change-pfp"
);

changePfpForm.setEventListeners();

editButton.addEventListener("click", () => {
  modal.classList.add("popup__opened");
  body.classList.add("stop-scroll");
  modalBox.style.display = "block";
  modalFigure.style.display = "none";
  addCardForm.hide();
  deleteConfirmForm.hide();
  changePfpForm.hide();
  editProfileForm.show();
  const { name, about } = getUserInfo();
  inputName.value = name;
  inputAbout.value = about;
  addCloseModalEventListener();
});

addCardButton.addEventListener("click", () => {
  modal.classList.add("popup__opened");
  body.classList.add("stop-scroll");
  modalBox.style.display = "block";
  modalFigure.style.display = "none";
  addCardForm.show();
  editProfileForm.hide();
  deleteConfirmForm.hide();
  changePfpForm.hide();
  addCloseModalEventListener();
});

function openDeleteModal(card, cardId) {
  modal.classList.add("popup__opened");
  body.classList.add("stop-scroll");
  modalBox.style.display = "block";
  modalFigure.style.display = "none";
  addCardForm.hide();
  editProfileForm.hide();
  changePfpForm.hide();
  deleteConfirmForm.show();
  cardTobeDeleted = { element: card, id: cardId };
  addCloseModalEventListener();
}

changePfpButton.addEventListener("click", (evt) => {
  modal.classList.add("popup__opened");
  body.classList.add("stop-scroll");
  modalBox.style.display = "block";
  modalFigure.style.display = "none";
  addCardForm.hide();
  editProfileForm.hide();
  changePfpForm.show();
  deleteConfirmForm.hide();
  addCloseModalEventListener();
});

// Validation
const formList = document.querySelectorAll(".modal__form");
formList.forEach((formElement) => {
  const newValidator = new FormValidator(formElement, {
    input: ".modal__input",
    buttons: ".modal__button",
  });
  newValidator.enableValidation();
});

API.getUserInfo().then((data) => {
  const { name, about, avatar, _id } = data;
  setUserInfo(name, about, _id, avatar);
  getInitialCards().then((initialCards) => {
    const section = new Section({
      items: initialCards,
      renderer: (card) =>
        addCard(
          card.name,
          card.link,
          openDeleteModal,
          card._id,
          card.likes,
          card.owner?._id
        ),
    });

    section.renderer();
  });
});
