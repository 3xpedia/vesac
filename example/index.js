const path = require("path");
const vesac = require("../index");

vesac.configure({
  hideSensibleErrors: false,
  languages: ["EN", "FR"],
  translationsFolder: path.resolve(__dirname, "./translations"),
});

vesac.get("/hello", ctx => vesac.httpStatus.created(ctx.i("entities", "test")));

vesac.start(3050);
