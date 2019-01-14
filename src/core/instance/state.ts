import Bue from '..';
import { typeOf, hasOwn, warn, isReserved, proxy } from '../../utils';
import { observe } from '../observer';

export function initState(bm: Bue): void {
	const { data } = bm.$options;
	if (data) {
		initData(bm);
	} else {
		observe((bm._data = {}));
	}
}

function initData(bm: Bue): void {
	let { data, methods } = bm.$options;
	data = bm._data = typeof data === 'function' ? data.call(bm) : data;
	if (typeOf(data) === 'object') {
		for (const key in data) {
			if (methods && hasOwn(methods, key)) {
				warn(`The method "${key}" has already been declared as a data property.`);
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
