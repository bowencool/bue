const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');

module.exports = merge(baseConfig, {
	mode: 'production',
	entry: {
		bue: path.resolve(__dirname, '../src/core/index.ts'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bue.min.js',
		library: 'Bue',
		libraryExport: 'default',
		libraryTarget: 'umd',
	},
	stats: {
		modules: false,
	},
	plugins: [
		new DeclarationBundlerPlugin({
			moduleName: 'Bue',
			out: 'index.d.ts',
		}),
	],
});
