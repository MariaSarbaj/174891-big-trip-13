import MenuView from "./view/menu";
import {destinations, generatePoint} from "./mock/point";
import {render, RenderPosition} from "./utils/utils";
import TripPresenter from "./presenter/trip";
import TripInfoSectionView from "./view/trip-info-section/trip-info-section";
import PointsModel from "./model/points";
import FilterModel from "./model/filter";
import FilterPresenter from "./presenter/filter";

const TRIP_POINTS_NUMBER = 15;

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls`);

const points = new Array(TRIP_POINTS_NUMBER).fill().map(generatePoint);

// Инфа о поездке

render(tripMain, new TripInfoSectionView(), RenderPosition.AFTERBEGIN);

// Меню и фильтры
render(tripMenu, new MenuView(), RenderPosition.AFTERBEGIN);

// Список точками маршрута
const eventList = document.querySelector(`.trip-events__list`);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(eventList, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(eventList, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init(destinations);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
