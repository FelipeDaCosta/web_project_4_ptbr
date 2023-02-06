const modal = document.querySelector(".modal");
const body = document.querySelector(".body");
const modalFigurePhoto = document.querySelector("#modal__figure-photo");
const modalFigureCaption = document.querySelector("#modal__figure-caption");
const closeModalFigureButton = document.querySelector(
  "#modal__close-figure-button"
);
const modalBox = document.querySelector("#modal__box");
const modalFigure = document.querySelector("#modal__figure");

export function openFigureModal(link, name) {
  modal.classList.add("popup__opened");
  body.classList.add("stop-scroll");
  modalBox.style.display = "none";
  modalFigure.style.display = "block";
  modalFigurePhoto.src = link;
  modalFigureCaption.textContent = name;
}
