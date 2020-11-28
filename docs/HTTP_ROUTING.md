# HTTP ROUTING

The HTTP routing system is a simple wrapper around [Express.Js](https://www.npmjs.com/package/express) with some additional error management.

### Basic usage :

```javascript
const vesac = require("vesac");

vesac.configure({ hideSensibleErrors: false });

vesac.get("/fail", () => vesac.httpStatus.internalServerError("Error"));
vesac.post("/ok", req => vesac.httpStatus.ok(req.body));
vesac.put("/ok", req => Promise.resolve(req.body));
vesac.del("/ok", req => req.body);

vesac.start(3000);
```

Vesac provides `get`, `post`, `put` and `del` functions. They are pretty much Express's one. The difference is the callback function you pass, that do not have access to the classic `res` object. Vesac will handle it for you.

Anything returned by your callback will be forwarded to the client, here are the rules :

- Everything is forwarded with a HTTP/200. if it is an object, it will be JSON-ified.
- Errors will be treated as HTTP/500 by default.
- Promises works the same way
- You can return a `vesac.httpStatus` to provide some insight on the status that should be sent.

See [generic doc](./VESAC.md) or info on `configure` and `start`;

### Available httpStatus :

Here is the list of currently available `httpStatus` you can return from your callback.

| Status                                 | HTTP Status | Default Message       |
| -------------------------------------- | ----------- | --------------------- |
| vesac.httpStatus.`ok`                  | 200         | Ok                    |
| vesac.httpStatus.`created`             | 201         | Created               |
| vesac.httpStatus.`accepted`            | 202         | Accepted              |
| vesac.httpStatus.`movedPermanently`    | 301         | Moved Permanently     |
| vesac.httpStatus.`found`               | 302         | Found                 |
| vesac.httpStatus.`notModified`         | 304         | Not Modified          |
| vesac.httpStatus.`badRequest`          | 400         | Bad Request           |
| vesac.httpStatus.`unauthorized`        | 401         | Unauthorized          |
| vesac.httpStatus.`forbidden`           | 403         | Forbidden             |
| vesac.httpStatus.`notFound`            | 404         | Not Found             |
| vesac.httpStatus.`methodNotAllowed`    | 405         | Method Not Allowed    |
| vesac.httpStatus.`internalServerError` | 500         | Internal Server Error |
| vesac.httpStatus.`notImplemented`      | 501         | Not Implemented       |
| vesac.httpStatus.`badGateway`          | 502         | Bad Gateway           |
| vesac.httpStatus.`serviceUnavailable`  | 503         | Service Unavailable   |

All these function take one optional parameter : the payload (any type accepted).

If no payload is provided, the default message is used.

If an error occurs in the code and is not catched, it will be by vesa and managed as a 500, with the payload being the message of the error.

If the option `hideSensibleErrors` is set to true at `configure` level, all 5xx errors payload will be replaced by the default message. I recommend using this option for production environment.
