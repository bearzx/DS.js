var webpack = require('webpack');
module.exports = {  
  entry: ['./src/parse.js', './src/tables.ts'],
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
    new webpack.ProvidePlugin({
      jquery: 'jquery',
      jQuery: 'jquery',
      $: 'jquery'
    })
  ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts' }
    ]
  }
}