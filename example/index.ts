import Bue from '../src/core';

window.bm = new Bue({
	el: '#app',
	// 	template: `<div>
	// 	<h1>hello, {{name}}</h1>
	// 	<input b-model="name" />
	// 	<button @click="greet">greet</button>
	// </div>`,
	data() {
		return {
			name: 'hello, bue',
		};
	},
	// computed: {
	// 	greeting() {
	// 		return `Hello, ${this.name}!`;
	// 	},
	// },
	methods: {
		reset() {
			this.name = 'hello, bue';
		},
	},
});

if (module.hot) {
	module.hot.accept();
}
