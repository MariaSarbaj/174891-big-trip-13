import AbstractView from "../abstract";
import {createTripInfoTemplate} from "./trip-info";
import {createTripCostTemplate} from "./trip-cost";

const createTripInfoSectionTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
            ${createTripInfoTemplate()}
            ${createTripCostTemplate()}
          </section>`;
};

export default class TripInfoSection extends AbstractView {
  getTemplate() {
    return createTripInfoSectionTemplate();
  }
}
