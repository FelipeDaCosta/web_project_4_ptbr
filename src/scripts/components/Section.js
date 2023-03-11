/**
 * Classe da section que mostra os cards
 */
export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  renderer() {
    this._items.forEach((i) => this._renderer(i));
  }

  addItem(newItem) {
    this._renderer(newItem);
  }
}
