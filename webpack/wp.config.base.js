var path = require('path')
var webpack = require('webpack')
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js')
var tpl = require.resolve('./vtpl-loader.js')

module.exports = {
  // plugins: [commonsPlugin],
    entry: './src/main.js', // 入口文件
    output: {
        path: path.resolve(__dirname, './dist'), // Webpack结果存储
        publicPath: './dist/', // “publicPath”项则被许多Webpack的插件用于在生产模式和开发模式下下更新内嵌到css、html，img文件里的url值
        filename: 'common.js'
    },
    module: {
      loaders: [
    { test: /\.vue$/, loader: 'vue-loader' },
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015']}},
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
    { test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: 'file-loader' },
    { test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/, loader: 'file-loader',
      query: {
        name: '[name].[ext]?[hash]'
      }
    },
    { test: /\.vtpl$/, loader: tpl }
  ]
 },
    resolve: {
        extensions: ['.js', '.json', '.less'],
        alias: {
            'vue': 'vue/dist/vue.js', // 用 webpack 的别名功能把 vue/dist/vue.js 命名成了 vue，不然vue 的 package.json 中的 main 指向的是 dist/vue.common.js。
            common: path.resolve(__dirname, './src/common'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: { // webpack-dev-server配置
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true //实时刷新
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
  }

if (process.env.NODE_ENV === 'production') { // 生产环境
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false,
            // remove `console.*`
            drop_console: true
          },
          output: {
            comments: false
          }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
