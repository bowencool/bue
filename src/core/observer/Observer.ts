import Dep from './Dep';
import middleArrayPrototype from './array';
import { observe } from './index';

export default class Observer {
	// private data: object;
	// public dep: Dep;

	constructor(data: object | Array<any>) {
		// this.data = data;
		// this.dep = new Dep();
		// console.log('constructor:', data, Dep.target);
		// this.dep.depend();
		this.walk(data);
	}

	private walk(data: object | Array<any>): void {
		if (Array.isArray(data)) {
			data.__proto__ = middleArrayPrototype;
			data.forEach(item => {
				// console.log('observe item: ', item);
				observe(item);
			});
		} else {
			for (const key in data) {
				defineReactive(data, key, data[key]);
				observe(data[key]);
			}
		}
	}
}

/**
 * 劫持数据
 */
function defineReactive(data: object, key: string, val?: any) {
	const dep = new Dep();

	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: false,
		get() {
			console.log('getter: %s', key);
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
}
