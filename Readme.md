# Bue
> An MVVM framework, [Live Demo](https://bowencool.github.io/bue/)

## Install
``` bash
npm i buejs
```
### Or
``` html
<script scr="//unpkg.com/buejs"></script>
<!-- or -->
<script scr="//cdn.jsdelivr.net/npm/buejs"></script>
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
## Todos
 - [x] 事件绑定
 - [x] 双向绑定
 - [x] 计算属性
 - [ ] 监听数组变化
