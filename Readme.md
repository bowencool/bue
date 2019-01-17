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
	<div>
		<h1>{{name}}</h1>
		<input b-model="name" />
	</div>
	<button @click="reset">reset</button>
</div>
```
``` js
new Bue({
	el: '#app',
	data() {
		return {
			name: 'hello, bue',
		};
	},
	methods: {
		reset() {
			this.name = 'hello, bue';
		},
	},
})
```
## Todos
 - [x] 事件绑定
 - [x] 双向绑定
 - [ ] 计算属性
 - [ ] 监听数组变化
