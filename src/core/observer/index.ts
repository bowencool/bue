import Dep from './Dep';
import { hasOwn, isJson } from '../../utils/index';
// const whiteList = ['__deps__'];

export function observe(obj: any, dep?: Dep): Proxy {
	// 过滤基本类型值
	if (!obj || typeof obj !== 'object') {
		return;
	}
	console.log('OBSERVING', obj);
	const deps: {
		[name: string]: Dep;
	} = {};
	const caches: {
		[name: string]: Proxy;
	} = {};

	const handler = {
		get(target: Target, key: string, receiver: Target) {
			if (hasOwn(target, key)) {
				console.log('\n');
				console.group(`proxy get: ${key}`);
				if (!deps[key]) {
					deps[key] = dep || new Dep(key);
				}
				deps[key].depend();
				console.groupEnd();

				if (isJson(target[key])) {
					if (!caches[key]) {
						caches[key] = observe(target[key], deps[key]);
					}
					return caches[key];
				}
			}
			return Reflect.get(target, key, receiver);
		},
		set(target: Target, key: string, value: any, receiver: Target) {
			console.log('\nset: ', key, value);
			const wtf = Reflect.set(target, key, value, receiver);
			let dep = deps[key];
			dep && dep.notify();
			return wtf;
		},
	};
	return new Proxy(obj, handler);
}
