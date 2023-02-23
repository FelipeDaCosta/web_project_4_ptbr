export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._modal = document.querySelector(this._selector);
    this._body = document.querySelector(".body");
    this._modalOverlay = document.querySelector("#modal-overlay");
  }

  open() {
    this._modal.classList.add("popup__opened");
    this._body.classList.add("stop-scroll");
  }

  close() {
    this._body.classList.remove("stop-scroll");
    this._modal.classList.remove("popup__opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._modalOverlay.addEventListener("click", (evt) => {
      if (evt.target === this._modalOverlay) {
        this.close();
      }
    });
    const closeModalBoxButton = document.querySelector(
      "#modal__close-box-button"
    );
    const closeModalFigureButton = document.querySelector(
      "#modal__close-figure-button"
    );

    closeModalBoxButton.addEventListener("click", () => {
      this.close();
    });

    closeModalFigureButton.addEventListener("click", () => {
      this.close();
    });
  }
}
