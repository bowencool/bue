import { initState, initComputed } from './core/instance/state';
import Compiler from './core/compiler/index';

let uid: number = 0;
export default class Bue {
	constructor(options: BueConfiguration) {
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
	public $options: BueConfiguration;
	public $compiler: Compiler;
	public $el: Node;
}
