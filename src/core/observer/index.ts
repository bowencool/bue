import Dep from './Dep';
import { hasOwn, isJson } from '../../utils/index';
// const whiteList = ['__deps__'];

export function observe(obj: any): Proxy {
	// 过滤基本类型值
	if (!obj || typeof obj !== 'object') {
		return;
	}
	console.log('\nOBSERVING', obj);
	const deps: {
		[name: string]: Dep;
	} = {};
	const caches: {
		[name: string]: Proxy;
	} = {};

	const handler = {
		get(target: Target, key: string, receiver: Target) {
			if (hasOwn(target, key)) {
				console.log(`\nproxy get: `, key);
				if (!deps[key]) {
					deps[key] = new Dep(key);
				}
				deps[key].depend();

				if (isJson(target[key])) {
					if (!caches[key]) {
						caches[key] = observe(target[key]);
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
