const app = require("./app");
const routes = require("../routes/routes");
const httpStatus = require("../routes/httpStatus");

/**
 * @param {number} port
 */
const start = port => {
  routes.get("/*", () => httpStatus.notFound());
  app.listen(port, () => console.log(`App listening on ${port}`));
};

module.exports = start;
