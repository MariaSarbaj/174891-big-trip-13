import AbstractView from "./abstract";

const createAddButtonTemplate = () => {
  return `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    `;
};

export default class AddButton extends AbstractView {
  constructor() {
    super();

    this._onAddButtonClick = this._onAddButtonClick.bind(this);
  }
  getTemplate() {
    return createAddButtonTemplate();
  }

  setOnAddButtonClick(callback) {
    this._callback.buttonClick = callback;
    this.getElement().addEventListener(`click`, this._onAddButtonClick);
  }

  _onAddButtonClick(evt) {
    evt.preventDefault();
    this._callback.buttonClick(evt.target.value);
  }
}
