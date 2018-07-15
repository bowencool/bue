import Bue from '@bowen/bue';

new Bue({
	el: '#app',
	template: `<div>
	<h1>hello, {{name}}</h1>
</div>`,
	data() {
		return {
			name: 'bue',
		};
	},
});

if (module.hot) {
	module.hot.accept();
}
