# dotjs-loader

[![Build Status](https://travis-ci.org/simpleigh/dotjs-loader.svg?branch=master)](https://travis-ci.org/simpleigh/dotjs-loader)

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/dotjs-loader)

[doT.js](http://olado.github.io/doT/) module loader for webpack

## Usage

```javascript
var template = require('dotjs-loader!./file.dot');
// => returns file.dot content as template function

// or, if you've bound .dot to dotjs-loader
var template = require('./file.dot');

// using ES6 modules
import template from './file.dot';

// use the template
console.log(template());
```

### Installation

Install using `npm`.
doT is a peer dependency and should be installed separately:

```shell
npm install --save-dev dot dotjs-loader
```

### Options

The following [options](https://webpack.js.org/configuration/module/#useentry)
are available.
They map directly to [`doT.templateSettings`](http://olado.github.io/doT/)
unless stated otherwise:

* `evaluate`
* `interpolate`
* `encode`
* `use`
* `define`
* `conditional`
* `iterate`
* `varname`
* `strip`
* `append`

Options are most conveniently passed in `webpack.config.js`:

```javascript
module: {
  loaders: [
    {
      test: /\.dot$/,
      loader: 'dotjs-loader',
      options: {
        varname: 'context'
      }
    }
  ]
}
```
