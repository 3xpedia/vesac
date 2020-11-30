const registry = require("../globals/registry");
const logger = require("../helpers/logger");

const checkTranslations = () => {
  const int = registry.get("INTERNATIONALISATION");
  const translations = Object.entries(int.translations);

  if (translations.length <= 0) {
    logger.warn("No translations found");
  }

  translations.forEach(([name, translation]) => {
    if (typeof translation !== "object") {
      logger.err(
        `Translation file for ${name} do not export an object.`,
        'Please respect the format "module.exports = {}"',
      );
      process.exit(1);
    }

    Object.entries(translation).forEach(
      ([translationKey, translationValue]) => {
        // Check for missing keys
        int.languages.map(neededKey => {
          if (!translationValue[neededKey]) {
            logger.warn(
              `${translationKey} is missing a translation for ${neededKey} in ${name}.js`,
            );
          }
        });
        // Check for unknown keys
        Object.keys(translationValue).forEach(language => {
          if (!int.languages.includes(language)) {
            logger.warn(
              `${translationKey} has un unknown translation for ${language} in ${name}.js`,
            );
          }
        });
      },
    );
  });
};

module.exports = checkTranslations;
