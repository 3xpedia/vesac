const vesac = require("../index");

vesac.configure({ hideSensibleErrors: false });

vesac.get("/hello", () =>
  Promise.resolve(vesac.httpStatus.internalServerError("Error")),
);

vesac.start(3050);
