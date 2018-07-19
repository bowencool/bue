/**
 * 观察一个目标
 * @param {Object | Array} target
 * @returns {Observer} __ob__
 */
export const observe = target => {
	for (const key in target) {
		defineReactive(target, key, target[key]);
	}
};

/**
 * 定义响应式属性（数据劫持）
 * @param {Object} target
 * @param {string} key
 * @param {any} val
 */
export const defineReactive = (target, key, val) => {
	console.log(key, val);
};
