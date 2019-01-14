import Bue from '..';

export default class Watcher {
	constructor(bm: Bue, expOrFn: string | Function, cb?: Function) {
		console.log('watcher created: ', expOrFn);
	}

	public update(): void {
		console.log('watcher.updated.');
	}
}
