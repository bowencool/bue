export const typeOf = wtf =>
	Object.prototype.toString
		.call(wtf)
		.slice(8, -1)
		.toLowerCase();

/**
 * Object.hasOwnProperty
 */
export const hasOwn = (wtf, key) => Object.prototype.hasOwnProperty.call(wtf, key);

export const warn = msg => {
	if (process.env.NODE_ENV !== 'production') {
		console.warn(`[Bue Warn]: ${msg}`);
	}
};

/**
 * Check if a string starts with $ or _
 */
export function isReserved(str) {
	const c = (str + '').charCodeAt(0);
	return c === 0x24 || c === 0x5f;
}

/**
 * Define a property.
 * @param {object} target - the target object.
 * @param {string} key
 * @param {object} value - the value to be passthroughed to Object.defineProperty
 * @param {boolean?} enumerable
 */
export function def(target, key, value, enumerable) {
	Object.defineProperty(target, key, {
		value: value,
		enumerable: !!enumerable,
		writable: true,
		configurable: true,
	});
}

/**
 * proxy a key to target[sourceKey]
 * @param {object} target
 * @param {string} sourceKey
 * @param {string} key
 */
export function proxy(target, sourceKey, key) {
	Object.defineProperty(target, key, {
		get() {
			return this[sourceKey][key];
		},
		set(newValue) {
			this[sourceKey][key] = newValue;
		},
	});
}
