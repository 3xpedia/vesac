const app = require("../globals/app");
const httpResultHandler = require("./httpResultHandler");

/**
 * @param {string} path
 * @param {function} callback
 */
const get = (path, callback) => {
  app.get(path, httpResultHandler(callback));
};

/**
 * @param {string} path
 * @param {function} callback
 */
const post = (path, callback) => {
  app.get(path, httpResultHandler(callback));
};

/**
 * @param {string} path
 * @param {function} callback
 */
const put = (path, callback) => {
  app.get(path, httpResultHandler(callback));
};

/**
 * @param {string} path
 * @param {function} callback
 */
const del = (path, callback) => {
  app.get(path, httpResultHandler(callback));
};

module.exports = {
  get,
  post,
  put,
  del,
};
