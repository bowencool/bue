import InitOptions from './interfaces';
import { initState } from './instance/state';
import Compiler from './compiler';

let uid: number = 0;
export default class Bue {
	constructor(options: InitOptions) {
		this._uid = ++uid;
		this._isBue = true;
		this.$options = options;
		initState(this);
		this.$compiler = new Compiler(options.el, this);
	}
	public _uid: number;
	public _isBue: boolean;
	public _data: object;
	public $options: InitOptions;
	public $compiler: Compiler;
	public $el: Node;
}
