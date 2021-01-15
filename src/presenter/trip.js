import {render, RenderPosition} from "../utils/utils";
import NoEventView from "../view/no-event";
import TripSortView from "../view/trip-sort";
import PointPresenter from "./point";
import {updateItem} from "../utils/utils";

export default class Trip {
  constructor(container) {
    this._container = container;
    this._points = [];
    this._pointPresenter = {};

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._tripSortView = new TripSortView();
  }

  render(points) {
    this._points = points.slice();
    this._pointPresenter = new PointPresenter(this._container, this._handlePointChange, this._handleModeChange());

    if (points.length === 0) {
      render(this._container, new NoEventView());
    } else {

      // Сортировка
      render(this._container, this._tripSortView, RenderPosition.AFTERBEGIN);

      points.forEach((point) => {
        this._pointPresenter.init(point);
      });
    }
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].render(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
