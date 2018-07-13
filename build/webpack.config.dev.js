const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const resolve = (...p) => path.resolve(__dirname, ...p);

module.exports = merge(baseConfig, {
	mode: 'development',
	entry: {
		example: resolve('../example/index.js')
	},
	devServer: {
		contentBase: resolve('dev'),
		port: 1080,
		hot: true,
		hotOnly: true,
		stats: 'errors-only',
		inline: true,
		overlay: true,
		// useLocalIp: true
		// noInfo: true,
		// quiet: true,
		// historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'example/index.html',
			inject: true
		})
	]
});
