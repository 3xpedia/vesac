const configure = require("./globals/configure");
const start = require("./globals/start");
const { get, post, put, del } = require("./routes/routes");
const httpStatus = require("./routes/httpStatus");

module.exports = {
  configure,
  start,
  get,
  post,
  put,
  del,
  httpStatus,
};
