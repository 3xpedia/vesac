const jwt = require("jsonwebtoken");
const { symbols } = require("../globals/codes");
const httpStatus = require("./httpStatus");
const registry = require("../globals/registry");
const routes = require("./routes");

const extractAuthToken = req => {
  const header = req.header("Authorization");
  if (!header || !header.includes("Bearer")) {
    return null;
  }
  return header.replace("Bearer ", "");
};

const checkAuthOnRequest = req => {
  return new Promise(resolve => {
    const authOptions = registry.get("AUTH");
    if (!authOptions.enabled) {
      resolve(null);
    }
    const token = extractAuthToken(req);
    if (!token) {
      throw httpStatus.unauthorized("Missing token");
    }
    jwt.verify(token, authOptions.secret, (err, decoded) => {
      if (err) {
        throw httpStatus.unauthorized("Invalid token");
      } else {
        resolve(decoded);
      }
    });
  });
};

const declareAuthRoute = () => {
  const authOptions = registry.get("AUTH");
  if (!authOptions.enabled) {
    return;
  }
  routes.post.unprotected(authOptions.path, ctx => {
    return Promise.resolve()
      .then(() => authOptions.handler(ctx))
      .then(result => {
        if (!result) {
          throw httpStatus.unauthorized("Invalid Auth");
        }
        return httpStatus.ok(
          jwt.sign(result, authOptions.secret, {
            expiresIn: authOptions.expiration,
          }),
        );
      })
      .catch(e => {
        if (!e) {
          throw httpStatus.unauthorized("Invalid Auth");
        }
        throw e;
      });
  });
};

module.exports.checkAuthOnRequest = checkAuthOnRequest;
module.exports.declareAuthRoute = declareAuthRoute;
