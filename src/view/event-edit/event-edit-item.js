import {EVENT_TYPES} from "../../const";

import SmartView from "../smart";

import {createTripTypesListTemplate} from "./create-trip-types-list-template";
import {createOffersTemplate} from "./create-offers-template";
import {createOptionsTemplate} from "./create-options-template";
import {createPhotosTemplate} from "./create-photos-template";

import flatpickr from "flatpickr";
import "../../../node_modules/flatpickr/dist/flatpickr.min.css";

const ButtonText = {
  DELETE: `Delete`,
  SAVE: `Save`,
};

const createEditPointTemplate = (data, destinations) => {
  const {type, offers, destination, price, id, dateFrom, dateTo} = data;
  const {isDisabled, isVisibleOffers, isVisibleDestination} = data;

  const eventOffersTemplate = createOffersTemplate(offers, data);
  const typesListTemplate = createTripTypesListTemplate(EVENT_TYPES, data);
  const optionsTemplate = createOptionsTemplate(destinations);

  const buttonAttribute = isDisabled ? `disabled` : ``;

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
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${optionsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${price}" min="0">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${buttonAttribute}>${ButtonText.SAVE}</button>
                  <button class="event__reset-btn" type="reset" ${buttonAttribute}>${ButtonText.DELETE}</button>

                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>

                <section class="event__details ${isVisibleOffers || isVisibleDestination ? `` : `visually-hidden`}">
                  ${eventOffersTemplate ? `<section class="event__section  event__section--offers ${isVisibleOffers ? `` : `visually-hidden`}">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${eventOffersTemplate}
                    </div>
                  </section>` : ``}

                  <section class="event__section  event__section--destination ${isVisibleDestination ? `` : `visually-hidden`}">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createPhotosTemplate(destination.pictures)}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
             </li>
`;
};

export default class EventEditItem extends SmartView {
  constructor(point, destinations) {
    super();
    this._data = EventEditItem.parsePointToData(point, destinations);
    this._destinations = destinations;

    this._flatpickrFrom = null;
    this._flatpickrTo = null;

    this._onTypeItemChange = this._onTypeItemChange.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);
    this._onInputPriceChange = this._onInputPriceChange.bind(this);

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);

    this._setInnerHandlers();
    this._setFlatpickr();
  }

  getTemplate() {
    return createEditPointTemplate(this._data, this._destinations);
  }

  setOnFormSubmit(callback) {
    this._callback.submitForm = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._onFormSubmit);
  }

  setOnRollupButtonClick(callback) {
    this._callback.clickToEvent = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onRollupButtonClick);
  }

  setOnDeleteButtonClick(callback) {
    this._callback.clearForm = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._onDeleteButtonClick);
  }

  restoreHandlers() {
    this.setOnFormSubmit(this._callback.submitForm);
    this.setOnRollupButtonClick(this._callback.clickToEvent);
    this.setOnDeleteButtonClick(this._callback.clearForm);

    this._setInnerHandlers();
    this._setFlatpickr();
  }

  removeElement() {
    super.removeElement();

    this._flatpickrFrom.destroy();
    this._flatpickrTo.destroy();

    this._flatpickrFrom = null;
    this._flatpickrTo = null;
  }

  _setInnerHandlers() {
    const element = this.getElement();

    element.querySelector(`.event__type-group`).addEventListener(`change`, this._onTypeItemChange);
    element.querySelector(`.event__input--price`).addEventListener(`change`, this._onInputPriceChange);
    element.querySelector(`.event__input--destination`).addEventListener(`change`, this._onDestinationChange);
  }

  _setFlatpickr() {
    if (this._flatpickrFrom !== null) {
      this._flatpickrFrom.destroy();
      this._flatpickrFrom = null;
    }

    if (this._flatpickrTo !== null) {
      this._flatpickrTo.destroy();
      this._flatpickrTo = null;
    }

    const dateFrom = this.getElement().querySelector(`[name="event-start-time"]`);
    const dateTo = this.getElement().querySelector(`[name="event-end-time"]`);

    this._flatpickrFrom = flatpickr(
        dateFrom, {
          enableTime: true,
          dateFormat: `Y/m/d H:i`,
          defaultDate: this._data.dateFrom,
          onChange: this._onDateChange
        }
    );

    this._flatpickrTo = flatpickr(
        dateTo, {
          enableTime: true,
          dateFormat: `Y-m-d H:i`,
          defaultDate: this._data.dateTo,
          onChange: this._onDateChange,
          minDate: this._data.dateFrom
        }
    );
  }

  _onDateChange([userDate]) {
    this.updateData({
      dateFrom: new Date(userDate),
      dateTo: new Date(userDate),
    });
  }

  _onTypeItemChange(evt) {
    evt.preventDefault();

    const typeToOffers = {
      taxi: [
        {type: `luggage`, title: `Add luggage`, price: 10},
        {type: `comfort`, title: `Switch to comfort`, price: 150}
      ],
      train: [
        {type: `comfort`, title: `Switch to comfort`, price: 150}
      ],
      bus: [
        {type: `info`, title: `Infotainment system`, price: 50},
        {type: `meal`, title: `Order meal`, price: 100},
        {type: `seats`, title: `Choose seats`, price: 190}
      ],
      drive: [
        {type: `comfort`, title: `Choose comfort class`, price: 110},
        {type: `business`, title: `Choose business class`, price: 180}
      ],
      flight: [
        {type: `meal`, title: `Choose meal`, price: 120},
        {type: `seats`, title: `Choose seats`, price: 90},
        {type: `comfort`, title: `Upgrade to comfort class`, price: 120},
        {type: `business`, title: `Upgrade to business class`, price: 120},
        {type: `luggage`, title: `Add luggage`, price: 170},
        {type: `lounge`, title: `Business lounge`, price: 160}
      ],
      restaurant: [
        {type: `music`, title: `Choose live music`, price: 150},
        {type: `vip`, title: `Choose VIP area`, price: 70}
      ],
      ship: [
        {type: `meal`, title: `Choose meal`, price: 130},
        {type: `seats`, title: `Choose seats`, price: 160},
        {type: `comfort`, title: `Upgrade to business class`, price: 170},
        {type: `luggage`, title: `Add luggage`, price: 100},
        {type: `lounge`, title: `Business lounge`, price: 40}
      ],
      sightseeing: [],
      transport: []
    };

    const offers = typeToOffers[evt.target.value] || [];

    this.updateData({
      type: evt.target.value,
      offers,
      isVisibleOffers: offers.length > 0,
    });
  }

  _onDestinationChange(evt) {
    evt.preventDefault();

    const value = evt.target.value;
    if (value.length === 0) {
      return;
    }

    let destination = this._destinations.find(({name}) => name === value);

    if (!destination) {
      destination = {
        name: ``,
        description: ``,
        pictures: [],
      };
    }

    this.updateData({
      destination,
      isVisibleDestination: Boolean(destination),
    });
  }

  _onInputPriceChange(evt) {
    evt.preventDefault();

    this.updateData({
      price: evt.target.valueAsNumber,
    }, true);
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._callback.submitForm(EventEditItem.parseDataToPoint(this._data));
  }

  _onRollupButtonClick(evt) {
    evt.preventDefault();
    this._callback.clickToEvent();
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    this._callback.clearForm();
  }

  static parsePointToData(point) {
    const {destination, offers} = point;

    const isVisibleDestination = destination.description.length > 0 || destination.pictures.length > 0;
    const isVisibleOffers = offers.length > 0;

    return Object.assign({},
        point,
        {
          isDisabled: false,
          isVisibleDestination,
          isVisibleOffers,
        });
  }

  static parseDataToPoint(pointData) {
    pointData = Object.assign({}, pointData);

    delete pointData.isDisabled;
    delete pointData.isVisibleDestination;
    delete pointData.isVisibleOffers;

    return pointData;
  }
}


