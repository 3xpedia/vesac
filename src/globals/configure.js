const registry = require("./registry");

/**
 * @param {Object=} options
 * @param {boolean} options.hideSensibleErrors
 */
const configure = options => {
  registry.set("SHOW_FULL_ERRORS", !options.hideSensibleErrors || false);
};

module.exports = configure;
