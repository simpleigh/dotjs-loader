import path from 'path';

// Adapted from https://webpack.js.org/contribute/writing-a-loader/
export default (entry, options={ }) => { return {
  context: __dirname,
  entry: `./${entry}`,
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.dot$/,
      use: {
        loader: path.resolve(__dirname, '../src/index.js'),
        options: options
      }
    }]
  }
}};
