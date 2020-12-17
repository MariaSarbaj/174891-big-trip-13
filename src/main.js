import {createTripInfoTemplate} from "./view/trip-info";
import {createTripCostTemplate} from "./view/trip-cost";
import {createMenuTemplate} from "./view/menu";
import {createTripFilterTemplate} from "./view/filter";
import {createTripSortTemplate} from "./view/sorting";
import {createEventItemTemplate} from "./view/event-item/event-item";
import {createEditPointTemplate} from "./view/event-edit/event-edit";
import {generatePoint, destinations} from "./mock/point";

const TRIP_POINTS_NUMBER = 15;

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls h2`);
const tripFilter = tripMain.querySelector(`.trip-controls h2:last-of-type`);
const tripEvent = document.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const points = new Array(TRIP_POINTS_NUMBER).fill().map(generatePoint);

// Информация о маршруте и стоимость поездки
const tripInfo = document.createElement(`section`);
tripInfo.classList.add(`trip-main__trip-info`, `trip-info`);
tripMain.insertAdjacentElement(`afterbegin`, tripInfo);

render(tripInfo, createTripInfoTemplate(), `beforeend`);
render(tripInfo, createTripCostTemplate(), `beforeend`);

// Меню и фильтры
render(tripMenu, createMenuTemplate(), `afterend`);
render(tripFilter, createTripFilterTemplate(), `afterend`);

// Сортировка
render(tripEvent, createTripSortTemplate(), `beforeend`);

// Список точками маршрута
const eventList = document.createElement(`ul`);
eventList.classList.add(`trip-events__list`);
tripEvent.insertAdjacentElement(`beforeend`, eventList);

render(eventList, createEditPointTemplate(points[0], destinations), `beforeend`);

for (let i = 0; i < points.length; i++) {
  render(eventList, createEventItemTemplate(points[i]), `beforeend`);
}
