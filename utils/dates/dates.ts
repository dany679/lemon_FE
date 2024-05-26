import dayjs from "dayjs";
export const getFormatDate = (date: Date) => {
  const newD = new Date(date);
  return `${dayjs(newD).format("MM/YYYY")}`;
};

export const getFormatDateComplete = (date: Date) => {
  const newD = new Date(date);
  return `${dayjs(newD).format("DD/MM/YYYY")}`;
};
