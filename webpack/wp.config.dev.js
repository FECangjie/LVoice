var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var map = require('../map')
var ENV = process.env.ENV
var CDN = process.env.CDN
var ROOT = path.resolve(__dirname, '../')

var entry = {
	// 'images': '/src/images/*'
},
plugins = []

for (chunk in map) {
	entry[chunk] = map[chunk].src
	plugins.push(new HtmlWebpackPlugin({
		alwaysWriteToDisk: true,
		filename: path.resolve(ROOT, 'pages/' + map[chunk].tpl),
		template: path.resolve(ROOT, 'template/' + map[chunk].tpl),
		chunks: [chunk]
	}))
}
plugins.push(new HtmlWebpackHarddiskPlugin())

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: entry,
	output: {
		filename: '[name].js',
		path: path.resolve(ROOT, '../dist'),
		publicPath: CDN ? CDN : '/dist'
	},
	resolve: {
		alias: {
			'src': path.resolve(ROOT,'src'),
			'common': path.resolve(ROOT,'src/common'),
			'uitl': path.resolve(ROOT,'src/common/js/util'),
			'mock': path.resolve(ROOT,'mock'),
			'template': path.resolve(ROOT,'template'),
			'pages': path.resolve(ROOT,'pages')
		}
	},
	externals: {
		'd3': 'window.d3'
	},
	module: {
		loaders: [
			{ test: /\.css/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' }) },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015']}},
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
			// { test: /(\.html|\.php)$/, loader: "raw-loader" },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=1&name=images/[name].[ext]' },
			{ test: /\.html$/, loader: "html-loader?attrs=img:src img:data-src" }
		]
	},
	devServer: {
        inline:true,
        hot:true
    },
	plugins: plugins.concat([
		new webpack.DefinePlugin({
			'ENV': JSON.stringify(process.env.ENV)
		}),
		// new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
		new ExtractTextPlugin('[name].css')
	])
}
