var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'index.jsx'),
    mobile: path.resolve(APP_PATH, 'mobile.jsx'),
    vendors: ['jquery', 'moment']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  //启动dev source map，出错以后就会采用source-map的形式直接显示你出错代码的位置。
  devtool: 'eval-source-map',
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    //只要配置dev server map这个参数就可以了
    proxy:{
      '/api/*':{
        target: 'http://localhost:8080',
        secure: false
      }
    }
  },
  //babel重要的loader在这里
  module: {
    //loader前执行处理，这样每次npm run start的时候就可以看到jshint的提示信息
    preLoaders: [
       {
         test: /\.jsx?$/,
         include: APP_PATH,
         loader: "jshint-loader"
       }
     ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          //添加两个presents 使用这两种presets处理js或者jsx文件
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  //配置jshint的选项，支持es6的校验
   // any jshint option http://www.jshint.com/docs/options/
   jshint: {
     "esnext": true
   },
  plugins: [
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new HtmlwebpackPlugin({
      title: 'My first react app',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'Hello Mobile app',
      template: path.resolve(TEM_PATH, 'mobile.html'),
      filename: 'mobile.html'
    }),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
}