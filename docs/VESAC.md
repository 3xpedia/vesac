# VESAC

### vesac.configure(`options)

Should be called before any other call to vesac.

It mostly contains some internal bootstrap. You can also pass some global options.

##### Example:

```javascript
require("dotenv").config();
const vesac = require("vesac");

vesac.configure({ hideSensibleErrors: process.env.ENV !== "DEV" });
```

##### Options :

| Name               | Type    | Default | Description                     |
| ------------------ | ------- | ------- | ------------------------------- |
| hideSensibleErrors | boolean | `true`  | Hide all the 5xx errors message |

### vesac.start(`port`)

Start the app on the specified port.

##### Example:

```javascript
const vesac = require("vesac");

vesac.configure({ hideSensibleErrors: true });

vesac.start(3000);
```
