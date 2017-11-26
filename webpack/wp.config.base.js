var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var map = require('./map')
var ROOT = path.resolve(__dirname)
var ENV = process.env.ENV
var CDN = process.env.CDN

var entry = {
	// 'images': '/src/images/*'
},
	plugins = []

for (chunk in map) {
	entry[chunk] = map[chunk].src
	plugins.push(new HtmlWebpackPlugin({
		alwaysWriteToDisk: true,
		filename: ROOT + '/pages/' + map[chunk].tpl,
		template: ROOT + '/template/' + map[chunk].tpl,
		chunks: [chunk]
	}))
}

if (ENV == 'DEV') {
	plugins.push(new HtmlWebpackHarddiskPlugin())
} else {
	// plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))
}

module.exports = {
	devtool: ENV == 'DEV' ? 'cheap-eval-source-map' : 'source-map',
	entry: entry,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: CDN ? CDN : '/dist'
	},
	resolve: {
		alias: {
			'src': path.resolve(__dirname,'src'),
			'template': path.resolve(__dirname,'template'),
			'pages': path.resolve(__dirname,'pages')
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
	plugins: plugins.concat([
		new webpack.DefinePlugin({
			'ENV': JSON.stringify(process.env.ENV)
		}),
		// new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
		new ExtractTextPlugin('[name].css')
	])
}
