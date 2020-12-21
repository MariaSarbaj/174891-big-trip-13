import TripInfoSection from "./view/trip-info-section/trip-info-section";
import MenuView from "./view/menu";
import TripFilterView from "./view/trip-filter";
import TripSortView from "./view/trip-sort";
import EventItemView from "./view/event-item/event-item";
import EventEditItemView from "./view/event-edit/event-edit-item";
import NoEventView from "./view/no-event";
import {generatePoint, destinations} from "./mock/point";
import {renderElement, RenderPosition} from "./utils/utils";

const TRIP_POINTS_NUMBER = 15;

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

const points = new Array(TRIP_POINTS_NUMBER).fill().map(generatePoint);

// Меню и фильтры
renderElement(tripMenu, new MenuView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripMenu, new TripFilterView().getElement(), RenderPosition.BEFOREEND);

// Список точками маршрута
const eventList = document.querySelector(`.trip-events__list`);

const renderEvent = (container, point) => {
  const replaceEventToEdit = () => {
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
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

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(container, eventComponent.getElement(), RenderPosition.BEFOREEND);

};

if (points.length === 0) {
  renderElement(tripEvent, new NoEventView().getElement(), RenderPosition.BEFOREEND);
} else {
  // Информация о маршруте и стоимость поездки
  renderElement(tripMain, new TripInfoSection().getElement(), RenderPosition.AFTERBEGIN);

  // Сортировка
  renderElement(tripEvent, new TripSortView().getElement(), RenderPosition.AFTERBEGIN);

  points.forEach((point) => {
    renderEvent(eventList, point);
  });
}

