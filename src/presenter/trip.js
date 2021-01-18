import {render, RenderPosition} from "../utils/utils";
import NoEventView from "../view/no-event";
import TripSortView from "../view/trip-sort";
import PointPresenter from "./point";
import {updateItemById} from "../utils/utils";

export default class Trip {
  constructor(container) {
    this._container = container;
    this._points = [];
    this._pointPresenter = {};

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._tripSortView = new TripSortView();
  }

  init(points, destinations) {
    this._points = points.slice();
    this._destinations = destinations.slice();

    if (points.length === 0) {
      render(this._container, new NoEventView());
    } else {

      // Сортировка
      render(this._container, this._tripSortView, RenderPosition.AFTERBEGIN);

      points.forEach((point) => {
        this._renderPoint(point);
      });
    }
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._container, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point, this._destinations);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItemById(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint, this._destinations);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
