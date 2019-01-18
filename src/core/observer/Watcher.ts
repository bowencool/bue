import Bue from '../index';
import { getValue } from '../../utils/index';
import Dep, { popTarget, pushTarget } from './Dep';

const parseGetter = (exp: string): Function => {
	if (/[^\w.$]/.test(exp)) return;

	return (obj: object): any => getValue(obj, exp);
};

let uid = 0;

export default class Watcher {
	private id: number;
	private bm: Bue;
	private getter: Function;
	private value: any;
	private cb: Function;
	private expOrFn: string | Function;
	private depIds: {
		[id: number]: Dep;
	} = {};

	constructor(bm: Bue, expOrFn: string | Function, cb: Function) {
		// console.log('watcher ctor start. ', expOrFn);
		this.id = uid++;
		this.bm = bm;
		this.expOrFn = expOrFn;
		this.cb = cb;

		if (typeof expOrFn === 'function') {
			this.getter = expOrFn;
		} else {
			this.getter = parseGetter(expOrFn);
		}
		this.value = this.get();
		// console.log('watcher ctor end.');
	}

	public update(): void {
		const newValue = this.get();
		const oldVal = this.value;
		this.value = newValue;
		this.cb.call(this.bm, newValue, oldVal);
	}

	public addDep(dep: Dep) {
		if (!this.depIds.hasOwnProperty(dep.id)) {
			dep.addWatcher(this);
			this.depIds[dep.id] = dep;
		}
	}

	private get() {
		pushTarget(this);
		const value = this.getter.call(this.bm, this.bm);
		popTarget();
		return value;
	}
}
