export const formatDate = (isoDate) => {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getShortId = (id, length = 6) => {
  if (!id) return "";
  return id.slice(-length).toUpperCase();
};
