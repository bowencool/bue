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
			name: 'bue',
		};
	},
	computed: {
		greeting() {
			return `Hello, ${this.name}!`;
		},
	},
	methods: {
		greet() {
			alert(this.name);
		},
	},
});

if (module.hot) {
	module.hot.accept();
}
