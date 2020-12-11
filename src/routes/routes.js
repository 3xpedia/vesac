const app = require("../globals/app");
const httpResultHandler = require("./httpResultHandler");

/**
 * @param {string} path
 * @param {function} callback
 */
const get = (path, callback) => {
  app.get(path, httpResultHandler(callback, true));
};
Object.defineProperty(get, "unprotected", {
  value: (path, callback) => app.get(path, httpResultHandler(callback, false)),
  writable: false,
  enumerable: false,
});

/**
 * @param {string} path
 * @param {function} callback
 */
const post = (path, callback) => {
  app.get(path, httpResultHandler(callback, true));
};
Object.defineProperty(post, "unprotected", {
  value: (path, callback) => app.post(path, httpResultHandler(callback, false)),
  writable: false,
  enumerable: false,
});

/**
 * @param {string} path
 * @param {function} callback
 */
const put = (path, callback) => {
  app.get(path, httpResultHandler(callback, true));
};
Object.defineProperty(put, "unprotected", {
  value: (path, callback) => app.put(path, httpResultHandler(callback, false)),
  writable: false,
  enumerable: false,
});

/**
 * @param {string} path
 * @param {function} callback
 */
const del = (path, callback) => {
  app.get(path, httpResultHandler(callback, true));
};
Object.defineProperty(del, "unprotected", {
  value: (path, callback) => app.del(path, httpResultHandler(callback, false)),
  writable: false,
  enumerable: false,
});

module.exports = {
  get,
  post,
  put,
  del,
};
