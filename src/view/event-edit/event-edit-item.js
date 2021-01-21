import {EVENT_TYPES} from "../../const";

// import AbstractView from "../abstract";
import SmartView from "../smart";

import {createTripTypesListTemplate} from "./create-trip-types-list-template";
import {createOffersTemplate} from "./create-offers-template";
import {createOptionsTemplate} from "./create-options-template";
import {createDestinationSectionTemplate} from "./create-destination-section-template";

const createEditPointTemplate = (point, destinations) => {
  // const {type, offers, destination, price} = point;
  const {type, offers, destination, price, id} = point;

  const typesListTemplate = createTripTypesListTemplate(EVENT_TYPES, point);
  const optionsTemplate = createOptionsTemplate(destinations);

  // const eventOffersTemplate = offers.length > 0 ? createOffersTemplate(offers) : ``;
  const eventOffersTemplate = offers.length > 0 ? createOffersTemplate(offers, id) : ``;
  const destinationSectionTemplate = destination.pictures.length > 0 || destination.description !== `` ? createDestinationSectionTemplate(point) : ``;

  return `<li class="trip-events__item">
             <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
<!--                    <label class="event__type  event__type-btn" for="event-type-toggle-1">-->
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
<!--                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">-->
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
<!--                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">-->
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
<!--                    <datalist id="destination-list-1">-->
                    <datalist id="destination-list-${id}">
                      ${optionsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
<!--                    <label class="visually-hidden" for="event-start-time-1">From</label>-->
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
<!--                    <input class="event__input  event__input&#45;&#45;time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">-->
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
<!--                    <label class="visually-hidden" for="event-end-time-1">To</label>-->
<!--                    <input class="event__input  event__input&#45;&#45;time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">-->
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
<!--                    <label class="event__label" for="event-price-1">-->
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
<!--                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" min="0">-->
                    <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${price}" min="0">
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

// export default class EventEditItem extends AbstractView {
export default class EventEditItem extends SmartView {
  constructor(point, destinations) {
    super();
    this._point = point;
    this._destinations = destinations;

    this._id = this._point.id;

    this._onFormSubmit = this._onFormSubmit.bind(this);

  }

  getTemplate() {
    return createEditPointTemplate(this._point, this._destinations, this._id);
  }

  setOnFormSubmit(callback) {
    this._callback.submitForm = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._onFormSubmit);
  }

  restoreHandlers() {
    this.setOnFormSubmit(this._onFormSubmit);
    this._subscribeOnEvents();
  }

  updateData(update, justDataUpdating) {
    return super.updateData(update, justDataUpdating);
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._callback.submitForm();
  }

  _subscribeOnEvents() {
    const template = this.getElement();
    const typesListTemplate = template.querySelector(`.event__type-list`);
    const destinationInputTemplate = template.querySelector(`.event__input--destination`);
    const saveButtonTemplate = template.querySelector(`.event__save-btn`);

    typesListTemplate.addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `LABEL`) {
        const inputTypesListTemplate = typesListTemplate.querySelector(`#` + evt.target.htmlFor);

        this._point.type = inputTypesListTemplate.value;
        this._offers = this._point.offers;

        this.updateData();
      }
    });

    destinationInputTemplate.addEventListener(`click`, () => {
      destinationInputTemplate.value = ``;
      saveButtonTemplate.disabled = true;
    });

    destinationInputTemplate.addEventListener(`input`, () => {
      this._point.destination.name = destinationInputTemplate.value;

      const isInOptions = this._destinations.find((destination) => destination === this._point.destination.name);

      if (!isInOptions) {
        return;
      }

      saveButtonTemplate.disabled = false;

      this.updateData();
    });
  }
}


