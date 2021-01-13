import MenuView from "./view/menu";
import TripFilterView from "./view/trip-filter";
import {generatePoint} from "./mock/point";
import {renderElement, RenderPosition} from "./utils/utils";
import Trip from "./presenter/trip";

const TRIP_POINTS_NUMBER = 15;

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls`);

const points = new Array(TRIP_POINTS_NUMBER).fill().map(generatePoint);

// Меню и фильтры
renderElement(tripMenu, new MenuView(), RenderPosition.AFTERBEGIN);
renderElement(tripMenu, new TripFilterView(), RenderPosition.BEFOREEND);

// Список точками маршрута
const eventList = document.querySelector(`.trip-events__list`);

const tripEvents = new Trip(eventList);
tripEvents.render(points);
