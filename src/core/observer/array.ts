const methods: string[] = ['pop', 'push', 'unshift', 'shift', 'splice', 'sort', 'reverse'];

const middleArrayPrototype = Object.create(Array.prototype);

methods.forEach((method: string) => {
	const original = Array.prototype[method];
	Object.defineProperty(middleArrayPrototype, method, {
		value() {
			const result = original.apply(this, arguments);
			console.log(method, this);
			return result;
		},
	});
});

export default middleArrayPrototype;
