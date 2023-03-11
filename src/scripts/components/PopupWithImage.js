import Popup from "./Popup.js";

/**
 * Classe dos popups que tem uma imagem
 */
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._modalFigurePhoto = document.querySelector("#modal__figure-photo");
    this._modalFigureCaption = document.querySelector("#modal__figure-caption");
    this._modalBox = document.querySelector("#modal__box");
    this._modalFigure = document.querySelector("#modal__figure");
  }
  open({ name, link }) {
    super.open();

    this._modalBox.style.display = "none";
    this._modalFigure.style.display = "block";
    this._modalFigurePhoto.src = link;
    this._modalFigureCaption.textContent = name;
  }
}
