const merge = require('webpack-merge');
const prodConfig = require('./webpack.config.prod');

module.exports = merge(prodConfig, {
	output: {
		filename: 'bue.js',
	},
	optimization: {
		minimize: false,
	},
});
