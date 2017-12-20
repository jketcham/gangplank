const path = require('path');

const ROOT_DIR = path.normalize(path.join(__dirname, '..'));


module.exports = {
  entry: {
    main: path.join(ROOT_DIR, 'src/main.js'),
  },

  output: {
    path: path.join(ROOT_DIR, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: { configFile: path.join(ROOT_DIR, '.eslintrc') },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve('src'),
      'node_modules',
    ],
  },
};
