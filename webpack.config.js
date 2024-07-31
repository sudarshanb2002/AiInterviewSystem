const path = require('path');

module.exports = {
  entry: './src/index.js', // Adjust this to your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/react-siriwave/,
      },
      // Other rules, e.g., for handling CSS, images, etc.
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map', // This ensures source maps are generated
};
