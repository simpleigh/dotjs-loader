# dotjs-loader

[![npm](https://img.shields.io/npm/v/dotjs-loader.svg)](https://www.npmjs.com/package/dotjs-loader)
[![Build Status](https://travis-ci.org/simpleigh/dotjs-loader.svg?branch=master)](https://travis-ci.org/simpleigh/dotjs-loader)
[![Codecov](https://img.shields.io/codecov/c/github/simpleigh/dotjs-loader.svg)](https://codecov.io/gh/simpleigh/dotjs-loader)
[![Downloads](https://img.shields.io/npm/dt/dotjs-loader.svg)](https://www.npmjs.com/package/dotjs-loader)
[![Issues](https://img.shields.io/github/issues/simpleigh/dotjs-loader.svg)](https://github.com/simpleigh/dotjs-loader/issues)

[doT.js](http://olado.github.io/doT/) module loader for webpack

## Usage

### Installation

Install using `npm`.
doT is a peer dependency and should be installed separately:

```shell
npm install --save-dev dot dotjs-loader
```

### Configuration

Configure the loader in `webpack.config.js`:

```javascript
module: {
  loaders: [
    { test: /\.dot$/, loader: 'dotjs-loader' }
  ]
}
```

... and then load templates using `require()`:

```javascript
const template = require('./template.dot');
// => compiles template.dot content as template function

console.log(template());
```

Or, using ES6 modules:

```javascript
import template from './template.dot';
// template function is the default export

console.log(template());
```

Pass any template data to the function:

```javascript
template({key: 'value'});
```

Alternatively you can explicitly call the loader without having configured it:

```javascript
const template = require('dotjs-loader!./file.dot');
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

## Including templates

The loader adds a `def.loadfile(filename)` function to include and compile doT templates.

For example, a `parts.dot` file:

```
{{##def.works:
  {{='It works!'}}
#}}
```

And some other template file:

```
{{#def.loadfile('parts.dot')}}
{{#def.works}}
```   

## Similar projects

[`dot-loader`](https://github.com/ross-pfahler/dot-loader) is another loader
for doT templates, but it doesn't allow configuration of `templateSettings`.
At the time of writing there was a
[PR](https://github.com/ross-pfahler/dot-loader/pull/7) to add this feature,
but it suffered from some drawbacks:
* it's not merged
* it takes configuration from a `.dotrc` file rather than loader options
* it doesn't mark that file as a [loader dependency](https://webpack.js.org/contribute/writing-a-loader/#loader-dependencies)

I've also taken the opportunity to include unit tests and hope to add more
features as time permits.
