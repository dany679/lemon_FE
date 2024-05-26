const monthStringList = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
export const monthCompleteStringList = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO",
] as const;
export const monthsIn = [...monthCompleteStringList, " "] as const;
export const monthsInSend = [...monthCompleteStringList] as const;
export type monthsTypeSend =
  | "JANEIRO"
  | "FEVEREIRO"
  | "MARÇO"
  | "ABRIL"
  | "MAIO"
  | "JUNHO"
  | "JULHO"
  | "AGOSTO"
  | "SETEMBRO"
  | "OUTUBRO"
  | "NOVEMBRO"
  | "DEZEMBRO";
export type monthsT = monthsTypeSend & " ";
export const findMonthByString = (stringMonth: string) => {
  const month = monthStringList.indexOf(stringMonth.trim().substring(0, 3).toUpperCase());

  if (month === -1) {
    return -1;
  }
  return month;
};
export const findMonthByDate = (dateMonth: Date) => {
  const monthsIndex = new Date(dateMonth).getMonth();
  // console.log(monthsIndex)
 return monthStringList[monthsIndex];
};

export const findMonthStringById = (stringMonth: number | string) => {
  const month = monthCompleteStringList[Number(stringMonth)];
  return month;
};
