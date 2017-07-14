var webpackConfig = `
  var path = require('path');
  var ExtractTextPlugin = require("extract-text-webpack-plugin");
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var webpack =require('webpack');
  var devConfig = {
    entry: {
      app: path.join(__dirname, './app.js')
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            styl: ExtractTextPlugin.extract({
              fallbackLoader: "vue-style-loader",
              use: [{
                loader: 'css-loader',
                options: {
                  minimize: true
                }
              },{
                  loader: 'stylus-loader'
                }]
            })
          }
        }
      }, {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        },
        exclude: /node_modules/
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit: 20000
        }
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader!stylus-loader"
        })
      }]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.js'
      }
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
    },
    plugins: [
      new ExtractTextPlugin("./[name].css"),
      new HtmlWebpackPlugin({
        template: './dist/tpl.html',
        inject: 'body'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
  module.exports = devConfig;
`
module.exports = webpackConfig;
