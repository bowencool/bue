import Bue from '../src/core/index';

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
		length: {
			get() {
				return this.list.length;
			},
		},
	},
	methods: {
		reset() {
			this.name = INIT_NAME;
		},
		onArrayPush() {
			this.list.push('🌝');
		},
		onArrayPop() {
			this.list.pop();
		},
	},
});

if (module.hot) {
	module.hot.accept();
}
