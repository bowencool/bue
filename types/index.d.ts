type ComputedOptions = {
	[name: string]:
		| (() => any)
		| {
				get: () => any;
				set: () => void;
		  };
};

type InitOptions = {
	template?: string;
	el: string | Node;
	data: object | (() => object);
	computed?: ComputedOptions;
	methods?: {
		[name: string]: () => void;
	};
};

export default interface Bue {
	constructor(option: InitOptions);
}
