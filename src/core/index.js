import initMixin from '../instance/initMixin';

@initMixin
class Bue {
	constructor(options) {
		// this.$options = options;
		this._init(options);
	}
}
export default Bue;
