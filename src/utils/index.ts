export function typeOf(wtf: any): string {
	return Object.prototype.toString
		.call(wtf)
		.slice(8, -1)
		.toLowerCase();
}

export function warn(msg: string): void {
	if (process.env.NODE_ENV !== 'production') {
		console.warn(`[Bue Warn]: ${msg}`);
	}
}

/**
 * Check if a string starts with $ or _
 */
export function isReserved(str: string): boolean {
	const c = (str + '').charCodeAt(0);
	return c === 0x24 || c === 0x5f;
}

/**
 * Object.hasOwnProperty
 */
export function hasOwn(wtf: any, key: string): boolean {
	return Object.prototype.hasOwnProperty.call(wtf, key);
}

/**
 * Define a property.
 */
export function def(target: object, key: string, value: any, enumerable?: boolean): void {
	Object.defineProperty(target, key, {
		value: value,
		enumerable: !!enumerable,
		writable: true,
		configurable: true,
	});
}

/**
 * proxy a key to target[sourceKey]
 */
export function proxy(target: object, sourceKey: string, key: string): void {
	Object.defineProperty(target, key, {
		get() {
			return this[sourceKey][key];
		},
		set(newValue) {
			this[sourceKey][key] = newValue;
		},
	});
}
