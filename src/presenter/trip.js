import {remove, render, RenderPosition, getTripEventsByFilter} from "../utils/utils";
import NoEventView from "../view/no-event";
import TripSortView from "../view/trip-sort";
import PointPresenter from "./point";
import PointNewPresenter from "./point-new";
import {SortType, UpdateType, UserAction, FilterType} from "../const";

export default class Trip {
  constructor(container, pointsModel, filterModel) {
    this._container = container;
    this._points = [];
    this._pointPresenter = {};
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._noEventView = new NoEventView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._currentSortType = SortType.EVENT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._tripSortView = null;

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._container, this._handleViewAction);
  }

  init(destinations) {
    this._currentSortType = SortType.EVENT;

    this._destinations = destinations.slice();

    this._renderRoute();
  }

  createPoint() {
    this._currentSortType = SortType.EVENT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = getTripEventsByFilter(points, filterType);

    switch (this._currentSortType) {
      case SortType.EVENT:
        return filtredPoints.sort((a, b) => a.dateFrom - b.dateFrom);
      case SortType.TIME:
        return filtredPoints.sort((a, b) => (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom));
      case SortType.PRICE:
        return filtredPoints.sort((a, b) => b.price - a.price);
    }

    return filtredPoints;
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._container, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point, this._destinations);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearRoute();
        this._renderRoute();
        break;
      case UpdateType.MAJOR:
        this._clearRoute({resetSortType: true});
        this._renderRoute();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._tripSortView = new TripSortView(this._currentSortType);
    this._tripSortView.setOnSortTypeChange(this._handleSortTypeChange);
    render(this._container, this._tripSortView, RenderPosition.AFTERBEGIN);
  }

  _clearRoute({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._tripSortView);
    remove(this._noEventView);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearRoute();
    this._renderRoute();
  }

  _renderPointsList(points) {
    points.forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderRoute() {
    const points = this._getPoints();
    if (points.length === 0) {
      render(this._container, this._noEventView);
    } else {

      this._renderSort();
      this._renderPointsList(points);
    }
  }
}
