# VESAC

Vesac is an enhancement wrapper around [Express.Js](https://www.npmjs.com/package/express)

I often have common functionalities in my projects,
I'm always copy-pasting files from one project to another.
Vesac aim to be the central point of these projects,
containing code that I often need and re-use.

⛔️ This project will probably not meet your needs or code quality requirements. I mostly develop it for myself. Btw, if you think you could help to improve it, or make it more suitable for people, do not hesitate to get in touch.️

Functionalities goal :

- [x] HTTP result/error handler
- [x] Internationalisation
- [ ] Auth with JWT
- [ ] References data
- [ ] Validations
- [ ] Permissions
- [ ] Helpers for DB model
- [ ] Error loging
- [ ] Error reporting

## Table of content

- [Install](#install)
- [Basic Usage](#basic-usage)
- [Vesac API](#vesac-api)
- [Configure vesac](#configure-vesac)
- [Routing](#routing)
- [Internationalisation](#internationalisation)

## Install

`$ npm i --save vesac`

```javascript
const vesac = require("vesac");
```

## Basic usage

```javascript
const vesac = require("vesac");

vesac.configure({ hideSensibleErrors: false });

vesac.get("/fail", () => vesac.httpStatus.internalServerError("Error"));

vesac.post("/ok", ctx => vesac.httpStatus.ok(ctx.req.body));

vesac.start(3000);
```

## Vesac API

| Name       | Description                     | Link                                |
| :--------- | :------------------------------ | :---------------------------------- |
| configure  | Basic vesac configuration       | [Configure vesac](#configure-vesac) |
| start      | Start the HTTP server           | [Configure vesac](#configure-vesac) |
| get        | Declare a GET route             | [Routing](#routing)                 |
| post       | Declare a POST route            | [Routing](#routing)                 |
| put        | Declare a PUT route             | [Routing](#routing)                 |
| del        | Declare a DELETE route          | [Routing](#routing)                 |
| httpStatus | List of available HTTP statuses | [Routing](#routing)                 |

`vesac.configure` should always be called before other interactions with the library.

## Configure vesac

vesac.configure(`options`)

### Syntax

```javascript
const vesac = require("vesac");

vesac.configure({
  hideSensibleErrors: false,
  languages: ["EN", "FR"],
  translationsFolder: path.resolve(__dirname, "./translations"),
});
```

### Api

| Name               | Type       | Mandatory                                    | Default      | Description                                                                  |
| ------------------ | ---------- | -------------------------------------------- | ------------ | ---------------------------------------------------------------------------- |
| hideSensibleErrors | `boolean`  | ❌                                           | `true`       | Hide all the 5xx errors message                                              |
| languages          | `string[]` | ❌                                           | []           | Activate the internationalisation and define the list of languages available |
| languageHeader     | `string`   | ❌                                           | `x-language` | Defines the header the client should send to define it's language            |
| translationsFolder | `path`     | Mandatory if internationalisation is enabled | none         | Provides the list of translations files                                      |

## Routing

vesac.get(`path`, `callback`)

vesac.post(`path`, `callback`)

vesac.put(`path`, `callback`)

vesac.del(`path`, `callback`)

### Syntax

```javascript
const vesac = require("vesac");

vesac.configure({});

vesac.get("/fail", () => vesac.httpStatus.internalServerError("Error"));
vesac.post("/ok", ctx => vesac.httpStatus.created(ctx.req.body));
vesac.put("/ok/:id", ctx => Promise.resolve(httpStatus.ok(ctx.req.params.id)));
vesac.del("/ok", ctx => ctx.req.body);

vesac.start(3000);
```

`get`, `post`, `put` and `del` works the same way as in [Express.Js](https://www.npmjs.com/package/express): It takes a path and a callback. If the path is fulfilled, the callback is fired.

The great difference at this level between vesac and express is that in vesac, the callback do not receive and manage explicitly the `res` object. Vesac will handle this object basec on the output of the callback.

The callback can return :

- Simpe data (string, number, ...)
- JS object or arry (they will be JSON-ified)
- An error
- A promise (which can fulfil or not)
- A vesac HTTP status

The recommanded approach is to use promises resolving or throwing vesac HTTP status.

The vesac default approach is to respond with HTTP/200 for anything but errors and HTTP/500 for errors. You can change this behavior by returning a specific vesac.httpStatus.

### `vesac.httpStatus`

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

All of them take one optional parameter : the payload (any type accepted).

If no payload is provided, the default message is used. If hideSensibleErrors has been defined at configure level, any payload passed to a 5xx error is ignored and the default message is sent to the client.

### request context

The callback receive a context, which contains :

| Name      | Type       | Description                                                             |
| --------- | ---------- | ----------------------------------------------------------------------- |
| req       | `object`   | The Express.Js request object                                           |
| translate | `function` | Translation function. See [Internationalisation](#internationalisation) |
| i         | `function` | A `translate` alias                                                     |

## Internationalisation

Vesac internationalisation works this way :

- You configure it at `vesac.configure` level
- You provide translations files
- In the context of requests you have a `translate` function that provides a translation for anything you need
- The language to use is defined by a header sent by the client

### Translation files

A translation file should have this form factor :

```javascript
// landing.js
module.exports = {
  this_is_vesac: {
    EN: "This is vesac",
    FR: "Voici vesac",
  },
  want_see_doc: {
    EN: "Want to see the doc?",
    FR: "Vous avez envie de voir la doc?",
  },
};
```

You need to place them in a specific folder that DO NOT contain anything else than translation files. The folder location is defined at `vesac.configure` level with the option translationsFolder.

### Config

```javascript
vesac.configure({
  languages: ["EN", "FR"],
  translationsFolder: path.resolve(__dirname, "./translations"),
  languageHeader: "xxx-language",
});
```

The list of language should match the languages you define in the translations files. The first one is always the default one.

The language header defines the header vesac should looks for in order to determine the right translation to use. If none is sent, or if it is not in the list of languages, the default one will be used.

### request context

translate(`file`, `key`)

i(`file`, `key`)

In the requests callback you have access to `translate` and `i` who provides translations.

```javascript
vesac.get("/hello", ctx =>
  vesac.httpStatus.ok(ctx.i("landing", "this_is_vesac")),
);

vesac.get("/docs", ctx =>
  vesac.httpStatus.ok(ctx.translate("landing", "want_see_doc")),
);

vesac.get("/admin", ctx =>
  vesac.httpStatus.ok(ctx.i("admin", "welcome_admin")),
);
```
