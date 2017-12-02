var path = require('path')
var webpack = require('webpack')
var ENV = process.env.ENV
var CDN = process.env.CDN
var ROOT = path.resolve(__dirname, '../')
var tpl = './vtpl-loader.js'

module.exports = {
	entry:  path.resolve(ROOT, './src/main.js'),
	output: {
		filename: 'main.js',
		path: path.resolve(ROOT, './dist'),
		publicPath: CDN ? CDN : '/dist'
	},
	module: {
		loaders: [
			{ test: /\.vue$/, loader: 'vue-loader' },
			{ test: /\.css/, loader: 'style-loader!css-loader' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015']}},
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=1&name=./images/[name].[ext]' },
			{ test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: 'file-loader' },
			// { test: /\.html$/, loader: "html-loader?attrs=img:src img:data-src" },
			{ test: /\.vtpl$/, loader: tpl }
		]
	},
	resolve: {
		extensions: ['.js', '.json', '.less'],
		alias: {
			'vue': 'vue/dist/vue.js',
			common: path.resolve(ROOT, './src/common'),
			components: path.resolve(ROOT, './src/components'),
			'store': path.resolve(ROOT, './src/store'),
			'pages': path.resolve(ROOT, './src/pages'),
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
	plugins: [
		new webpack.DefinePlugin({
				'process.env': '"dev"',
				env: '"dev"'
		}),
	],
	devtool: '#eval-source-map'
}
