import {renderElement, RenderPosition, replace} from "../utils/utils";
import EventItemView from "../view/event-item/event-item";
import EventEditItemView from "../view/event-edit/event-edit-item";
import {destinations} from "../mock/point";
import NoEventView from "../view/no-event";
import TripSortView from "../view/trip-sort";
import TripInfoSection from "../view/trip-info-section/trip-info-section";

const renderEvent = (container, point) => {
  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onFormEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onFormEscKeyDown);
    }
  };

  const eventComponent = new EventItemView(point);
  const eventEditComponent = new EventEditItemView(point, destinations);

  eventComponent.setEditClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onFormEscKeyDown);
  });

  eventEditComponent.setOnFormSubmit(() => {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onFormEscKeyDown);
  });

  renderElement(container, eventComponent, RenderPosition.BEFOREEND);

};

export default class pageLayout {
  constructor(container) {
    this._container = container;
    this._noEventView = new NoEventView();
    this._tripSortView = new TripSortView();
  }

  render(points, container) {
    if (points.length === 0) {
      renderElement(this._container, this._noEventView, RenderPosition.BEFOREEND);
    } else {

      // Сортировка
      renderElement(this._container, this._tripSortView, RenderPosition.AFTERBEGIN);

      points.forEach((point) => {
        renderEvent(this._container, point);
      });
    }
  }
}
