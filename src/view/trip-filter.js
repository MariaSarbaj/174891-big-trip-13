import AbstractView from "./abstract";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name} = filter;

  return `<div class="trip-filters__filter">
                <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? `checked` : ``}>
                <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
              </div>`;
};

const createTripFilterTemplate = (filterItems, currentFilterType) => {

  const filtersTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join(`\n`);

  return `<form class="trip-filters" action="#" method="get">

              ${filtersTemplate}

              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
};

export default class TripFilter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
  }

  getTemplate() {
    return createTripFilterTemplate(this._filters, this._currentFilter);
  }

  setOnFilterTypeChange(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._onFilterTypeChange);
  }

  _onFilterTypeChange(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
