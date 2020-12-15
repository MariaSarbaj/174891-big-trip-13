import {EVENT_TYPES} from "../const/const";

const MAX_DESCRIPTION_SENTENCES = 5;
const MIN_DESCRIPTION_SENTENCES = 1;

const CITIES = [`Jerusalem`, `Haifa`, `Be'er-Sheva`, `Eilat`, `Tiberias`, `Tel-Aviv`, `Ashdod`, `Ashkelon`];

const Time = {
  HOUR: 26280,
  MINUTE: 40320,
};

const eventOffers = [
  {
    id: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  },
  {
    id: `meal`,
    title: `Add meal`,
    price: 15
  },
  {
    id: `seats`,
    title: `Choose seats`,
    price: 5
  },
  {
    id: `train`,
    title: `Travel by train`,
    price: 40
  },
  {
    id: `uber`,
    title: `Order Uber`,
    price: 20
  },
];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const makeEventDatesGenerator = ({Y, M, D}) => {
  let dateStart = Date.UTC(Y, M, D);
  return (minutes) => ({
    dateFrom: dateStart,
    dateTo: (dateStart = +dateStart + Time.MINUTE * minutes),
  });
};

const getRandomHourInterval = (min, max) => getRandomInteger(min, max) * Time.HOUR;

const getRandomType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);

  return EVENT_TYPES[randomIndex];
}; // Генерирует случайный тип

const getEventDates = makeEventDatesGenerator({Y: 2018, M: 11, D: 11});

const {dateFrom, dateTo} = getEventDates(getRandomHourInterval(23, 100));

const getRandomCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);

  return CITIES[randomIndex];
};

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const sentences = descriptionText.match(/[^\.!\?]+[\.!\?]+["']?|$/g);

const getRandomDescription = () => {
  const randomNumber = getRandomInteger(MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES);

  const sentencesCopy = sentences.slice(sentences);
  const randomSentences = [];

  for (let i = 0; i < randomNumber; i++) {
    const index = Math.floor(Math.random() * sentencesCopy.length);
    const removed = sentencesCopy.splice(index, 1);
    randomSentences.push(removed[0]);
  }

  return randomSentences.join(``);
};

const getRandomPhoto = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

const getPhotos = () => {
  const photosAmount = getRandomInteger(1, 5);

  return new Array(photosAmount).fill(``).map(getRandomPhoto);
};

const getRandomPrice = () => {
  return getRandomInteger(100, 1000);
};

const generatePoint = () => {
  return {
    type: getRandomType(),
    dateFrom: new Date(dateFrom),
    dateTo: new Date(dateTo),
    destination: {
      name: getRandomCity(),
      description: getRandomDescription(),
      pictures: getPhotos(),
    },
    offers: eventOffers,
    price: getRandomPrice(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export {
  generatePoint, getPhotos, CITIES
};
