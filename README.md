# dotjs-loader

doT.js module loader for webpack

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
