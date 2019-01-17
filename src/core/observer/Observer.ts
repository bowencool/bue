import Dep from './Dep';
import { observe } from './index';

export default class Observer {
	private data: object;

	constructor(data: object) {
		this.data = data;
		this.walk(data);
	}

	private walk(data: object) {
		for (const key in data) {
			this.defineReactive(data, key, data[key]);
		}
	}

	/**
	 * 劫持数据
	 */
	private defineReactive(data: object, key: string, val?: any) {
		const dep = new Dep();

		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: false,
			get() {
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
}
