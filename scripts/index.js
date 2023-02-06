import Card from "./card.js";
import FormValidator from "./formValidator.js";

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
const inputCardTitle = document.querySelector("#modal__input-title");
const inputCardPhoto = document.querySelector("#modal__input-photo");

const profileName = document.querySelector("#profile__name");
const profileAbout = document.querySelector("#profile__about");

const modalOverlay = document.querySelector("#modal-overlay");

const closeModalFigureButton = document.querySelector(
  "#modal__close-figure-button"
);

const elementsList = document.querySelector(".elements");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function addCard(name, link) {
  const newElement = new Card(name, link);
  elementsList.prepend(newElement.getCardElement());
}

function createInitialCards() {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  body.classList.remove("stop-scroll");
  modal.classList.remove("popup__opened");
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  addCard(inputCardTitle.value, inputCardPhoto.value);
  body.classList.remove("stop-scroll");
  modal.classList.remove("popup__opened");
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

function closeModal() {
  body.classList.remove("stop-scroll");
  modal.classList.remove("popup__opened");
  removeCloseModalEventListener();
}

closeModalBoxButton.addEventListener("click", () => {
  closeModal();
});

closeModalFigureButton.addEventListener("click", () => {
  closeModal();
});

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

function addCloseModalEventListener() {
  modalOverlay.addEventListener("click", closeModalOverlay);
  document.addEventListener("keydown", closeModalEsc);
}

function removeCloseModalEventListener() {
  modalOverlay.removeEventListener("click", closeModalOverlay);
  document.removeEventListener("keydown", closeModalEsc);
}

createInitialCards();

// Validation
const formList = Array.from(document.querySelectorAll(".modal__form"));
formList.forEach((formElement) => {
  const newValidator = new FormValidator(formElement);
  newValidator.enableValidation();
});
