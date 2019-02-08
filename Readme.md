# Bue
[![NPM version](https://img.shields.io/npm/v/buejs.svg)](https://npmjs.org/package/buejs)
> An MVVM framework, [Live Demo](https://bowencool.github.io/bue/)

## Todos
 - [x] 事件绑定
 - [x] 双向绑定
 - [x] 计算属性
 - [x] 观察数组变化
 - [ ] Proxy代替defineProperty
 - [ ] 虚拟DOM（VNode）

## Install
 - using npm
``` bash
npm i buejs
```
 - using in browser
``` html
<script scr="//unpkg.com/buejs@latest"></script>
<!-- or -->
<script scr="//cdn.jsdelivr.net/npm/buejs@latest"></script>
```

## Usage
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

## Particular Thanks

- [DMQ](https://github.com/DMQ)
- [liyanlong](https://github.com/liyanlong)
