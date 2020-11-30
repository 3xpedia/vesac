const logger = require("../helpers/logger");
const { symbols } = require("../globals/codes");
const registry = require("../globals/registry");
const httpStatus = require("./httpStatus");
const addRouteContext = require("./addRouteContext");

const getErrorMessage = error => {
  const or = (val, placeholder) => {
    if (val === undefined || val === null) {
      return val;
    }
    return placeholder;
  };

  if (registry.get("SHOW_FULL_ERRORS")) {
    return or(error.message, error.placeholder);
  } else {
    if (error.isSensible) {
      return error.placeholder;
    }
    return or(error.message, error.placeholder);
  }
};

const throwError = (error, req, res) => {
  let usableError = error;
  if (typeof error !== "object" || !error[symbols.HTTP_RESULT]) {
    logger.warn(
      `Error received is not an HTTP_STATUS sending default 500. Route : ${req.originalUrl}`,
    );
    usableError = httpStatus.internalServerError(error.message);
  }
  res.status(usableError.status).send(getErrorMessage(usableError));
};

const throwResult = (result, req, res) => {
  if (typeof result === "object" && result[symbols.HTTP_RESULT]) {
    res.status(result.status).send(result.payload || result.placeholder);
  } else {
    logger.warn(
      `Result received is not an HTTP_STATUS sending default 200. Route : ${req.originalUrl}`,
    );
    res.status(200).send(result || "Ok");
  }
};

const httpResultHandler = func => (req, res) => {
  try {
    const result = addRouteContext(req, func);
    if (result.then && result.catch) {
      // Handle it as a promise
      result
        .then(r => throwResult(r, req, res))
        .catch(r => throwError(r, req, res));
    } else {
      // Handle it as a sync result
      throwResult(result, req, res);
    }
  } catch (error) {
    throwError(error, req, res);
  }
};

module.exports = httpResultHandler;
