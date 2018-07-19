import Bue from '..';

export default class Watcher {
	constructor(bm: Bue, expOrFn: string | (() => void), cb: () => void) {
		console.log(expOrFn);
	}

	public update(): void {}
}
