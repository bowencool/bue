import InitOptions from './interfaces';
import { initState } from './instance/state';

let uid: number = 0;
export default class Bue {
	constructor(options: InitOptions) {
		this._uid = ++uid;
		this._isBue = true;
		this.$options = options;
		initState(this);
	}
	public _uid: number;
	public _isBue: boolean;
	public _data: object;
	public $options: InitOptions;
}
