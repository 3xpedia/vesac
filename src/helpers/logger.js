const chalk = require("chalk");

/**
 * @param {string | string[]} messages
 */
const inf = (...messages) => {
  console.log(
    `${chalk.bgBlue(" INFO ")} ${chalk.blue(messages.join("\n       "))}`,
  );
};

/**
 * @param {string | string[]} messages
 */
const ok = (...messages) => {
  console.log(
    `${chalk.bgGreen(" SUCCESS ")} ${chalk.green(
      messages.join("\n          "),
    )}`,
  );
};

/**
 * @param {string | string[]} messages
 */
const warn = (...messages) => {
  console.log(
    `${chalk.bgYellow.black(" WARNING ")} ${chalk.yellow(
      messages.join("\n          "),
    )}`,
  );
};

/**
 * @param {string | string[]} messages
 */
const err = (...messages) => {
  console.log(
    `${chalk.bgRed(" ERROR ")} ${chalk.red(messages.join("\n        "))}`,
  );
};

module.exports = {
  inf,
  ok,
  warn,
  err,
};
