// const { resolve } = require('./utils');

module.exports = {
	resolve: {
		// alias: {
		// 	buejs: '../src/core/index.ts',
		// },
		extensions: ['.ts', '.js', '.json'],
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
				exclude: /node_modules/,
				options: {
					transpileOnly: true, //HMR doesn't work without this
				},
			},
		],
	},
};
