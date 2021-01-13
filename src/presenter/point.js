import {renderElement, replace} from "../utils/utils";
import EventItemView from "../view/event-item/event-item";
import EventEditItemView from "../view/event-edit/event-edit-item";
import {destinations} from "../mock/point";

const isEscapeKey = (evt) => evt.key === `Escape` || evt.key === `Esc`;

export default class Point {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._eventView = null;
    this._eventEditView = null;

    this._onFormEscKeyDown = this._onFormEscKeyDown.bind(this);
    this._handleRollupButtonClick = this._handleRollupButtonClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  _replaceEventToEdit() {
    replace(this._eventEditView, this._eventView);
  }

  _replaceEditToEvent() {
    replace(this._eventView, this._eventEditView);
  }


  _onFormEscKeyDown(evt) {
    if (isEscapeKey) {
      evt.preventDefault();
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onFormEscKeyDown);
    }
  }

  _handleRollupButtonClick() {
    this._replaceEventToEdit();
    document.addEventListener(`keydown`, this._onFormEscKeyDown);
  }

  _handleFormSubmit() {
    this._replaceEditToEvent();
    document.removeEventListener(`keydown`, this._onFormEscKeyDown);
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }

  init(point) {
    this._point = point;

    this._eventView = new EventItemView(point);
    this._eventEditView = new EventEditItemView(point, destinations);

    this._eventView.setOnRollupButtonClick(this._handleRollupButtonClick);
    this._eventEditView.setOnFormSubmit(this._handleFormSubmit);

    this._eventView.setOnFavoriteClick(this._handleFavoriteClick);

    renderElement(this._container, this._eventView);
  }
}
