export const convertStringNumber = (string: string) => {
  if (!string || string === "" || string.trim() === "") return 0;
  const str = string.replace(".", "").replace(",", ".");
  return str ? parseFloat(str) : 0;
};
