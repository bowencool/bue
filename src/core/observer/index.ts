import Dep from './Dep';
import { hasOwn } from '../../utils/index';
// const whiteList = ['__deps__'];

export function observe(obj: any): Proxy | void {
	// 过滤基本类型值
	if (!obj || typeof obj !== 'object') {
		return;
	}
	// const dep = new Dep();
	// obj.__deps__ = {};
	const deps: {
		[name: string]: Dep;
	} = {};

	const handler = {
		get(target: Target, key: string, receiver: Target) {
			// if (typeof key === 'string' && hasOwn(target, key)) {
			console.log(`\nget: `, key);
			if (!deps[key]) {
				deps[key] = new Dep(key);
			}
			deps[key].depend();

			// if (typeof target[key] === 'object' && target[key] !== null) {
			// 	return observe(target[key]);
			// }
			// }
			return Reflect.get(target, key, receiver);
		},
		set(target: Target, key: string, value: any, receiver: Target) {
			console.log('set: ', key, value);
			// 监测到变化，通知所有订阅者
			const wtf = Reflect.set(target, key, value, receiver);
			let dep = deps[key];
			dep && dep.notify();
			return wtf;
		},
	};
	return new Proxy(obj, handler);
}
