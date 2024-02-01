export function NumParams(paramNum: string | null, alternativeNumber: number) {
  if (paramNum && Number.isInteger(Number(paramNum))) {
    return Number(paramNum);
  }
  return alternativeNumber;
}
export function StringParams(
  paramString: string | null,
  alternativeString = ""
) {
  if (paramString && paramString.trim() !== "") {
    return decodeURI(paramString);
  }
  return alternativeString;
}
export function StringParamsCheck(
  paramString: string | null,
  alternativeString = "",
  arrayToCheck: string[]
) {
  if (paramString && paramString.trim() !== "") {
    const decodeString = paramString;
    if (arrayToCheck.includes(decodeString))
      return encodeURIComponent(paramString).replaceAll("+", "%2B");
  }
  return alternativeString;
}

export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};
