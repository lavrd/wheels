const validator = require('validator');
const error = require('./error');

const isWheel = (wheel) => {
  if (!validator.isBase64(wheel.model.toString().slice(29)))
    return error.BAD_PARAMETER('model');
  if (!validator.isBase64(wheel.preview.toString().slice(23)))
    return error.BAD_PARAMETER('preview');
  if (!validator.isDecimal(wheel.price.toString()) || wheel.price < 0)
    return error.BAD_PARAMETER('price');
  if (wheel.description.length > 256)
    return error.BAD_PARAMETER('description');
  if (wheel.name.length > 64)
    return error.BAD_PARAMETER('name');
  return null;
};

const isUsername = (username) => {
  return !username || username.length > 64 || !validator.isAscii(username.toString());
};

const isPassword = (password) => {
  return !!password || (password.length >= 8 && password.length <= 64);
};

const isAscii = (string) => {
  return validator.isAscii(string.toString());
};

module.exports = {isWheel, isAscii, isUsername, isPassword};
