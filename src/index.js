import fs from 'fs';
import path from 'path';

import doT from 'dot';
import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    varname: {
      type: 'string'
    },
    strip: {
      type: 'boolean'
    },
    append: {
      type: 'boolean'
    }
  }
}

export default function (source) {
  const options = getOptions(this);
  validateOptions(schema, options, 'dotjs-loader');

  [
    'evaluate',
    'interpolate',
    'encode',
    'use',
    'define',
    'conditional',
    'iterate',
    'varname',
    'strip',
    'append',
  ].forEach(option => {
    if (options[option]) {
      doT.templateSettings[option] = options[option];
    }
  });

  doT.templateSettings.selfcontained = true;

  var webpackContext = this;

  function loadfile (filename) {
    const filepath = path.resolve(webpackContext.context, filename);
    webpackContext.addDependency(filepath);

    return fs.readFileSync(filepath);
  }

  return 'export default ' + doT.template(source, undefined, {loadfile: loadfile});
};
