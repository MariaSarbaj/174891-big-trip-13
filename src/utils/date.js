import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatEventDate = (dateFrom) => {
  return dayjs(dateFrom).format(`D MMM`);
};

const formatEventTime = (time) => {
  return dayjs(time).format(`HH:MM`);
};

const formatEventDuration = (finish, start) => {
  const eventDuration = dayjs.duration(finish - start);
  const days = eventDuration.days();
  const hours = eventDuration.hours();
  const minutes = eventDuration.minutes();

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }

  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }

  return minutes > 0 ? `${minutes}M` : ``;

};

export {formatEventDate, formatEventTime, formatEventDuration};
