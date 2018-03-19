const validator = require('validator');
const utils = require('../utils');

const isWheel = (wheel) => {
  if (!validator.isBase64(wheel.model))
    return utils.error.BAD_PARAMETER('model');
  if (!validator.isBase64(wheel.preview))
    return utils.error.BAD_PARAMETER('preview');
  if (!validator.isDecimal(wheel.price))
    return utils.error.BAD_PARAMETER('price');
  if (wheel.description.length > 256)
    return utils.error.BAD_PARAMETER('description');
  if (wheel.name.length > 64)
    return utils.error.BAD_PARAMETER('name');
  return null;
};

const isAscii = (string) => {
  return validator.isAscii(string);
};

module.exports = {isWheel, isAscii};
