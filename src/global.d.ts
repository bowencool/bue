export type kvobject = {
	[key: string]: any;
};

export declare type Target = kvobject | any[];

type Accessors<T> = {
	[K in keyof T]: (() => T[K]) | ComputedOptions<T[K]>;
};

interface ComputedOptions<T> {
	get(): T;
	set?: (value: T) => void;
}

export interface BueOptions {
	// template?: string;
	el: string | Node;
	data: object | (() => object);
	computed?: Accessors<kvobject>;
	methods?: {
		[name: string]: (...args: any[]) => void;
	};
}
