import {EVENT_TYPES, Mode} from "../../const";

import SmartView from "../smart";

import {createTripTypesListTemplate} from "./create-trip-types-list-template";
import {createOffersTemplate} from "./create-offers-template";
import {createOptionsTemplate} from "./create-options-template";
import {createPhotosTemplate} from "./create-photos-template";

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
  isBlocked: false,
  isVisibleOffers: true,
  isVisibleDestination: true
};

const createEditPointTemplate = (point, destinations) => {
  const {type, offers, destination, price, id} = point;

  const deleteButtonText = DefaultData.deleteButtonText;
  const saveButtonText = DefaultData.saveButtonText;
  const isVisibleOffers = DefaultData.isVisibleOffers;
  const isVisibleDestination = DefaultData.isVisibleDestination;
  const eventOffersTemplate = createOffersTemplate(offers, point);

  const disabledElement = DefaultData.isBlocked ? `disabled` : ``;

  const typesListTemplate = createTripTypesListTemplate(EVENT_TYPES, point);
  const optionsTemplate = createOptionsTemplate(destinations);

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

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${disabledElement}>${saveButtonText}</button>
                  <button class="event__reset-btn" type="reset" ${disabledElement}>${deleteButtonText}</button>

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
  constructor(point, destinations, offers, eventMode) {
    super();
    this._point = point;
    this._destinations = destinations;
    this._offers = offers;
    this._eventMode = eventMode;

    this._externalData = Object.assign({}, DefaultData,
        {isVisibleOffers: eventMode !== Mode.EDITING},
        {isVisibleDestination: eventMode !== Mode.EDITING}
    );

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
  }

  getTemplate() {
    return createEditPointTemplate(this._point, this._destinations, this._offers, this._eventMode, this._externalData);
  }

  getData() {
    const formElement = this.getElement().querySelector(`form`);
    return new FormData(formElement);
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
    this.setOnFormSubmit(this._onFormSubmit);
    this.setOnRollupButtonClick(this._onRollupButtonClick);
    this._eventDataChange();
  }

  reset() {
    this._point = Object.assign({}, this._point);
    this.updateData();
  }

  setData(data, point) {
    this._point = point;
    this._externalData = Object.assign({}, DefaultData, data);
    this.updateData();

  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._callback.submitForm();
  }

  _onRollupButtonClick(evt) {
    evt.preventDefault();
    this._callback.clickToEvent();
  }

  _eventDataChange() {
    const element = this.getElement();
    const typesList = element.querySelector(`.event__type-list`);
    const destinationInput = element.querySelector(`.event__input--destination`);

    typesList.addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      if (this._eventMode === Mode.EDITING) {
        this.setData({
          isVisibleOffers: true,
          isVisibleDestination: this._externalData.isVisibleDestination
        }, this._point);
      }

      const eventType = EVENT_TYPES.find((type) => type === evt.target.value);

      this._point = Object.assign({}, this._point,
          {type: eventType}
      );

      this.updateData();
    });

    destinationInput.addEventListener(`change`, (evt) => {
      const city = evt.target.value;

      const destination = this._destinations.find((it) => it.name === city);

      if (this._eventMode === Mode.EDITING) {
        this.setData({
          isVisibleOffers: this._externalData.isVisibleOffers,
          isVisibleDestination: true
        }, this._point);
      }

      if (!destination) {
        return;
      }

      this._event = Object.assign({}, this._point,
          {name: destination.name},
          {description: destination.description},
          {pictures: destination.pictures}
      );

      this.updateData();
    });
  }

}


