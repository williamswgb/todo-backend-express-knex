const capitalizeFirstLetter = (val) =>
  String(val).charAt(0).toUpperCase() + String(val).slice(1);

module.exports = {
  capitalizeFirstLetter,
};
