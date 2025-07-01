export const convertIDFormatted = (number, prefixCount = 5) => {
  return String(number).padStart(prefixCount, "0");
};
