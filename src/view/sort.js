import AbstractView from "./abstract";
import {SortType} from "../const";

const createTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="${SortType.EVENT}">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
              <label class="trip-sort__btn" for="${SortType.TIME}">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
              <label class="trip-sort__btn" for="${SortType.PRICE}">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`;
};

export default class Sort extends AbstractView {
  constructor(currentType) {
    super();

    this._currentType = currentType;

    this._onTypeChange = this._onTypeChange.bind(this);
  }

  getTemplate() {
    return createTemplate(this._currentType);
  }

  _onTypeChange(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    evt.preventDefault();
    this._callback.changeType(evt.target.htmlFor);
  }

  setOnTypeChange(callback) {
    this._callback.changeType = callback;
    this.getElement().addEventListener(`click`, this._onTypeChange);
  }
}
