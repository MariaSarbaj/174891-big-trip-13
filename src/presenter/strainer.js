import TripFilterView from "../view/trip-filter";
import {getTripEventsByFilter, remove, render, RenderPosition, replace} from "../utils/utils";
import {FilterType, UpdateType} from "../const";


export default class Strainer {
  constructor(container, filterModel, pointsModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._currentFilter = null;
    this._tripFilterView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.attach(this._handleModelEvent);
    this._filterModel.attach(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.get();

    const filters = this._getFilters();
    const prevFilterComponent = this._tripFilterView;

    this._tripFilterView = new TripFilterView(filters, this._currentFilter);
    this._tripFilterView.setOnFilterTypeChange(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._container, this._tripFilterView, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._tripFilterView, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.set(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    this._points = this._pointsModel.get();
    return Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        type: getTripEventsByFilter(this._points, filterType),
      };
    });
  }
}
