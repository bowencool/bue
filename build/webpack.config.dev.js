const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('./utils');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
	mode: 'development',
	entry: {
		example: resolve('example/index.ts'),
	},
	devtool: 'source-map',
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
