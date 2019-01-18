import Watcher from './Watcher';

let uid = 0;

export default class Dep {
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	static target: Watcher = null;
	public id: number;
	private watchers: Watcher[];

	constructor() {
		this.id = ++uid;
		this.watchers = [];
	}

	addWatcher(watcher: Watcher): void {
		// console.log('addWatcher: ', watcher, this);
		this.watchers.push(watcher);
	}

	removeWatcher(watcher: Watcher): void {
		const index = this.watchers.indexOf(watcher);
		if (index > -1) {
			this.watchers.splice(index, 1);
		}
	}

	notify() {
		// console.log('dep.notify: ', this.watchers);
		this.watchers.forEach(w => {
			w.update();
		});
	}
	depend() {
		if (Dep.target) {
			Dep.target.addDep(this);
		}
	}
}

const targetStack: Watcher[] = [];

export function pushTarget(_target: Watcher) {
	if (Dep.target) {
		targetStack.push(Dep.target);
	}
	Dep.target = _target;
	// console.log('target changed: ', Dep.target);
}

export function popTarget() {
	Dep.target = targetStack.pop();
	// console.log('target changed: ', Dep.target);
}
