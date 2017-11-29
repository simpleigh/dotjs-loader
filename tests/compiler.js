import webpack from 'webpack';
import memoryfs from 'memory-fs';

import configFactory from './configFactory.js';

// Adapted from https://webpack.js.org/contribute/writing-a-loader/
export default (fixture, options = { }) => {
  const compiler = webpack(configFactory(fixture));
  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
}
