import {UpdateType, UserAction} from "../const";
import EventEditItemView from "../view/event-edit/event-edit-item";
import {remove, render, RenderPosition, isEscapeKey} from "../utils/utils";
import {generateId} from "../mock/point";

export default class PointNew {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._eventEditView = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._onFormEscKeyDown = this._onFormEscKeyDown.bind(this);
  }

  init() {
    if (this._eventEditView !== null) {
      return;
    }

    this._eventEditView = new EventEditItemView();
    this._eventEditView.setOnFormSubmit(this._handleFormSubmit);
    this._eventEditView.setOnDeleteButtonClick(this._handleDeleteButtonClick);

    render(this._container, this._eventEditView, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onFormEscKeyDown);
  }

  destroy() {
    if (this._eventEditView === null) {
      return;
    }

    remove(this._eventEditView);
    this._eventEditView = null;
    document.removeEventListener(`keydown`, this._onFormEscKeyDown);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, point)
    );
    this.destroy();
  }

  _handleDeleteButtonClick() {
    this.destroy();
  }

  _onFormEscKeyDown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
