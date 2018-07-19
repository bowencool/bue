/**
 * 观察一个目标
 */
export function observe(target: object): void {
	for (const key in target) {
		defineReactive(target, key, target[key]);
	}
}

/**
 * 定义响应式属性（数据劫持）
 */
export function defineReactive(target: object, key: string, val?: any): void {
	console.log(key, val);
}
