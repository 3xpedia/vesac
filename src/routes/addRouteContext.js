const getTranslateContext = require("../internationalisation/getTranslateContext");

const createContext = (req, authData) => {
  const translate = getTranslateContext(req);
  return {
    req,
    translate,
    i: translate,
    authorized: authData,
  };
};

const addRouteContext = (req, callback, authData) => {
  return callback(createContext(req, authData));
};

module.exports = addRouteContext;
