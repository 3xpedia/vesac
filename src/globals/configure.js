const fs = require("fs");
const path = require("path");
const express = require("express");
const registry = require("./registry");
const logger = require("../helpers/logger");
const checkTranslations = require("../internationalisation/checkTranslations");
const auth = require("../routes/auth");
const app = require("./app");

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

const getAuthOptions = options => {
  if (options.authHandler) {
    // We have auth activated
    if (!options.authSecret) {
      logger.err("Missing authSecret for auth at vesac.configure");
      process.exit(1);
    } else if (typeof options.authSecret !== "string") {
      logger.err("authSecret is not a string at vesac.configure");
      process.exit(1);
    }
    return {
      enabled: true,
      handler: options.authHandler,
      path: options.authPath || "/auth",
      secret: options.authSecret,
      expiration: options.authExpiration || "1d",
    };
  }
  // No auth
  if (options.authPath) {
    logger.warn("authPath is defined without authHandler at vesac.configure");
  }
  if (options.authSecret) {
    logger.warn("authSecret is defined without authHandler at vesac.configure");
  }
  return {
    enabled: false,
  };
};

const postConfigure = () => {
  checkTranslations();
  app.use(express.json());
  auth.declareAuthRoute();
};

/**
 * @param {Object=} options
 * @param {boolean=} options.hideSensibleErrors
 * @param {string[]=} options.languages
 * @param {string=} options.translationsFolder
 * @param {string=} options.languageHeader
 * @param {function=} options.authHandler
 * @param {string=} options.authPath
 * @param {string=} options.authSecret
 * @param {string=} options.authExpiration
 */
const configure = options => {
  registry.set("SHOW_FULL_ERRORS", !options.hideSensibleErrors || false);
  registry.set("INTERNATIONALISATION", getInternationalisationOptions(options));
  registry.set("AUTH", getAuthOptions(options));
  postConfigure();
};

module.exports = configure;
