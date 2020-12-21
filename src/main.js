import TripInfoView from "./view/trip-info";
import TripCostView from "./view/trip-cost";
import MenuView from "./view/menu";
import TripFilterView from "./view/filter";
import TripSortView from "./view/sorting";
import EventItemView from "./view/event-item/event-item";
import EventEditItemView from "./view/event-edit/event-edit";
import {generatePoint, destinations} from "./mock/point";
import {renderElement, RenderPosition} from "./utils/utils";

const TRIP_POINTS_NUMBER = 15;

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

const points = new Array(TRIP_POINTS_NUMBER).fill().map(generatePoint);

// Информация о маршруте и стоимость поездки
const tripInfo = document.createElement(`section`);
tripInfo.classList.add(`trip-main__trip-info`, `trip-info`);
tripMain.insertAdjacentElement(`afterbegin`, tripInfo);

renderElement(tripInfo, new TripInfoView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripInfo, new TripCostView().getElement(), RenderPosition.BEFOREEND);

// Меню и фильтры
renderElement(tripMenu, new MenuView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripMenu, new TripFilterView().getElement(), RenderPosition.BEFOREEND);

// Сортировка
renderElement(tripEvent, new TripSortView().getElement(), RenderPosition.BEFOREEND);

// Список точками маршрута
const eventList = document.createElement(`ul`);
eventList.classList.add(`trip-events__list`);
tripEvent.insertAdjacentElement(`beforeend`, eventList);

const renderEvent = (list, point, cities) => {
  const replaceEventToEdit = () => {
    list.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    list.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const eventComponent = new EventItemView(point);
  const eventEditComponent = new EventEditItemView(point, cities);

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToEdit();
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
  });

  renderElement(list, eventComponent.getElement(), RenderPosition.BEFOREEND);

};

for (let i = 0; i < points.length; i++) {
  renderEvent(eventList, points[i], destinations);
}
