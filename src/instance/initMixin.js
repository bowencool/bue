export default function initMixin(Bue) {
	Bue.prototype._init = function(options) {
		console.log(options);
	};
	return Bue;
}
