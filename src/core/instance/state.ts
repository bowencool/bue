import Bue from '../index';
import { typeOf, hasOwn, warn, isReserved, isJson } from '../../utils/index';
import { observe } from '../observe/index';

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
				// const flag = isJson(data[key]);
				// if () {
				Object.defineProperty(bm, key, {
					get() {
						// console.log('defineProperty get:', key);
						return p[key];
					},
					set(v) {
						p[key] = v;
					},
				});
				// } else {

				// }
			}
		}
	}
}

export function initComputed(bm: Bue) {
	const computed = bm.$options.computed;
	if (typeOf(computed) === 'object') {
		Object.keys(computed).forEach(key => {
			const opt = computed[key];
			const isF = typeOf(opt) === 'function';
			Object.defineProperty(bm, key, {
				get: isF ? opt : opt.get.call(bm),
				set: isF
					? function() {
							warn(`Avoiding modify the computed property "${key}" unless you provide an setter.`);
					  }
					: function() {
							opt.set.apply(bm, arguments);
					  },
			});
		});
	}
}
