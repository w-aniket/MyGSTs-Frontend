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

export const computeGst = (base, gstEnabled) => {
  const baseAmount = +Number(base).toFixed(2);
  if (!gstEnabled) {
    return { baseAmount, sgst: 0, cgst: 0, total: baseAmount, gstApplied: false };
  }
  const sgst = +(baseAmount * 0.09).toFixed(2);
  const cgst = +(baseAmount * 0.09).toFixed(2);
  const total = +(baseAmount + sgst + cgst).toFixed(2);
  return { baseAmount, sgst, cgst, total, gstApplied: true };
};