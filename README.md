# VESAC

Vesac enhancement wrapper around [Express.Js](https://www.npmjs.com/package/express).

I often have common functionalities in my projects, 
I'm always copy-pasting files from one project to another.
Vesac aim to be the central point of these projects,
containing code that I often need and re-use.

⛔️ This project will probably not meet your needs or code quality requirements. I mostly develop it for myself. Btw, if you think you could help to improve it, or make it more suitable for people, do not hesitate to get in touch ☺️

Functionalities goal :

- [x] HTTP result/error handler
- [ ] Validations
- [ ] Permissions
- [ ] Auth with JWT
- [ ] Internationalisation
- [ ] Helpers for DB model
- [ ] Reference data
- [ ] Error loging
- [ ] Error reporting

### Basic example :

```javascript
const vesac = require("vesac");

vesac.configure({ hideSensibleErrors: false });

vesac.get("/fail", () => vesac.httpStatus.internalServerError("Error"));

vesac.post("/ok", req => vesac.httpStatus.ok(req.body));

vesac.start(3000);
```

### Topics :

- [vesac](./docs/VESAC.md)
- [HTTP routing](./docs/HTTP_ROUTING.md)
