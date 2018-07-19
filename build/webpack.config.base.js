const { resolve } = require('./utils');

module.exports = {
	resolve: {
		alias: {
			buejs: '../src/core/index.ts',
		},
	},
	module: {
		rules: [
			// {
			// 	test: /\.js$/,
			// 	loader: 'babel-loader',
			// 	include: [resolve('src')],
			// },
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true, //HMR doesn't work without this
				},
			},
		],
	},
};
