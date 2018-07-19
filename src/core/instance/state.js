import { typeOf, hasOwn, warn, isReserved, proxy } from '../../utils';
import { observe } from '../observer';

export function initState(bm) {
	const opt = bm.$options;
	if (opt.data) {
		initData(bm);
	} else {
		observe((bm._data = {}));
	}
}

function initData(bm) {
	let { data, methods, props } = bm.$options;
	data = bm._data = typeof data === 'function' ? data.call(bm) : data;
	if (typeOf(data) === 'object') {
		for (const key in data) {
			if (methods && hasOwn(methods, key)) {
				warn(`The method "${key}" has already been declared as a data property.`);
			}

			if (props && hasOwn(props, key)) {
				warn(
					`The data property "${key}" is already declared as a prop. \nUse prop default value instead.`
				);
			}

			if (isReserved(key)) {
				warn(`The data property "${key}" is a reserved key.`);
			} else {
				proxy(bm, '_data', key);
			}
		}
	}
	observe(data);
}
