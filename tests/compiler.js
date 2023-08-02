import path from 'path';

import { createFsFromVolume, Volume } from 'memfs';
import webpack from 'webpack';

// Adapted from https://webpack.js.org/contribute/writing-a-loader/#testing

/**
 * Creates a webpack configuration
 * @param {string} fixture - filename of template to compile
 * @param {any}    options - loader options
 * @returns {any} webpack config object
 */
function configFactory(fixture, options) {
  return {
    context: __dirname,
    entry: `./fixtures/${fixture}.dot`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    mode: 'none',
    module: {
      rules: [
        {
          test: /\.dot$/,
          use: {
            loader: path.resolve(__dirname, '../src/index.js'),
            options: options,
          },
        },
      ],
    },
  };
}

/**
 * Use webpack and the loader to compile a template
 * @param {string} fixture - filename of template to compile
 * @param {any}    options - loader options
 * @returns {Promise} that resolves to the compiled output
 */
export default (fixture, options = {}) => {
  const compiler = webpack(configFactory(fixture, options));

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
};
