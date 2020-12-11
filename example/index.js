const path = require("path");
const vesac = require("../index");

vesac.configure({
  hideSensibleErrors: false,
  languages: ["EN", "FR"],
  translationsFolder: path.resolve(__dirname, "./translations"),
  authHandler: ctx => {
    return new Promise(resolve => {
      if (ctx.req.body && ctx.req.body.user === "admin") {
        resolve({
          id: 123,
        });
      }
      resolve(null);
    });
  },
  authSecret: "AUTH_SECRET",
});

vesac.get.unprotected("/hello", ctx => vesac.httpStatus.created("test"));

vesac.start(3050);
