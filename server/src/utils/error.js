const httpStatus = require('http-status');

const httpError = (code, message) => ({
  code, message
});

const ALREADY_EXISTS = (what) => httpError(httpStatus.CONFLICT, `${what} already exists`);
const INCORRECT_PASSWORD = httpError(httpStatus.BAD_REQUEST, 'incorrect password format');
const INCORRECT_USERNAME = httpError(httpStatus.BAD_REQUEST, 'incorrect username format');
const UNAUTHORIZED = httpError(httpStatus.UNAUTHORIZED, httpStatus[httpStatus.UNAUTHORIZED]);
const INTERNAL_SERVER_ERROR = httpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
const INCORRECT_CREDENTIALS = httpError(httpStatus.FORBIDDEN, 'incorrect credentials');
const BAD_PARAMETER = (which) => httpError(httpStatus.BAD_REQUEST, `bad parameter ${which}`);

module.exports = {
  ALREADY_EXISTS,
  INCORRECT_PASSWORD,
  INCORRECT_USERNAME,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  INCORRECT_CREDENTIALS,
  BAD_PARAMETER
};
