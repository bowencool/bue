import Watcher from './Watcher';

let uid = 0;

export default class Dep {
	static target: Watcher = null;
	public id: number;
	private watchers: Set<Watcher> = new Set();
	private propertyName: string;

	constructor(propertyName: string) {
		this.id = uid++;
		this.propertyName = propertyName;
	}

	addWatcher(watcher: Watcher): void {
		this.watchers.add(watcher);
	}

	removeWatcher(watcher: Watcher): void {
		this.watchers.delete(watcher);
	}

	notify() {
		console.log('dep.notify: ', this);
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
	console.log('target changed: ', Dep.target);
}

export function popTarget() {
	Dep.target = targetStack.pop();
	console.log('target changed: ', Dep.target);
}
