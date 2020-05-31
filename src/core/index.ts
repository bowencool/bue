import { initState, initComputed } from './instance/state';
import Compiler from './compiler/index';
import { BueOptions } from '../global';

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
	public $el: Node;
}
