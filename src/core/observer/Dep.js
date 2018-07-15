let uid = 0;
export default class Dep {
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	// static target = null;

	constructor() {
		this.id = ++uid;
		this.watchers = [];
	}
	/**
	 * @param {Watcher} watcher
	 */
	addWatcher(watcher) {
		this.watchers.push(watcher);
	}
	/**
	 * @param {Watcher} watcher
	 */
	removeWatcher(watcher) {
		const index = this.watchers.indexOf(watcher);
		if (index > -1) {
			this.watchers.splice(index, 1);
		}
	}
	notify() {
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

// const targetStack = [];

// export function pushTarget(_target) {
// 	if (Dep.target) {
// 		targetStack.push(Dep.target);
// 	}
// 	Dep.target = _target;
// }

// export function popTarget() {
// 	Dep.target = targetStack.pop();
// }
