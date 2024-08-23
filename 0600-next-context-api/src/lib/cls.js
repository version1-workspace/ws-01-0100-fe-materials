export const classHelper = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) {
      return acc + " " + key;
    }

    return acc;
  }, "");

export const join = (...args) => {
  return args.join(" ");
};
