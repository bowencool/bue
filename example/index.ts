import Bue from '../src/core/index';

const INIT_NAME: string = 'Hello,Bue!';

window.bm = new Bue({
	el: '#app',
	data() {
		return {
			name: INIT_NAME,
			list: ['a', 'b', 'c'],
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
		onArray() {
			this.list.push('d');
		},
	},
});

if (module.hot) {
	module.hot.accept();
}
