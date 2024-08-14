export const truncate = (value, length, suffix = "...") => {
  if (value.length <= length) {
    return value;
  }

  return value.slice(0, length) + " " + suffix;
};
