import tsPlugin from 'rollup-plugin-typescript2';
// import { uglify } from 'rollup-plugin-uglify';

export default {
	input: 'src/core/index.ts',
	plugins: [tsPlugin()],
	output: [
		{
			format: 'umd',
			name: 'Bue',
			file: 'dist/bue.js',
		},
		{
			format: 'cjs',
			name: 'Bue',
			file: 'dist/bue.cjs.js',
		},
		{
			format: 'esm',
			name: 'Bue',
			file: 'dist/bue.esm.js',
		},
		{
			format: 'amd',
			name: 'Bue',
			file: 'dist/bue.amd.js',
		},
	],
};
