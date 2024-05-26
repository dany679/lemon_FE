const maskOnlyLetters = (value: string) => {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
};

// Aceita apenas números
const maskOnlyNumbers = (value: string) => {
  return value.replace(/\D/g, "");
};
const unMaskToInt = (value: string) => {
  const intValue = parseInt(value.replace(/\D/g, ""));
  if (isNaN(intValue)) return 0;
  return intValue;
};
const unMaskNumbersToString = (numberMasked: number) => {
  const numberK = numberMasked * 1000;
  const valueMask = Number(Number(numberK) / 1000);
  console.log(valueMask.toFixed(3), "valueMask");
  return String(valueMask ? `${valueMask.toFixed(3)}` : "");
};

const maskCurrency = (valor: any, locale = "pt-BR", currency = "BRL") => {
  //do not change valor type to number because this way we can get as string and not parse errors
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Math.abs(Number(valor))); //only positive
};
const maskRealBRL = (valueRecive: string) => {
  const onlyDigits = valueRecive
    .split("")
    .filter((s) => /\d/.test(s))
    .join("")
    .padStart(3, "0");
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
  const value = maskCurrency(digitsFloat);
  return value;
};
const maskValueToKValue = (valueRecive: string, prefix = "Kwh") => {
  const addPrefix = prefix ? prefix + " " : "";
  const onlyDigits = valueRecive
    .split("")
    .filter((s) => /\d/.test(s))
    .join("")
    .padStart(3, "0");
  // const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
  const digitsFloat = Number(onlyDigits) / 1000;
  const valueMili = onlyDigits.length >= 4 ? Number(onlyDigits) / 1000 : `0.${onlyDigits}`;
  // const parse = Number(digitsFloat).toFixed(2);
  const mystring = String(valueMili).replace(/[,.]/g, (m) => (m === "," ? "." : ","));
  const value = addPrefix + `${mystring}`;
  return value;
};
const unMaskValueToNumber = (valueRecive: string) => {
  const myString = String(valueRecive).replace(/[,.]/g, (m) => (m === "," ? "." : ","));
  return Number(myString).toFixed(2);
};
const unMaskMoneyToNumber = (valueRecive: string) => {
  const digitis = String(valueRecive).replace("R$", "").replace(".", "").trim();
  const valueString = unMaskValueToNumber(digitis);
  return Number(valueString).toFixed(2);
};
const defaultBRLReal = "R$ 0,00";
const defaultKWh = "Kwh 0,00";
export {
  defaultBRLReal,
  defaultKWh,
  maskCurrency,
  maskOnlyLetters,
  maskOnlyNumbers,
  maskRealBRL,
  maskValueToKValue,
  unMaskMoneyToNumber,
  unMaskNumbersToString,
  unMaskToInt,
  unMaskValueToNumber,
};
