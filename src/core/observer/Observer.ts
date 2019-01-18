import Dep from './Dep';
import { observe } from './index';

export default class Observer {
	// private data: object;
	public dep: Dep;

	constructor(data: object | Array<any>) {
		// this.data = data;
		// this.dep = new Dep();
		this.walk(data);
	}

	private walk(data: object | Array<any>): void {
		for (const key in data) {
			const item = data[key];
			const dep = defineReactive(data, key, item);
			const childOb = observe(item);
			if (Array.isArray(item)) {
				childOb.dep = dep;
			}
		}
	}
}

/**
 * 劫持一个属性
 */
export function defineReactive(data: object, key: string, val?: any): Dep {
	const dep = new Dep();

	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: false,
		get() {
			// console.log('getter: %s', key);
			// 把 watcher 添加到 dep.watchers (通过watcher.addDep或dep.addWatcher)
			dep.depend();
			return val;
		},
		set(newVal) {
			if (newVal === val) {
				return;
			}
			val = newVal;
			// 新的值是object的话，进行监听
			observe(newVal);
			// 监测到变化，通知所有订阅者
			dep.notify();
		},
	});

	return dep;
}
