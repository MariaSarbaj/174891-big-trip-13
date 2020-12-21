import {createElement} from "../../utils/utils";

import {convertTextToUppercase} from "../../utils/convert-text-to-uppercase";
import {formatEventDate, formatEventTime} from "../../utils/date";
import {createTripEventOffersTemplate} from "./create-offers-in-item-template";

const createEventItemTemplate = (point) => {
  const {dateFrom, dateTo, type, destination, price, isFavorite, offers} = point;

  const eventTypeUpperCase = convertTextToUppercase(type);
  const eventDate = formatEventDate(dateFrom);
  const eventStartTime = formatEventTime(dateFrom);
  const eventEndTime = formatEventTime(dateTo);

  const eventOffers = offers.length > 0 ? createTripEventOffersTemplate(offers) : ``;

  const buttonFavoriteActive = isFavorite ? ` event__favorite-btn--active` : ``;

  return `<li class="trip-events__item">
            <div class="event">
                <time class="event__date" datetime="${dateFrom.toISOString()}">${eventDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${eventTypeUpperCase} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom.toISOString()}}">${eventStartTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo.toISOString()}">${eventEndTime}</time>
                  </p>
                  <p class="event__duration">1H</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>

                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${eventOffers}
                </ul>

                <button class="event__favorite-btn ${buttonFavoriteActive}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class EventItem {
  constructor(point) {
    this._element = null;
    this._eventPoint = point;
  }

  getTemplate() {
    return createEventItemTemplate(this._eventPoint);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}