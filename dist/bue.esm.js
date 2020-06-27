/*!
* buejs v1.0.3
* Copyright (c) 2019 bowencool
* Released under the MIT License.
*/
function typeOf(wtf) {
    return Object.prototype.toString
        .call(wtf)
        .slice(8, -1)
        .toLowerCase();
}
function isJson(wtf) {
    const type = typeOf(wtf);
    return type === 'object' || type === 'array';
}
function warn(msg) {
    if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Bue Warn]: ${msg}`);
    }
}
function isReserved(str) {
    const c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5f;
}
function hasOwn(wtf, key) {
    return Object.prototype.hasOwnProperty.call(wtf, key);
}
const getValue = (target, path) => {
    if (path in target) {
        const v = target[path];
        return v;
    }
    let val = target;
    path.split('.').forEach(k => {
        val = val[k];
    });
    return val;
};
const setValue = (target, path, value) => {
    if (path in target) {
        target[path] = value;
        return;
    }
    let val = target;
    path.split('.').forEach((k, i, arr) => {
        if (i < arr.length - 1) {
            val = val[k];
        }
        else {
            val[k] = value;
        }
    });
    return val;
};

let uid = 0;
class Dep {
    constructor(propertyName) {
        this.watchers = new Set();
        this.id = uid++;
        this.propertyName = propertyName;
    }
    addWatcher(watcher) {
        this.watchers.add(watcher);
    }
    removeWatcher(watcher) {
        this.watchers.delete(watcher);
    }
    notify() {
        console.log('dep.notify: ', this);
        this.watchers.forEach(w => {
            w.update();
        });
    }
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }
}
Dep.target = null;
const targetStack = [];
function pushTarget(_target) {
    if (Dep.target) {
        targetStack.push(Dep.target);
    }
    Dep.target = _target;
}
function popTarget() {
    Dep.target = targetStack.pop();
}

function observe(obj, dep) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    console.log('OBSERVING', obj);
    const deps = {};
    const caches = {};
    const handler = {
        get(target, key, receiver) {
            if (hasOwn(target, key)) {
                console.log('\n');
                console.group(`proxy get: ${key}`);
                if (!deps[key]) {
                    deps[key] = dep || new Dep(key);
                }
                deps[key].depend();
                console.groupEnd();
                const child = target[key];
                if (isJson(child)) {
                    if (!caches[key]) {
                        caches[key] = observe(child, deps[key]);
                    }
                    return caches[key];
                }
            }
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
            console.log('\nset: ', key, value);
            const wtf = Reflect.set(target, key, value, receiver);
            let dep = deps[key];
            dep && dep.notify();
            return wtf;
        },
    };
    return new Proxy(obj, handler);
}

function initState(bm) {
    initData(bm);
}
function initData(bm) {
    let { data, methods } = bm.$options;
    data = (typeof data === 'function' ? data.call(bm) : data) || {};
    if (typeOf(data) === 'object') {
        const p = (bm._proxy = observe(data));
        for (const key in data) {
            if (methods && hasOwn(methods, key)) {
                return warn(`The data property "${key}" has already been declared as a method.`);
            }
            if (isReserved(key)) {
                warn(`The data property "${key}" is a reserved key.`);
            }
            else {
                Object.defineProperty(bm, key, {
                    get() {
                        return p[key];
                    },
                    set(v) {
                        p[key] = v;
                    },
                });
            }
        }
    }
}
function initComputed(bm) {
    const computed = bm.$options.computed;
    if (typeOf(computed) === 'object') {
        Object.keys(computed).forEach(key => {
            const opt = computed[key];
            let descripter = {};
            if (typeof opt === 'function') {
                descripter = {
                    get: opt,
                    set: function () {
                        warn(`Avoiding modify the computed property "${key}" unless you provide an setter.`);
                    },
                };
            }
            else {
                descripter = {
                    get: opt.get.bind(bm),
                    set: function () {
                        var _a;
                        (_a = opt.set) === null || _a === void 0 ? void 0 : _a.apply(bm, arguments);
                    },
                };
            }
            Object.defineProperty(bm, key, descripter);
        });
    }
}

const parseGetter = (exp) => {
    if (/[^\w.$]/.test(exp))
        return;
    return (obj) => getValue(obj, exp);
};
let uid$1 = 0;
class Watcher {
    constructor(bm, expOrFn, cb) {
        this.deps = new Set();
        console.group('creating watcher: ', expOrFn);
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
        console.groupEnd();
    }
    update() {
        console.group('watcher.update');
        const newValue = this.get();
        const oldVal = this.value;
        this.value = newValue;
        this.cb.call(this.bm, newValue, oldVal);
        console.log('updated:', newValue, oldVal);
        console.groupEnd();
    }
    addDep(dep) {
        dep.addWatcher(this);
        this.deps.add(dep);
        console.log('addDep:', dep, this);
    }
    get() {
        console.group('watcher.get');
        pushTarget(this);
        const value = this.getter.call(this.bm, this.bm);
        popTarget();
        console.groupEnd();
        return value;
    }
}

var updaters = {
    text(node, value = 'none') {
        node.textContent = value;
    },
    model(node, value = '') {
        node.value = value;
    },
};

const DirectiveNames = ['bind'];
const utils = {
    text(node, bm, exp) {
        this.bind(node, bm, exp, updaters.text);
    },
    model(node, bm, exp) {
        this.bind(node, bm, exp, updaters.model);
        const handler = function (e) {
            const newValue = e.target.value;
            setValue(bm, exp, newValue);
        };
        node.addEventListener('input', handler);
        node.addEventListener('change', handler);
    },
    bind(node, bm, exp, updater) {
        console.group('compiler get initialValue:', exp);
        const initialValue = getValue(bm, exp);
        updater && updater(node, initialValue);
        console.groupEnd();
        new Watcher(bm, exp, function (value, oldValue) {
            updater && updater(node, value, oldValue);
        });
    },
    eventHandler(node, bm, eventName, dir) {
        const fn = bm.$options.methods && bm.$options.methods[dir];
        if (eventName && fn) {
            node.addEventListener(eventName, fn.bind(bm), false);
        }
    },
};

const isElementNode = (node) => node.nodeType === 1;
const isTextNode = (node) => node.nodeType === 3;
const node2Fragment = (node) => {
    const fragment = document.createDocumentFragment();
    while (node.firstChild) {
        fragment.appendChild(node.firstChild);
    }
    return fragment;
};
class Compiler {
    constructor(el, bm) {
        let $el;
        if (typeof el === 'string') {
            $el = document.querySelector(el);
        }
        else {
            $el = el;
        }
        this.$el = bm.$el = $el;
        this.$bm = bm;
        if (this.$el) {
            this.$fragment = node2Fragment(this.$el);
            this.compileElement(this.$fragment);
            this.$el.appendChild(this.$fragment);
        }
    }
    compileElement(el) {
        el.childNodes.forEach((node) => {
            if (isElementNode(node)) {
                this.compileNode(node);
            }
            else if (isTextNode(node) && /{{\s*(.*?)\s*}}/.test(node.textContent)) {
                this.compileText(node, RegExp.$1);
            }
            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node);
            }
        });
    }
    compileNode(node) {
        Array.from(node.attributes).forEach(attr => {
            if (/^b-(\w+)/.test(attr.name)) {
                if (DirectiveNames.includes(RegExp.$1)) {
                    utils[(RegExp.$1)](node, this.$bm, attr.value);
                    node.removeAttribute(attr.name);
                }
            }
            else if (/^@(\w+)/.test(attr.name)) {
                utils.eventHandler(node, this.$bm, RegExp.$1, attr.value);
                node.removeAttribute(attr.name);
            }
        });
    }
    compileText(node, exp) {
        utils.text(node, this.$bm, exp);
    }
}

let uid$2 = 0;
class Bue {
    constructor(options) {
        this._uid = ++uid$2;
        this._isBue = true;
        this.$options = options;
        initState(this);
        initComputed(this);
        this.$compiler = new Compiler(options.el, this);
    }
}

export default Bue;
