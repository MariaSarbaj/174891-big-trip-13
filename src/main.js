import {createTripInfoTemplate} from "./view/trip-info";
import {createTripCostTemplate} from "./view/trip-cost";
import {createMenuTemplate} from "./view/menu";
import {createTripFilterTemplate} from "./view/filter";
import {createTripSortTemplate} from "./view/sorting";
import {createEventItemTemplate} from "./view/event-item";
import {createEditPointTemplate} from "./view/event-edit";
import {createNewPointTemplate} from "./view/add-new-point";

const TRIP_POINTS_NUMBER = 5;

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls h2`);
const tripFilter = tripMain.querySelector(`.trip-controls h2:last-of-type`);
const tripEvent = document.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createEventItem = () => {
  const eventItem = document.createElement(`li`);
  eventItem.classList.add(`trip-events__item`);
  eventList.insertAdjacentElement(`beforeend`, eventItem);
};

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

for (let i = 0; i < TRIP_POINTS_NUMBER; i++) {
  createEventItem();
}

const editPointTemplate = eventList.querySelector(`.trip-events__item:first-of-type`);
render(editPointTemplate, createEditPointTemplate(), `beforeend`); // Компонент Форма редактирования

const eventItemsList = eventList.querySelectorAll(`.trip-events__item:not(:first-of-type):not(:last-of-type)`);
eventItemsList.forEach((item) => {
  render(item, createEventItemTemplate(), `beforeend`);
});

const newPointTemplate = eventList.querySelector(`.trip-events__item:last-of-type`);
render(newPointTemplate, createNewPointTemplate(), `beforeend`); // Компонент Форма создания
