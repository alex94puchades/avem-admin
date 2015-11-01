var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	target: 'web',
	entry: {
		app: './app/index.jsx',
		vendor: [
			'cookies-js',
			'lodash',
			'react',
			'reflux',
			'react-dom',
			'react-router',
			'react-bootstrap',
			'react-router-bootstrap',
			'superagent',
			'superagent-jsonapify',
		],
	},
	plugins: [
		new webpack.optimize.DedupePlugin,
		new webpack.optimize.UglifyJsPlugin,
		new webpack.optimize.CommonsChunkPlugin('vendor'),
		new htmlWebpackPlugin({
			title: 'AVEM - Admin',
			favicon: 'app/favicon.ico',
		}),
	],
	output: {
		path: './dist',
		filename: '[name].js',
	},
	module: {
		loaders: [{
			test: /bootstrap\/js\//,
			loader: 'imports?jQuery=jquery',
		}, {
			test: /\.woff$/,
			loader: 'url?limit=10000&mimetype=application/font-woff',
		}, {
			test: /\.woff2$/,
			loader: 'url?limit=10000&mimetype=application/font-woff2',
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/octet-stream',
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file',
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=image/svg+xml',
		}, {
			test: /\.less$/,
			loader: 'style!css!less',
		}, {
			test: /\.css$/,
			loader: 'style!css',
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192',
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel?optional=runtime'
		}],
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
};
