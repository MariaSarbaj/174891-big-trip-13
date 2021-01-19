import MenuView from "./view/menu";
import TripFilterView from "./view/trip-filter";
import {destinations, generatePoint} from "./mock/point";
import {render, RenderPosition} from "./utils/utils";
import TripPresenter from "./presenter/trip";
import TripInfoSectionView from "./view/trip-info-section/trip-info-section";

const TRIP_POINTS_NUMBER = 15;

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls`);

const points = new Array(TRIP_POINTS_NUMBER).fill().map(generatePoint);

// Инфа о поездке

render(tripMain, new TripInfoSectionView(), RenderPosition.AFTERBEGIN);

// Меню и фильтры
render(tripMenu, new MenuView(), RenderPosition.AFTERBEGIN);
render(tripMenu, new TripFilterView(), RenderPosition.BEFOREEND);

// Список точками маршрута
const eventList = document.querySelector(`.trip-events__list`);

const tripPresenter = new TripPresenter(eventList);
tripPresenter.init(points, destinations);
