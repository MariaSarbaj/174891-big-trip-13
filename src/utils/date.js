import dayjs from "dayjs";


const generateEventDate = (dateFrom) => {
  return dayjs(dateFrom).format(`D MMM`);
};

const generateEventStartTime = (dateFrom) => {
  return dayjs(dateFrom).format(`HH:MM`);
};

const generateEventEndTime = (dateTo) => {
  return dayjs(dateTo).format(`HH:MM`);
};

export {generateEventDate, generateEventStartTime, generateEventEndTime};
