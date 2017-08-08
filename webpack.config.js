var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var postcssImport = require('postcss-import');
var precss = require('precss');
var postcssMixins = require('postcss-mixins');
var postcssNested = require('postcss-nested');
var postcssCssnext = require('postcss-cssnext');

var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 7.1',
];

module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'app.js')
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: [{
    react: 'React',
  }, {
    'react-dom': 'ReactDOM',
  }],
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
/*    preLoaders: [
       {
         test: /\.jsx?$/,
         include: APP_PATH,
         loader: "jshint-loader"
       }
     ],*/
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
      }, 
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
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
    //把入口文件里面的数组打包成verdors.js
    //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new ExtractTextPlugin('public/styles/react-component.css'), // 把css自动插入到head里
    new HtmlwebpackPlugin({ // 会把压缩好的app.js和vendors.js自动插入到html中的body里
      title: 'My first react app',
      template: path.resolve(APP_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app'],
      inject: 'body'
    })
  ],
   postcss: function plugin(bundler) {
    return [
      postcssImport({
        addDependencyTo: bundler,
      }),
      precss(),
      postcssMixins(),
      postcssNested(),
      postcssCssnext({
        autoprefixer: AUTOPREFIXER_BROWSERS,
      }),
    ];
  }
}