import {render, RenderPosition} from "../utils/utils";
import NoEventView from "../view/no-event";
import TripSortView from "../view/trip-sort";
import PointPresenter from "./point";
import {updateItemById} from "../utils/utils";
import {SortType} from "../const";

export default class Trip {
  constructor(container) {
    this._container = container;
    this._points = [];
    this._pointPresenter = {};

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._currentSortType = SortType.EVENT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._tripSortView = new TripSortView();
  }

  init(points, destinations) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();
    this._currentSortType = SortType.EVENT;

    this._destinations = destinations.slice();

    this._renderTrip();
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

  _renderSort() {
    this._tripSortView.setOnSortTypeChange(this._handleSortTypeChange);
    render(this._container, this._tripSortView, RenderPosition.AFTERBEGIN);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.EVENT:
        this._points = this._sourcedPoints.sort((a, b) => a.dateFrom - b.dateFrom);
        break;
      case SortType.TIME:
        this._points = this._sourcedPoints.sort((a, b) => (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom));
        break;
      case SortType.PRICE:
        this._points = this._sourcedPoints.sort((a, b) => b.price - a.price);
        break;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointsList();
    this._renderPointsList();
  }

  _renderPointsList() {
    this._points.forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderTrip() {
    if (this._points.length === 0) {
      render(this._container, new NoEventView());
    } else {

      this._renderSort();
      this._renderPointsList();
    }
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}
