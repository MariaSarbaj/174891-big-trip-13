import dayjs from "dayjs";

const formatEventDate = (dateFrom) => {
  return dayjs(dateFrom).format(`D MMM`);
};

const formatEventTime = (time) => {
  return dayjs(time).format(`HH:MM`);
};

const formatEventDuration = (finish, start) => {
  const getEventDuration = dayjs.duration(finish - start);
  const days = getEventDuration.days();
  const hours = getEventDuration.hours();
  const minutes = getEventDuration.minutes();

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }

  if (days === 0 && hours > 0) {
    return `${hours}H ${minutes}M`;
  }

  return `${minutes}M`;

};

export {formatEventDate, formatEventTime, formatEventDuration};
