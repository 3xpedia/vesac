const { symbols } = require("../globals/codes");

const successHttpStatus = (status, placeholder) => payload => {
  return {
    status,
    payload,
    [symbols.HTTP_RESULT]: true,
    placeholder,
  };
};

class HttpError extends Error {
  constructor(status, message, placeholder, isSensible) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.message = message || placeholder;
    this.status = status;
    this.placeholder = placeholder;
    this.isSensible = isSensible;
    this[symbols.HTTP_RESULT] = true;
  }
}

const failureHttpStatus = (status, placeHolder, isSensible) => {
  const factory = payload => {
    throw new HttpError(status, payload, placeHolder, isSensible);
  };
  Object.defineProperty(factory, symbols.INTERNALS.NO_THROW, {
    value: payload => new HttpError(status, payload, placeHolder, isSensible),
    enumerable: false,
    writable: false,
  });
  return factory;
};

const ok = successHttpStatus(200, "Ok");
const created = successHttpStatus(201, "Created");
const accepted = successHttpStatus(202, "Accepted");

const movedPermanently = successHttpStatus(301, "Moved Permanently");
const found = successHttpStatus(302, "Found");
const notModified = successHttpStatus(304, "Not Modified");

const badRequest = failureHttpStatus(400, "Bad Request", false);
const unauthorized = failureHttpStatus(401, "Unauthorized", false);
const forbidden = failureHttpStatus(403, "Forbidden", false);
const notFound = failureHttpStatus(404, "Not Found", false);
const methodNotAllowed = failureHttpStatus(405, "Method Not Allowed", false);

const internalServerError = failureHttpStatus(
  500,
  "Internal Server Error",
  true,
);
const notImplemented = failureHttpStatus(501, "Not Implemented", true);
const badGateway = failureHttpStatus(502, "Bad Gateway", true);
const serviceUnavailable = failureHttpStatus(503, "Service Unavailable", true);

module.exports = {
  ok,
  created,
  accepted,
  movedPermanently,
  found,
  notModified,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  methodNotAllowed,
  internalServerError,
  notImplemented,
  badGateway,
  serviceUnavailable,
};
