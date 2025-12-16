export const formatDate = (isoDate) => {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getShortId = (id, length = 6) => {
  if (!id) return "";
  return ("SR-"+id.slice(-length).toUpperCase());
};

export const gstAmount = (amount) => {
  const totalAmount = Number(amount);

  const baseAmount = +(totalAmount / 1.18).toFixed(2);
  const sgst = +(baseAmount * 0.09).toFixed(2);
  const cgst = +(baseAmount * 0.09).toFixed(2);
  return ({baseAmount, sgst, cgst})
};