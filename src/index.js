import doT from 'dot';
import { validate } from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    varname: {
      type: 'string',
    },
    strip: {
      type: 'boolean',
    },
    append: {
      type: 'boolean',
    },
  },
};

export default function (source) {
  const options = this.getOptions();

  validate(schema, options, {
    name: 'dotjs-loader',
    baseDataPath: 'options',
  });

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
  ].forEach((option) => {
    if (options[option]) {
      doT.templateSettings[option] = options[option];
    }
  });

  doT.templateSettings.selfcontained = true;

  return 'export default ' + doT.template(source);
}
