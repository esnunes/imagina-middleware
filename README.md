
# imagina-middleware

Express middleware to dynamically resize images based on [Imagina](https://github.com/esnunes/imagina) Library.

## Examples

```js
var express = require('express');
var path = require('path');

var app = express();

app.configure(function() {
  var conf = {
    root: path.join(__dirname, 'public/imgs'),
    resolutions: ['800x600', '1024x768']
  };
  app.use('/imgs/', require('imagina-middleware')(conf));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.listen(8080);
```

```js
var express = require('express');
var path = require('path');

var app = express();

app.configure(function() {
  var conf = {
    root: path.join(__dirname, 'public/imgs')
  };
  app.use('/imgs/', require('imagina-middleware')(conf));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.listen(8080);
```

```js
var express = require('express');
var path = require('path');

var app = express();

app.configure(function() {
  var conf = {
    imagina: { workers: 3 },
    root: path.join(__dirname, 'public/imgs')
  };
  app.use('/imgs/', require('imagina-middleware')(conf));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.listen(8080);
```

```js
var express = require('express');
var path = require('path');
var Imagina = require('imagina');

var app = express();

app.configure(function() {
  var im = new Imagina();

  var conf = {
    imagina: im,
    root: path.join(__dirname, 'user-files/imgs')
  };
  app.use('/user-imgs/', require('imagina-middleware')(conf));
  app.use('/user-imgs/', express.static(path.join(__dirname, 'user-files')));

  var conf = {
    imagina: im,
    root: path.join(__dirname, 'system-files/imgs')
  };
  app.use('/system-imgs/', require('imagina-middleware')(conf));
  app.use('/system-imgs/', express.static(path.join(__dirname, 'system-files')));
});

app.listen(8080);
```
