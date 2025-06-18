export const formatUTCToMyanmarTime = (utcTimestamp) => {
  const date = new Date(utcTimestamp);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Yangon",
  };

  const formattedString = date.toLocaleString("en-GB", options);

  const finalFormat = formattedString
    .replace(/\//g, "-")
    .replace(", ", " (")
    .concat(")");

  return finalFormat;
};
