import FormValidator from "./formValidator.js";

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
const editProfileForm = document.querySelector("#modal-form-edit-profile");
const addCardForm = document.querySelector("#modal-form-add-card");
const inputName = document.querySelector("#modal__input-name");
const inputAbout = document.querySelector("#modal__input-about");

const profileName = document.querySelector("#profile__name");
const profileAbout = document.querySelector("#profile__about");

const modalOverlay = document.querySelector("#modal-overlay");

const closeModalFigureButton = document.querySelector(
  "#modal__close-figure-button"
);

function createInitialCards() {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

editButton.addEventListener("click", () => {
  modal.classList.add("popup__opened");
  body.classList.add("stop-scroll");
  modalBox.style.display = "block";
  modalFigure.style.display = "none";
  addCardForm.style.display = "none";
  editProfileForm.style.display = "flex";
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  addCloseModalEventListener();
});

addCardButton.addEventListener("click", () => {
  modal.classList.add("popup__opened");
  body.classList.add("stop-scroll");
  modalBox.style.display = "block";
  modalFigure.style.display = "none";
  addCardForm.style.display = "flex";
  editProfileForm.style.display = "none";
  addCloseModalEventListener();
});

closeModalBoxButton.addEventListener("click", () => {
  closeModal();
});

closeModalFigureButton.addEventListener("click", () => {
  closeModal();
});

createInitialCards();

// Validation
const formList = Array.from(document.querySelectorAll(".modal__form"));
formList.forEach((formElement) => {
  const newValidator = new FormValidator(formElement, {
    input: ".modal__input",
    buttons: ".modal__button",
  });
  newValidator.enableValidation();
});
