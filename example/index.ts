import Bue from '../src/index';

const INIT_NAME: string = 'hello';

window.bm = new Bue({
	el: '#app',
	data() {
		return {
			name: INIT_NAME,
			list: ['🌝', '🌝', '🌝'],
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
			this.list.push('🌝');
		},
	},
});

if (module.hot) {
	module.hot.accept();
}
