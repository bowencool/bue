export interface ComputedOptions {
	[name: string]:
		| (() => any)
		| {
				get: () => any;
				set: () => void;
		  };
}

export default interface InitOptions {
	template?: string;
	el: string | Node;
	data: object | (() => object);
	computed?: ComputedOptions;
	methods?: {
		[name: string]: () => void;
	};
}
