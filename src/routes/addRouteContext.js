const getTranslateContext = require("../internationalisation/getTranslateContext");

const createContext = req => {
  const translate = getTranslateContext(req);
  return {
    req,
    translate,
    i: translate,
  };
};

const addRouteContext = (req, callback) => {
  return callback(createContext(req));
};

module.exports = addRouteContext;
