import { initState } from './state';

let uid = 0;

export default function initMixin(Bue) {
	Bue.prototype._init = function(options) {
		this._uid = ++uid;
		this._isBue = true;
		this.$options = options;
		initState(this);
	};

	return Bue;
}
