import {EVENT_TYPES} from "../const";

const MAX_DESCRIPTION_SENTENCES = 5;
const MIN_DESCRIPTION_SENTENCES = 1;

const CITIES = [`Jerusalem`, `Haifa`, `Be'er-Sheva`, `Eilat`, `Tiberias`, `Tel-Aviv`, `Ashdod`, `Ashkelon`];

const Time = {
  HOUR: 26280,
  MINUTE: 40320,
};

const eventOffers = {
  'bus': [
    {
      title: `Infotainment system`,
      price: 50
    },
    {
      title: `Order meal`,
      price: 100
    },
    {
      title: `Choose seats`,
      price: 190
    }
  ],
  'check-in': [
    {
      title: `Choose the time of check-in`,
      price: 70
    },
    {
      title: `Choose the time of check-out`,
      price: 190
    },
    {
      title: `Add breakfast`,
      price: 110
    },
    {
      title: `Laundry`,
      price: 140
    },
    {
      title: `Order a meal from the restaurant`,
      price: 30
    }
  ],
  'drive': [
    {
      title: `Choose comfort class`,
      price: 110
    },
    {
      title: `Choose business class`,
      price: 180
    }
  ],
  'flight': [
    {
      title: `Choose meal`,
      price: 120
    },
    {
      title: `Choose seats`,
      price: 90
    },
    {
      title: `Upgrade to comfort class`,
      price: 120
    },
    {
      title: `Upgrade to business class`,
      price: 120
    },
    {
      title: `Add luggage`,
      price: 170
    },
    {
      title: `Business lounge`,
      price: 160
    }
  ],
  'restaurant': [
    {
      title: `Choose live music`,
      price: 150
    },
    {
      title: `Choose VIP area`,
      price: 70
    }
  ],
  'ship': [
    {
      title: `Choose meal`,
      price: 130
    },
    {
      title: `Choose seats`,
      price: 160
    },
    {
      title: `Upgrade to comfort class`,
      price: 170
    },
    {
      title: `Upgrade to business class`,
      price: 150
    },
    {
      title: `Add luggage`,
      price: 100
    },
    {
      title: `Business lounge`,
      price: 40
    }
  ],
  'sightseeing': [
    {
      title: `Book a ticket`,
      price: 80
    },
    {
      title: `Individual excursion`,
      price: 200
    },
  ],
  'taxi': [
    {
      title: `Upgrade to a business class`,
      price: 190
    },
    {
      title: `Choose the radio station`,
      price: 30
    },
    {
      title: `Choose temperature`,
      price: 170
    },
    {
      title: `Drive quickly, I'm in a hurry`,
      price: 100
    },
    {
      title: `Drive slowly`,
      price: 110
    }
  ],
  'train': [
    {
      title: `Book a taxi at the arrival point`,
      price: 110
    },
    {
      title: `Order a breakfast`,
      price: 80
    },
    {
      title: `Wake up at a certain time`,
      price: 140
    }
  ],
  'transport': [
    {
      title: `Choose seats`,
      price: 160
    }
  ],
};

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

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length);

  return array[randomIndex];
};

const getRandomOffers = (offers) => {
  const offersAmount = getRandomInteger(0, offers.length - 1);
  const randomOffers = [];

  for (let i = 0; i < offersAmount; i++) {
    const offer = getRandomArrayItem(offers);
    if (randomOffers.indexOf(offer) === -1) {
      randomOffers.push(offer);
    }
  }

  return randomOffers;
};

const generatePoint = () => {
  const type = getRandomType();
  const activeOffers = eventOffers[type] ? getRandomOffers(eventOffers[type]) : null;

  return {
    type,
    dateFrom: new Date(dateFrom),
    dateTo: new Date(dateTo),
    destination: {
      name: getRandomCity(),
      description: getRandomDescription(),
      pictures: getPhotos(),
    },
    offers: eventOffers[type],
    activeOffers,
    price: getRandomPrice(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    id: generateId(),
  };
};

export {
  generatePoint, getPhotos, destinations
};
