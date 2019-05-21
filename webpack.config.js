var webpack = require('webpack');
module.exports = {
  entry: ['./src/parse.js', './src/tables.ts'],
  output: {
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'Table'
  },
  externals: {

  },
  // Turn on sourcemaps
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
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
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      { test: /\.less$/, use: 'style!css!less' },
      { test: /\.css$/, use: "style-loader!css-loader" },
      // {
      //   test: require.resolve('./libs/vega'),
      //   loaders: [
      //     'transform?vega/scripts/strip-schema.js'
      //   ]
      // },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  }
}
