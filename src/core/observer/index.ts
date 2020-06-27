import Dep from './Dep';
import { hasOwn, isJson } from '../../utils/index';
import { Target } from '../../global';

export function observe(obj: any, dep?: Dep): typeof obj {
	// 过滤基本类型值
	if (!obj || typeof obj !== 'object') {
		return;
	}
	console.log('OBSERVING', obj);
	const deps: Record<string, Dep> = {};
	const caches: Record<string, Target> = {};

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

				const child: any = target[key];

				if (isJson(child)) {
					if (!caches[key]) {
						caches[key] = observe(child, deps[key]);
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
