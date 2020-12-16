import dayjs from "dayjs";


const formatEventDate = (dateFrom) => {
  return dayjs(dateFrom).format(`D MMM`);
};

const formatEventTime = (time) => {
  return dayjs(time).format(`HH:MM`);
};

export {formatEventDate, formatEventTime};
