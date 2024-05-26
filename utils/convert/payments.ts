import { maskOnlyNumbers } from "@/utils/mask/values";
import { convertStringNumber } from "./stringNumber";
const basicValuesFees = (valuesFees: string[]) => {
  if (!valuesFees || valuesFees.length === 0 || valuesFees.length < 2) {
    return { qnt: parseFloat("0.00").toFixed(2), price: parseFloat("0.00").toFixed(2) };
  }
  const arrayValues = valuesFees.filter((item) => item !== "");
  return arrayValues.length >= 2
    ? {
        qnt: maskOnlyNumbers(valuesFees.filter((item) => item !== "")?.[0]),
        price: convertStringNumber(valuesFees.filter((item) => item !== "")?.[2]),
      }
    : {
        qnt: 0,
        price: parseFloat("0.00").toFixed(2),
      };
};
export { basicValuesFees };
