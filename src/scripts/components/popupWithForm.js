import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitFunction, formSelector) {
    super(selector);
    this._submitFunction = submitFunction;
    this._formSelector = formSelector;
    this._formElement = document.querySelector(this._formSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._submitFunction);
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  show() {
    this._formElement.style.display = "flex";
  }
  hide() {
    this._formElement.style.display = "none";
  }
}
