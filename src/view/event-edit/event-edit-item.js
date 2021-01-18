import {EVENT_TYPES} from "../../const";

import AbstractView from "../abstract";

import {createTripTypesListTemplate} from "./create-trip-types-list-template";
import {createOffersTemplate} from "./create-offers-template";
import {createOptionsTemplate} from "./create-options-template";
import {createDestinationSectionTemplate} from "./create-destination-section-template";

const createEditPointTemplate = (point, destinations) => {
  const {type, offers, destination, price} = point;

  const typesListTemplate = createTripTypesListTemplate(EVENT_TYPES, point);
  const optionsTemplate = createOptionsTemplate(destinations);

  const eventOffersTemplate = offers.length > 0 ? createOffersTemplate(offers) : ``;
  const destinationSectionTemplate = destination.pictures.length > 0 || destination.description !== `` ? createDestinationSectionTemplate(point) : ``;

  return `<li class="trip-events__item">
             <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          ${typesListTemplate}
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${optionsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" min="0">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  ${eventOffersTemplate}
                  ${destinationSectionTemplate}

                </section>
              </form>
             </li>
`;
};

export default class EventEditItem extends AbstractView {
  constructor(point, destinations) {
    super();
    this._point = point;
    this._destinations = destinations;

    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  getTemplate() {
    return createEditPointTemplate(this._point, this._destinations);
  }

  setOnFormSubmit(callback) {
    this._callback.submitForm = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._onFormSubmit);
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._callback.submitForm();
  }
}
