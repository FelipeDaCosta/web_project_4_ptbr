const body = document.querySelector(".body");
const modal = document.querySelector(".modal");
const editButton = document.querySelector("#edit-button");
const addCardButton = document.querySelector("#add-card-button");

const closeModalButton = document.querySelector("#modal__close-button");
const editProfileForm = document.querySelector("#modal-form-edit-profile");
const addCardForm = document.querySelector("#modal-form-add-card");
const inputName = document.querySelector("#modal__input-name");
const inputAbout = document.querySelector("#modal__input-about");
const inputCardTitle = document.querySelector("#modal__input-title");
const inputCardPhoto = document.querySelector("#modal__input-photo");

const profileName = document.querySelector("#profile__name");
const profileAbout = document.querySelector("#profile__about");

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
  const elementsList = document.querySelector(".elements");
  const templateContent = document.querySelector("#element-template").content;
  const newElement = templateContent.cloneNode(true);
  newElement.querySelector(".element__name").textContent = name;
  newElement.querySelector(".element__photo").src = link;
  newElement
    .querySelector(".element__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-active");
    });
  newElement
    .querySelector(".element__trash-bin")
    .addEventListener("click", (evt) => {
      evt.target.parentElement.remove();
    });
  elementsList.prepend(newElement);
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
  addCardForm.style.display = "none";
  editProfileForm.style.display = "flex";
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
});

addCardButton.addEventListener("click", () => {
  modal.classList.add("popup__opened");
  body.classList.add("stop-scroll");
  addCardForm.style.display = "flex";
  editProfileForm.style.display = "none";
});

closeModalButton.addEventListener("click", () => {
  body.classList.remove("stop-scroll");
  modal.classList.remove("popup__opened");
  modalOptions.editProfile = false;
  modalOptions.addCard = false;
});

createInitialCards();
