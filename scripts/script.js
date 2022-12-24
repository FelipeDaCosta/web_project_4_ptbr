const modal = document.querySelector(".modal");
const editButton = document.querySelector("#edit-button");
const closeModalButton = document.querySelector("#modal__close-button");

const formElement = document.querySelector("#modal__form");
const inputName = document.querySelector("#modal__input-name");
const inputAbout = document.querySelector("#modal__input-about");

const profileName = document.querySelector("#profile__name");
const profileAbout = document.querySelector("#profile__about");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  modal.classList.remove("popup__opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", () => {
  modal.classList.add("popup__opened");
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
});

closeModalButton.addEventListener("click", () => {
  modal.classList.remove("popup__opened");
});
