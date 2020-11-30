const configure = require("./src/globals/configure");
const start = require("./src/globals/start");
const { get, post, put, del } = require("./src/routes/routes");
const httpStatus = require("./src/routes/httpStatus");

module.exports = {
  configure,
  start,
  get,
  post,
  put,
  del,
  httpStatus,
};
