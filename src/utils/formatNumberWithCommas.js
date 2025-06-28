export const formatNumberWithCommas = (number) => {
  if (typeof number !== "number" && typeof number !== "string") {
    return "Invalid Number";
  }

  const numStr = String(number);

  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
