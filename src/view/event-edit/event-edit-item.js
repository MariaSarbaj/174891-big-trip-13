import {EVENT_TYPES} from "../../const";

import SmartView from "../smart";

import {createTripTypesListTemplate} from "./create-trip-types-list-template";
import {createOffersTemplate} from "./create-offers-template";
import {createOptionsTemplate} from "./create-options-template";
import {createDestinationSectionTemplate} from "./create-destination-section-template";

const createCancelButton = () => {
  return `<button class="event__reset-btn" type="reset">Cancel</button>`;
};

const createDeleteButton = () => {
  return `<button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button> `;
};

const createEditPointTemplate = (point, destinations) => {
  const {type, offers, destination, price, id, activeOffers} = point;

  const typesListTemplate = createTripTypesListTemplate(EVENT_TYPES, point);
  const optionsTemplate = createOptionsTemplate(destinations);

  const eventOffersTemplate = offers.length > 0 ? createOffersTemplate(offers, activeOffers, id) : ``;
  const destinationSectionTemplate = destination.pictures.length > 0 || destination.description !== `` ? createDestinationSectionTemplate(point) : ``;

  return `<li class="trip-events__item">
             <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

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
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${optionsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${price}" min="0">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  ${point ? createDeleteButton() : createCancelButton()}
                </header>
                <section class="event__details">
                  ${eventOffersTemplate}
                  ${destinationSectionTemplate}

                </section>
              </form>
             </li>
`;
};

export default class EventEditItem extends SmartView {
  constructor(point, destinations) {
    super();
    this._point = point;
    this._destinations = destinations;

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
  }

  getTemplate() {
    return createEditPointTemplate(this._point, this._destinations);
  }

  setOnFormSubmit(callback) {
    this._callback.submitForm = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._onFormSubmit);
  }

  setOnRollupButtonClick(callback) {
    this._callback.clickToEvent = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onRollupButtonClick);
  }

  restoreHandlers() {
    this.setOnFormSubmit(this._onFormSubmit);
    this.setOnRollupButtonClick(this._onRollupButtonClick);
    this._onEventDataChange();
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._callback.submitForm();
  }

  _onRollupButtonClick(evt) {
    evt.preventDefault();
    this._callback.clickToEvent();
  }

  _onEventDataChange() {
    const Element = this.getElement();
    const typesList = Element.querySelector(`.event__type-list`);
    const destinationInput = Element.querySelector(`.event__input--destination`);
    const saveButton = Element.querySelector(`.event__save-btn`);

    typesList.addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `LABEL`) {
        const inputTypesListTemplate = typesList.querySelector(`#` + evt.target.htmlFor);

        this._point.type = inputTypesListTemplate.value;
        this._offers = this._point.offers[this._point.type];

        this.updateData();
      }
    });

    destinationInput.addEventListener(`click`, () => {
      destinationInput.value = ``;
      saveButton.disabled = true;
    });

    destinationInput.addEventListener(`input`, () => {
      this._point.destination.name = destinationInput.value;
      this._point.destination.description = ``;
      this._point.destination.pictures = [];

      const isInOptions = this._destinations.find((destination) => destination === this._point.destination.name);

      if (!isInOptions) {
        return;
      }

      saveButton.disabled = false;

      createDestinationSectionTemplate(this._point);

      this.updateData();
    });
  }
}


