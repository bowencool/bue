const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const resolve = (...p) => path.resolve(__dirname, ...p);

module.exports = merge(baseConfig, {
	mode: 'development',
	entry: {
		example: resolve('../example/index.js'),
	},
	devServer: {
		contentBase: resolve('dev'),
		port: 9000,
		hot: true,
		hotOnly: true,
		stats: 'errors-only',
		inline: true,
		overlay: true,
		clientLogLevel: 'none',
		// useLocalIp: true
		// noInfo: true,
		// quiet: true,
		// historyApiFallback: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'example/index.html',
			inject: true,
		}),
	],
});
