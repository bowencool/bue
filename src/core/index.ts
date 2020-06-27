import { initState, initComputed } from './instance/state';
import Compiler from './compiler/index';
import { kvobject } from '../global';

interface ComputedOptions<T> {
	get(): T;
	set?: (value: T) => void;
}

type Accessors<T> = {
	[K in keyof T]: (() => T[K]) | ComputedOptions<T[K]>;
};

export interface BueOptions {
	// template?: string;
	el: string | Element;
	data: object | (() => object);
	computed?: Accessors<kvobject>;
	methods?: {
		[name: string]: (...args: any[]) => void;
	};
}

let uid: number = 0;
export default class Bue {
	constructor(options: BueOptions) {
		this._uid = ++uid;
		this._isBue = true;
		this.$options = options;
		initState(this);
		initComputed(this);
		this.$compiler = new Compiler(options.el, this);
	}
	public _uid: number;
	public _isBue: boolean;
	public _proxy: object;
	public $options: BueOptions;
	public $compiler: Compiler;
	public $el: Element;
}
