const logger = require("../helpers/logger");
const registry = require("../globals/registry");

const translate = language => (file, key) => {
  const int = registry.get("INTERNATIONALISATION");
  if (!int.enabled) {
    logger.warn(
      "Internationalisation is not enabled but translate has been called.",
      `Parameters: ${language} - ${file}.${key}`,
    );
    return `${file}.${key}`;
  }
  try {
    return int.translations[file][key][language];
  } catch (e) {
    console.warn(`No translation found for ${file}.${key}.${language}`);
    return `${file}.${key}`;
  }
};

module.exports = translate;
