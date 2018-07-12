const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		bue: './src/core/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bue.js',
		library: 'Bue',
		libraryTarget: 'umd'
	}
};
