import TripInfoSection from "./view/trip-info-section/trip-info-section";
import MenuView from "./view/menu";
import TripFilterView from "./view/trip-filter";
import TripSortView from "./view/trip-sort";
import EventItemView from "./view/event-item/event-item";
import EventEditItemView from "./view/event-edit/event-edit-item";
import NoEventView from "./view/no-event";
import {generatePoint, destinations} from "./mock/point";
import {renderElement, RenderPosition, replace} from "./utils/utils";

const TRIP_POINTS_NUMBER = 15;

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

const points = new Array(TRIP_POINTS_NUMBER).fill().map(generatePoint);

// Меню и фильтры
renderElement(tripMenu, new MenuView(), RenderPosition.AFTERBEGIN);
renderElement(tripMenu, new TripFilterView(), RenderPosition.BEFOREEND);

// Список точками маршрута
const eventList = document.querySelector(`.trip-events__list`);

const renderEvent = (container, point) => {
  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventComponent = new EventItemView(point);
  const eventEditComponent = new EventEditItemView(point, destinations);

  eventComponent.setEditClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(container, eventComponent, RenderPosition.BEFOREEND);

};

if (points.length === 0) {
  renderElement(tripEvent, new NoEventView(), RenderPosition.BEFOREEND);
} else {
  // Информация о маршруте и стоимость поездки
  renderElement(tripMain, new TripInfoSection(), RenderPosition.AFTERBEGIN);

  // Сортировка
  renderElement(tripEvent, new TripSortView(), RenderPosition.AFTERBEGIN);

  points.forEach((point) => {
    renderEvent(eventList, point);
  });
}
