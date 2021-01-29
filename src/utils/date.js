import dayjs from "dayjs";

const Duration = {
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000
};

const formatEventDate = (dateFrom) => {
  return dayjs(dateFrom).format(`D MMM`);
};

const formatEventTime = (time) => {
  return dayjs(time).format(`HH:MM`);
};

const createTimeString = (value, signString) => {
  let timeString = ``;

  if (value > 0 && value < 10) {
    timeString = `0` + value + signString;
  }

  if (value > 10) {
    timeString = value + signString;
  }

  return timeString;
};

const formatEventDuration = (finish, start) => {
  const eventDuration = finish - start;

  const eventDurationDays = Math.trunc(eventDuration / Duration.DAY);
  const daysString = createTimeString(eventDurationDays, `D`);

  const eventDurationHours = Math.trunc((eventDuration % Duration.DAY) / Duration.HOUR);
  const hoursString = createTimeString(eventDurationHours, `H`);

  const eventDurationMinutes = Math.trunc(((eventDuration % Duration.DAY) % Duration.HOUR) / Duration.MINUTE);
  const minutesString = createTimeString(eventDurationMinutes, `M`);

  return `${daysString} ${hoursString} ${minutesString}`;
};

export {formatEventDate, formatEventTime, formatEventDuration};
