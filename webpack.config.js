var webpack = require('webpack');
module.exports = {  
  entry: './src/tables.ts',
  output: {
    filename: './out/bundle.js',
    libraryTarget: 'var',
    library: 'Table'
  },
  externals: {

  },
  // Turn on sourcemaps
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  // Add minification
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts' }
    ]
  }
}