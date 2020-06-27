import Bue from '../index';
import { typeOf, hasOwn, warn, isReserved, isJson } from '../../utils/index';
import { observe } from '../observer/index';

export function initState(bm: Bue): void {
	initData(bm);
}

function initData(bm: Bue): void {
	let { data, methods } = bm.$options;
	data = (typeof data === 'function' ? data.call(bm) : data) || {};
	if (typeOf(data) === 'object') {
		const p = (bm._proxy = observe(data));
		for (const key in data) {
			if (methods && hasOwn(methods, key)) {
				return warn(`The data property "${key}" has already been declared as a method.`);
			}

			if (isReserved(key)) {
				warn(`The data property "${key}" is a reserved key.`);
			} else {
				Object.defineProperty(bm, key, {
					get() {
						return p[key];
					},
					set(v) {
						p[key] = v;
					},
				});
			}
		}
	}
}

export function initComputed(bm: Bue) {
	const computed = bm.$options.computed;
	if (typeOf(computed) === 'object') {
		Object.keys(computed).forEach(key => {
			const opt = computed[key];
			let descripter: object = {};
			if (typeof opt === 'function') {
				descripter = {
					get: opt,
					set: function() {
						warn(`Avoiding modify the computed property "${key}" unless you provide an setter.`);
					},
				};
			} else {
				descripter = {
					get: opt.get.bind(bm),
					set: function() {
						opt.set?.apply(bm, arguments);
					},
				};
			}
			Object.defineProperty(bm, key, descripter);
		});
	}
}
