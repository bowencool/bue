declare type ComputedOpt =
	| (() => any)
	| {
			get: () => any;
			set: () => void;
	  };

export interface BueConfiguration {
	// template?: string;
	el: string | Node;
	data: object | (() => object);
	computed?: {
		[name: string]: ComputedOpt;
	};
	methods?: {
		[name: string]: () => void;
	};
}

export default class Bue {
	constructor(option: BueConfiguration);

	$el: Node;
	$options: object;
}
