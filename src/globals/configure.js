const fs = require("fs");
const path = require("path");
const registry = require("./registry");
const logger = require("../helpers/logger");
const checkTranslations = require("../internationalisation/checkTranslations");

const getInternationalisationOptions = options => {
  if (!options.languages) {
    return {
      enabled: false,
    };
  }
  const translations = {};
  if (!options.translationsFolder) {
    logger.err("No folder defined for translations");
    process.exit(1);
  } else {
    try {
      const files = fs.readdirSync(options.translationsFolder);
      files.forEach(f => {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        translations[path.basename(f, ".js")] = require(path.join(
          options.translationsFolder,
          f,
        ));
      });
    } catch (e) {
      logger.err(`Error during translations reading : ${e.message}`);
      process.exit(1);
    }
  }
  if (!Array.isArray(options.languages) || options.languages.length === 0) {
    logger.err("Languages list is empty");
    process.exit(1);
  }

  return {
    enabled: true,
    languages: options.languages,
    defaultLanguage: options.languages[0],
    translations,
    languageHeader: options.languageHeader || "x-language",
  };
};

/**
 * @param {Object=} options
 * @param {boolean=} options.hideSensibleErrors
 * @param {string[]=} options.languages
 * @param {string=} options.translationsFolder
 * @param {string=} options.languageHeader
 */
const configure = options => {
  registry.set("SHOW_FULL_ERRORS", !options.hideSensibleErrors || false);
  registry.set("INTERNATIONALISATION", getInternationalisationOptions(options));

  checkTranslations();
};

module.exports = configure;
