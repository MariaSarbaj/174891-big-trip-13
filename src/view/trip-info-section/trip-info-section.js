import {createElement} from "../../utils/utils";
import {createTripInfoTemplate} from "./trip-info";
import {createTripCostTemplate} from "./trip-cost";

const createTripInfoSectionTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
            ${createTripInfoTemplate()}
            ${createTripCostTemplate()}
          </section>`;
};

export default class TripInfoSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoSectionTemplate();
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
