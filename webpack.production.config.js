const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'src/phaser.js');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
  WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
  CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
});

module.exports = {
  entry: {
    // vendor: ['phaser'],
    app: [
      path.resolve(__dirname, 'src/main.js')
    ]
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    library: '[name]',
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  plugins: [
    definePlugin,
    new CleanWebpackPlugin(['build']),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' /* chunkName= */, filename: 'js/vendor.bundle.js' /* filename= */ }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: false,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      hash: true
    }),
    /* new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' }
    ]),*/

  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /phaser-split\.js$/, use: 'raw-loader' },
      { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
    ]
  },
  optimization: {
    minimize: true
  }
  /* node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,

    }
  } */
};
