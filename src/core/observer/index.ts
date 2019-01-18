import Observer from './Observer';
import middleArrayPrototype from './array';

/**
 * 观察一个目标/数据
 */
export function observe(data: any): Observer {
	// 过滤基本类型值
	if (!data || typeof data !== 'object') {
		return;
	}
	// 已经观察过
	if (data.__ob__) {
		return data.__ob__;
	}

	if (Array.isArray(data)) {
		data.__proto__ = middleArrayPrototype;
		data.forEach(item => {
			observe(item);
		});
	}

	const __ob__ = new Observer(data);

	Object.defineProperty(data, '__ob__', {
		configurable: false,
		writable: false,
		enumerable: false,
		value: __ob__,
	});

	return __ob__;
}
