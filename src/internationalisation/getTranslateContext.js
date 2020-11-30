const registry = require("../globals/registry");
const translate = require("./translate");
const logger = require("../helpers/logger");

const getTranslateContext = req => {
  const int = registry.get("INTERNATIONALISATION");
  if (int.enabled) {
    let language = req.header(int.languageHeader);
    if (!language) {
      language = int.defaultLanguage;
    } else if (!int.languages.includes(language)) {
      logger.warn(
        `Unknown language found for route ${req.originalUrl} : ${language}`,
        `Switching to default language : ${int.defaultLanguage}`,
      );
      language = int.defaultLanguage;
    }
    return translate(language);
  }
  return translate("EN");
};

module.exports = getTranslateContext;
