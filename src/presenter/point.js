import {remove, render, replace, isEscapeKey} from "../utils/utils";
import {Mode, UserAction, UpdateType} from "../const";
import EventItemView from "../view/event-item/event-item";
import EventEditItemView from "../view/event-edit/event-edit-item";

export default class Point {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._point = null;
    this._eventView = null;
    this._eventEditView = null;
    this._mode = Mode.DEFAULT;

    this._onFormEscKeyDown = this._onFormEscKeyDown.bind(this);
    this._handleRollupButtonClick = this._handleRollupButtonClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);

    this._handleFavoriteButtonClick = this._handleFavoriteButtonClick.bind(this);
  }

  init(point, destinations, offers, mode) {
    this._point = point;
    this._destinations = destinations;

    const prevEventView = this._eventView;
    const prevEventEditView = this._eventEditView;

    this._eventView = new EventItemView(point);
    this._eventEditView = new EventEditItemView(point, destinations, offers, mode);

    this._eventView.setOnRollupButtonClick(this._handleRollupButtonClick);
    this._eventEditView.setOnFormSubmit(this._handleFormSubmit);
    this._eventEditView.setOnRollupButtonClick(this._handleRollupButtonClick);
    this._eventEditView.setOnDeleteButtonClick(this._handleDeleteButtonClick);

    this._eventView.setOnFavoriteButtonClick(this._handleFavoriteButtonClick);

    if (prevEventView === null || prevEventEditView === null) {
      render(this._container, this._eventView);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventView, prevEventView);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditView, prevEventEditView);
    }

    remove(prevEventView);
    remove(prevEventEditView);
  }

  destroy() {
    remove(this._eventView);
    remove(this._eventEditView);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    replace(this._eventEditView, this._eventView);
    document.addEventListener(`keydown`, this._onFormEscKeyDown);
    this._changeMode(this, this._point);
    this._mode = Mode.EDITING;
  }

  _replaceEditToEvent() {
    replace(this._eventView, this._eventEditView);
    document.removeEventListener(`keydown`, this._onFormEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _handleRollupButtonClick() {
    if (this._mode === Mode.DEFAULT) {
      this._replaceEventToEdit();
    } else {
      this._replaceEditToEvent();
    }
  }

  _handleFormSubmit(update) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        update
    );
    this._replaceEditToEvent();
  }

  _handleFavoriteButtonClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }

  _handleDeleteButtonClick(point) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point
    );
  }

  _onFormEscKeyDown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this._replaceEditToEvent();
    }
  }
}
