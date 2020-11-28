/**
 * @param {string | string[]} messages
 */
const inf = (...messages) => {
  console.log(...messages);
};

/**
 * @param {string | string[]} messages
 */
const warn = (...messages) => {
  console.warn(...messages);
};

/**
 * @param {string | string[]} messages
 */
const err = (...messages) => {
  console.error(...messages);
};

module.exports = {
  inf,
  warn,
  err,
};
