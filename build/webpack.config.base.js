const { resolve } = require('./utils');

module.exports = {
	resolve: {
		alias: {
			buejs: '../src/core/index.js',
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src')],
			},
		],
	},
};
