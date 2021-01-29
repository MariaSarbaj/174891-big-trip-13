import dayjs from "dayjs";

const Durations = {
  hour: 3600000,
  day: 86400000
};

const formatEventDate = (dateFrom) => {
  return dayjs(dateFrom).format(`D MMM`);
};

const formatEventTime = (time) => {
  return dayjs(time).format(`HH:MM`);
};

const formatEventDuration = (finish, start) => {
  const eventDuration = finish - start;
  switch (eventDuration) {
    case (eventDuration < Durations.hour):
      return dayjs(eventDuration).format(`HH`);
    case (eventDuration > Durations.hour && eventDuration < Durations.day):
      return dayjs(eventDuration).format(`HH:MM`);
    default:
      return dayjs(eventDuration).format(`D HH:MM`);
  }
};

export {formatEventDate, formatEventTime, formatEventDuration};
