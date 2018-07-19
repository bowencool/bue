const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

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
});
