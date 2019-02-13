import Dep from './Dep';

export function observe(obj: Target): Proxy | void {
	// 过滤基本类型值
	if (!obj || typeof obj !== 'object') {
		return;
	}
	const dep = new Dep();

	const handler = {
		get(target: Target, key: string, receiver: Target) {
			console.log(`get`, key);
			dep.depend();

			if (typeof target[key] === 'object' && target[key] !== null) {
				return observe(target[key]);
			}
			return Reflect.get(target, key, receiver);
		},
		set(target: Target, key: string, value: any, receiver: Target) {
			console.log('set: ', key, value);
			// 监测到变化，通知所有订阅者
			const wtf = Reflect.set(target, key, value, receiver);
			dep.notify();
			return wtf;
		},
	};
	return new Proxy(obj, handler);
}
