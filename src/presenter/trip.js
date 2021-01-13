import {renderElement, RenderPosition} from "../utils/utils";
import NoEventView from "../view/no-event";
import TripSortView from "../view/trip-sort";
import PointPresenter from "./point";

export default class Trip {
  constructor(container) {
    this._container = container;

    this._handlePointChange = this._handlePointChange.bind(this);

    this._tripSortView = new TripSortView();
    this._pointPresenter = new PointPresenter(this._container, this._handlePointChange);
  }

  render(points) {
    if (points.length === 0) {
      renderElement(this._container, new NoEventView());
    } else {

      // Сортировка
      renderElement(this._container, this._tripSortView, RenderPosition.AFTERBEGIN);

      points.forEach((point) => {
        this._pointPresenter.init(point);
      });
    }
  }
}
