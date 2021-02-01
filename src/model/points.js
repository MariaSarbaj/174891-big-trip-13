import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  set(items) {
    this._items = items.slice();
  }

  get() {
    return this._items;
  }

  update(updateType, update) {
    const index = this._items.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._items = [
      ...this._items.slice(0, index),
      update,
      ...this._items.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  add(updateType, update) {
    this._items = [
      update,
      ...this._items
    ];

    this._notify(updateType, update);
  }

  delete(updateType, update) {
    const index = this._items.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._items = [
      ...this._items.slice(0, index),
      ...this._items.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
