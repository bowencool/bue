import Bue from '../src/core/index';

const INIT_NAME: string = 'Hello,Bue!';

window.bm = new Bue({
	el: '#app',
	data() {
		return {
			name: INIT_NAME,
		};
	},
	computed: {
		msg() {
			return this.name
				.split('')
				.reverse()
				.join('');
		},
	},
	methods: {
		reset() {
			this.name = INIT_NAME;
		},
	},
});

if (module.hot) {
	module.hot.accept();
}
