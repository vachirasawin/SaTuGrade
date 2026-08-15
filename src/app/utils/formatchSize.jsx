export const formatSize = (value, unit) => {
  if (!value) return "auto";
  
  if (typeof value === "number" || (!isNaN(value) && !isNaN(parseFloat(value)))) {
    return `${value}${unit ? unit : "px"}`;
  }
  
  return value;
};