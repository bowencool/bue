const merge = require('webpack-merge');
// const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');
const prodConfig = require('./webpack.config.prod');

module.exports = merge(prodConfig, {
	output: {
		filename: 'bue.js',
	},
	optimization: {
		minimize: false,
	},
	// plugins: [
	// 	new DeclarationBundlerPlugin({
	// 		moduleName: 'Bue',
	// 		out: 'index.d.ts',
	// 	}),
	// ],
});
