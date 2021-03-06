import {EVENT_TYPES} from "../const";

const MAX_DESCRIPTION_SENTENCES = 5;
const MIN_DESCRIPTION_SENTENCES = 1;

const CITIES = [`Jerusalem`, `Haifa`, `Be'er-Sheva`, `Eilat`, `Tiberias`, `Tel-Aviv`, `Ashdod`, `Ashkelon`];

const Time = {
  HOUR: 26280,
  MINUTE: 40320,
};

const OFFERS = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 10,
    checked: false
  },
  {
    type: `comfort`,
    title: `Switch to comfort`,
    price: 150,
    checked: false
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 2,
    checked: false
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 9,
    checked: false
  },
  {
    type: `train`,
    title: `Travel by train`,
    price: 40,
    checked: false
  }
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

const destinations = [
  {
    name: `Jerusalem`,
    description: getRandomDescription(),
    pictures: getPhotos(),
  },
  {
    name: `Haifa`,
    description: getRandomDescription(),
    pictures: getPhotos(),
  },
  {
    name: `Be'er-Sheva`,
    description: getRandomDescription(),
    pictures: getPhotos(),
  },
  {
    name: `Eilat`,
    description: getRandomDescription(),
    pictures: getPhotos(),
  },
  {
    name: `Tiberias`,
    description: getRandomDescription(),
    pictures: getPhotos(),
  },
  {
    name: `Tel-Aviv`,
    description: getRandomDescription(),
    pictures: getPhotos(),
  },
  {
    name: `Ashdod`,
    description: getRandomDescription(),
    pictures: getPhotos(),
  },
  {
    name: `Ashkelon`,
    description: getRandomDescription(),
    pictures: getPhotos(),
  }
];

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getEventOffers = () => {
  const eventOffers = JSON.parse(JSON.stringify(OFFERS));

  eventOffers.forEach((offer) => {
    if (Math.random() < 0.5) {
      offer.checked = true;
    }
  });
  return eventOffers;
};

const generatePoint = () => {
  const type = getRandomType();

  return {
    type,
    dateFrom: new Date(dateFrom),
    dateTo: new Date(dateTo),
    destination: {
      name: getRandomCity(),
      description: getRandomDescription(),
      pictures: getPhotos(),
    },
    offers: getEventOffers(),
    price: getRandomPrice(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    id: generateId(),
  };
};

export {
  generatePoint, getPhotos, destinations, generateId
};
