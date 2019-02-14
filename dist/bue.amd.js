define(function () { 'use strict';

	function typeOf(wtf) {
	    return Object.prototype.toString
	        .call(wtf)
	        .slice(8, -1)
	        .toLowerCase();
	}
	function warn(msg) {
	    if (process.env.NODE_ENV !== 'production') {
	        console.warn("[Bue Warn]: " + msg);
	    }
	}
	function isReserved(str) {
	    var c = (str + '').charCodeAt(0);
	    return c === 0x24 || c === 0x5f;
	}
	function hasOwn(wtf, key) {
	    return Object.prototype.hasOwnProperty.call(wtf, key);
	}
	function proxy(target, sourceKey, key) {
	    Object.defineProperty(target, key, {
	        get: function () {
	            return this[sourceKey][key];
	        },
	        set: function (newValue) {
	            this[sourceKey][key] = newValue;
	        }
	    });
	}
	var getValue = function (target, path) {
	    if (path in target) {
	        return target[path];
	    }
	    var val = target;
	    path.split('.').forEach(function (k) {
	        val = val[k];
	    });
	    return val;
	};
	var setValue = function (target, path, value) {
	    if (path in target) {
	        target[path] = value;
	        return;
	    }
	    var val;
	    path.split('.').forEach(function (k, i, arr) {
	        if (i < arr.length - 1) {
	            val = val[k];
	        }
	        else {
	            val[k] = value;
	        }
	    });
	    return val;
	};

	var uid = 0;
	var Dep = (function () {
	    function Dep() {
	        this.id = ++uid;
	        this.watchers = [];
	    }
	    Dep.prototype.addWatcher = function (watcher) {
	        this.watchers.push(watcher);
	    };
	    Dep.prototype.removeWatcher = function (watcher) {
	        var index = this.watchers.indexOf(watcher);
	        if (index > -1) {
	            this.watchers.splice(index, 1);
	        }
	    };
	    Dep.prototype.notify = function () {
	        this.watchers.forEach(function (w) {
	            w.update();
	        });
	    };
	    Dep.prototype.depend = function () {
	        if (Dep.target) {
	            Dep.target.addDep(this);
	        }
	    };
	    Dep.target = null;
	    return Dep;
	}());
	var targetStack = [];
	function pushTarget(_target) {
	    if (Dep.target) {
	        targetStack.push(Dep.target);
	    }
	    Dep.target = _target;
	}
	function popTarget() {
	    Dep.target = targetStack.pop();
	}

	var Observer = (function () {
	    function Observer(data) {
	        this.walk(data);
	    }
	    Observer.prototype.walk = function (data) {
	        for (var key in data) {
	            var item = data[key];
	            var dep = defineReactive(data, key, item);
	            var childOb = observe(item);
	            if (Array.isArray(item)) {
	                childOb.dep = dep;
	            }
	        }
	    };
	    return Observer;
	}());
	function defineReactive(data, key, val) {
	    var dep = new Dep();
	    Object.defineProperty(data, key, {
	        enumerable: true,
	        configurable: false,
	        get: function () {
	            dep.depend();
	            return val;
	        },
	        set: function (newVal) {
	            if (newVal === val) {
	                return;
	            }
	            val = newVal;
	            observe(newVal);
	            dep.notify();
	        }
	    });
	    return dep;
	}

	var methods = ['pop', 'push', 'unshift', 'shift', 'splice', 'sort', 'reverse'];
	var middleArrayPrototype = Object.create(Array.prototype);
	methods.forEach(function (method) {
	    var original = Array.prototype[method];
	    Object.defineProperty(middleArrayPrototype, method, {
	        value: function () {
	            var result = original.apply(this, arguments);
	            this.__ob__.dep.notify();
	            return result;
	        }
	    });
	});

	function observe(data) {
	    if (!data || typeof data !== 'object') {
	        return;
	    }
	    if (data.__ob__) {
	        return data.__ob__;
	    }
	    if (Array.isArray(data)) {
	        data.__proto__ = middleArrayPrototype;
	        data.forEach(function (item) {
	            observe(item);
	        });
	    }
	    var __ob__ = new Observer(data);
	    Object.defineProperty(data, '__ob__', {
	        configurable: false,
	        writable: false,
	        enumerable: false,
	        value: __ob__
	    });
	    return __ob__;
	}

	function initState(bm) {
	    var data = bm.$options.data;
	    if (data) {
	        initData(bm);
	    }
	    else {
	        observe((bm._data = {}));
	    }
	}
	function initData(bm) {
	    var _a = bm.$options, data = _a.data, methods = _a.methods;
	    data = bm._data = typeof data === 'function' ? data.call(bm) : data;
	    if (typeOf(data) === 'object') {
	        for (var key in data) {
	            if (methods && hasOwn(methods, key)) {
	                warn("The method \"" + key + "\" has already been declared as a data property.");
	            }
	            if (isReserved(key)) {
	                warn("The data property \"" + key + "\" is a reserved key.");
	            }
	            else {
	                proxy(bm, '_data', key);
	            }
	        }
	    }
	    observe(data);
	}
	function initComputed(bm) {
	    var computed = bm.$options.computed;
	    if (typeOf(computed) === 'object') {
	        Object.keys(computed).forEach(function (key) {
	            var opt = computed[key];
	            var isF = typeOf(opt) === 'function';
	            Object.defineProperty(bm, key, {
	                get: isF ? opt : opt.get.call(bm),
	                set: isF
	                    ? function () {
	                        warn("Avoiding modify the computed property \"" + key + "\" unless you provide an setter.");
	                    }
	                    : function () {
	                        opt.set.apply(bm, arguments);
	                    }
	            });
	        });
	    }
	}

	var parseGetter = function (exp) {
	    if (/[^\w.$]/.test(exp))
	        return;
	    return function (obj) { return getValue(obj, exp); };
	};
	var uid$1 = 0;
	var Watcher = (function () {
	    function Watcher(bm, expOrFn, cb) {
	        this.depIds = {};
	        this.id = uid$1++;
	        this.bm = bm;
	        this.expOrFn = expOrFn;
	        this.cb = cb;
	        if (typeof expOrFn === 'function') {
	            this.getter = expOrFn;
	        }
	        else {
	            this.getter = parseGetter(expOrFn);
	        }
	        this.value = this.get();
	    }
	    Watcher.prototype.update = function () {
	        var newValue = this.get();
	        var oldVal = this.value;
	        this.value = newValue;
	        this.cb.call(this.bm, newValue, oldVal);
	    };
	    Watcher.prototype.addDep = function (dep) {
	        if (!this.depIds.hasOwnProperty(dep.id)) {
	            dep.addWatcher(this);
	            this.depIds[dep.id] = dep;
	        }
	    };
	    Watcher.prototype.get = function () {
	        pushTarget(this);
	        var value = this.getter.call(this.bm, this.bm);
	        popTarget();
	        return value;
	    };
	    return Watcher;
	}());

	var updaters = {
	    text: function (node, value) {
	        if (value === void 0) { value = ''; }
	        node.textContent = value;
	    },
	    model: function (node, value) {
	        if (value === void 0) { value = ''; }
	        node.value = value;
	    }
	};

	var utils = {
	    text: function (node, bm, exp) {
	        this.bind(node, bm, exp, updaters.text);
	    },
	    model: function (node, bm, exp) {
	        this.bind(node, bm, exp, updaters.model);
	        var handler = function (e) {
	            var newValue = e.target.value;
	            setValue(bm, exp, newValue);
	        };
	        node.addEventListener('input', handler);
	        node.addEventListener('change', handler);
	    },
	    bind: function (node, bm, exp, updater) {
	        updater && updater(node, getValue(bm, exp));
	        new Watcher(bm, exp, function (value, oldValue) {
	            updater && updater(node, value, oldValue);
	        });
	    },
	    eventHandler: function (node, bm, eventName, dir) {
	        var fn = bm.$options.methods && bm.$options.methods[dir];
	        if (eventName && fn) {
	            node.addEventListener(eventName, fn.bind(bm), false);
	        }
	    }
	};

	var isElementNode = function (node) { return node.nodeType == 1; };
	var isTextNode = function (node) { return node.nodeType == 3; };
	var node2Fragment = function (node) {
	    var fragment = document.createDocumentFragment();
	    while (node.firstChild) {
	        fragment.appendChild(node.firstChild);
	    }
	    return fragment;
	};
	var Compiler = (function () {
	    function Compiler(el, bm) {
	        this.$el = bm.$el = isElementNode(el) ? el : document.querySelector(el);
	        this.$bm = bm;
	        if (this.$el) {
	            this.$fragment = node2Fragment(this.$el);
	            this.compileElement(this.$fragment);
	            this.$el.appendChild(this.$fragment);
	        }
	    }
	    Compiler.prototype.compileElement = function (el) {
	        var _this = this;
	        el.childNodes.forEach(function (node) {
	            if (isElementNode(node)) {
	                _this.compileNode(node);
	            }
	            else if (isTextNode(node) && /{{\s*(.*?)\s*}}/.test(node.textContent)) {
	                _this.compileText(node, RegExp.$1);
	            }
	            if (node.childNodes && node.childNodes.length) {
	                _this.compileElement(node);
	            }
	        });
	    };
	    Compiler.prototype.compileNode = function (node) {
	        var _this = this;
	        Array.from(node.attributes).forEach(function (attr) {
	            if (/^b-(\w+)/.test(attr.name)) {
	                utils[RegExp.$1](node, _this.$bm, attr.value);
	                node.removeAttribute(attr.name);
	            }
	            else if (/^@(\w+)/.test(attr.name)) {
	                utils.eventHandler(node, _this.$bm, RegExp.$1, attr.value);
	                node.removeAttribute(attr.name);
	            }
	        });
	    };
	    Compiler.prototype.compileText = function (node, exp) {
	        utils.text(node, this.$bm, exp);
	    };
	    return Compiler;
	}());

	var uid$2 = 0;
	var Bue = (function () {
	    function Bue(options) {
	        this._uid = ++uid$2;
	        this._isBue = true;
	        this.$options = options;
	        initState(this);
	        initComputed(this);
	        this.$compiler = new Compiler(options.el, this);
	    }
	    return Bue;
	}());

	return Bue;

});
