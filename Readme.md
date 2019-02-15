# Bue
[![NPM version](https://img.shields.io/npm/v/buejs.svg)](https://npmjs.org/package/buejs)
> 自己写的`MVVM`框架, [Demo](https://bowencool.github.io/bue/)
## 注意：此项目仅供学习使用，不适用于生产环境！

## Todos
 - [x] 事件绑定
 - [x] 双向绑定
 - [x] 计算属性
 - [x] 观察数组变化
 - [x] Proxy代替defineProperty  (v1.0.0)
 - [ ] 虚拟DOM（VNode）
 - [ ] nextTick

## 安装
 - 使用 npm
``` bash
npm i buejs
```
``` js
import Bue from 'buejs'
```
 - 在浏览器中
``` html
<script scr="//unpkg.com/buejs@latest"></script>
<!-- or -->
<script scr="//cdn.jsdelivr.net/npm/buejs@latest"></script>
```

## 使用
``` html
<div id="app">
	<h1>{{ name }}</h1>
	<h2>{{ msg }}</h2>
	<input b-model="name" />
	<button @click="reset">reset</button>
</div>
```
``` js
new Bue({
	el: '#app',
	data() {
		return {
			name: INIT_NAME,
		};
	},
	computed: {
		msg() {
			return this.name
				.split('')
				.reverse()
				.join('');
		},
	},
	methods: {
		reset() {
			this.name = INIT_NAME;
		},
	},
})
```

## 特别感谢

- [DMQ](https://github.com/DMQ)
- [liyanlong](https://github.com/liyanlong)
