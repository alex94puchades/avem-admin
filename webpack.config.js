var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	target: 'web',
	entry: './app/index.jsx',
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
		new htmlWebpackPlugin({
			title: 'AVEM - Admin',
			favicon: './app/favicon.ico',
		}),
	],
	output: {
		path: './dist',
		publicPath: 'http://localhost:8081',
		filename: '[name].[hash].js',
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
