import FormValidator from "./formValidator.js";
import PopupWithForm from "./popupWithForm.js";
import Section from "./section.js";

import {
  addCard,
  addCloseModalEventListener,
  closeModal,
  handleAddCardSubmit,
  handleProfileFormSubmit,
  initialCards,
} from "./utils.js";

const body = document.querySelector(".body");
const modal = document.querySelector(".modal");
const editButton = document.querySelector("#edit-button");
const addCardButton = document.querySelector("#add-card-button");

const modalBox = document.querySelector("#modal__box");
const modalFigure = document.querySelector("#modal__figure");

const closeModalBoxButton = document.querySelector("#modal__close-box-button");
const inputName = document.querySelector("#modal__input-name");
const inputAbout = document.querySelector("#modal__input-about");

const profileName = document.querySelector("#profile__name");
const profileAbout = document.querySelector("#profile__about");

const modalOverlay = document.querySelector("#modal-overlay");

const closeModalFigureButton = document.querySelector(
  "#modal__close-figure-button"
);

const section = new Section({
  items: initialCards,
  renderer: (card) => addCard(card.name, card.link),
});

section.renderer();

const editProfileForm = new PopupWithForm(
  ".modal",
  handleProfileFormSubmit,
  "#modal-form-edit-profile"
);

editProfileForm.setEventListeners();

const addCardForm = new PopupWithForm(
  ".modal",
  handleAddCardSubmit,
  "#modal-form-add-card"
);

addCardForm.setEventListeners();

editButton.addEventListener("click", () => {
  modal.classList.add("popup__opened");
  body.classList.add("stop-scroll");
  modalBox.style.display = "block";
  modalFigure.style.display = "none";
  addCardForm.hide();
  editProfileForm.show();
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  addCloseModalEventListener();
});

addCardButton.addEventListener("click", () => {
  modal.classList.add("popup__opened");
  body.classList.add("stop-scroll");
  modalBox.style.display = "block";
  modalFigure.style.display = "none";
  addCardForm.show();
  editProfileForm.hide();
  addCloseModalEventListener();
});

// Validation
const formList = Array.from(document.querySelectorAll(".modal__form"));
formList.forEach((formElement) => {
  const newValidator = new FormValidator(formElement, {
    input: ".modal__input",
    buttons: ".modal__button",
  });
  newValidator.enableValidation();
});
