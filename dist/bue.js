(function webpackUniversalModuleDefinition(root, factory) {
	if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
	else if (typeof define === 'function' && define.amd) define([], factory);
	else if (typeof exports === 'object') exports['Bue'] = factory();
	else root['Bue'] = factory();
})(window, function() {
	return /******/ (function(modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/ var installedModules = {}; // The require function
		/******/
		/******/ /******/ function __webpack_require__(moduleId) {
			/******/
			/******/ // Check if module is in cache
			/******/ if (installedModules[moduleId]) {
				/******/ return installedModules[moduleId].exports;
				/******/
			} // Create a new module (and put it into the cache)
			/******/ /******/ var module = (installedModules[moduleId] = {
				/******/ i: moduleId,
				/******/ l: false,
				/******/ exports: {},
				/******/
			}); // Execute the module function
			/******/
			/******/ /******/ modules[moduleId].call(
				module.exports,
				module,
				module.exports,
				__webpack_require__
			); // Flag the module as loaded
			/******/
			/******/ /******/ module.l = true; // Return the exports of the module
			/******/
			/******/ /******/ return module.exports;
			/******/
		} // expose the modules object (__webpack_modules__)
		/******/
		/******/
		/******/ /******/ __webpack_require__.m = modules; // expose the module cache
		/******/
		/******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
		/******/
		/******/ /******/ __webpack_require__.d = function(exports, name, getter) {
			/******/ if (!__webpack_require__.o(exports, name)) {
				/******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
				/******/
			}
			/******/
		}; // define __esModule on exports
		/******/
		/******/ /******/ __webpack_require__.r = function(exports) {
			/******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
				/******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
				/******/
			}
			/******/ Object.defineProperty(exports, '__esModule', { value: true });
			/******/
		}; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
		/******/
		/******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
			value,
			mode
		) {
			/******/ if (mode & 1) value = __webpack_require__(value);
			/******/ if (mode & 8) return value;
			/******/ if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
			/******/ var ns = Object.create(null);
			/******/ __webpack_require__.r(ns);
			/******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
			/******/ if (mode & 2 && typeof value != 'string')
				for (var key in value)
					__webpack_require__.d(
						ns,
						key,
						function(key) {
							return value[key];
						}.bind(null, key)
					);
			/******/ return ns;
			/******/
		}; // getDefaultExport function for compatibility with non-harmony modules
		/******/
		/******/ /******/ __webpack_require__.n = function(module) {
			/******/ var getter =
				module && module.__esModule
					? /******/ function getDefault() {
							return module['default'];
					  }
					: /******/ function getModuleExports() {
							return module;
					  };
			/******/ __webpack_require__.d(getter, 'a', getter);
			/******/ return getter;
			/******/
		}; // Object.prototype.hasOwnProperty.call
		/******/
		/******/ /******/ __webpack_require__.o = function(object, property) {
			return Object.prototype.hasOwnProperty.call(object, property);
		}; // __webpack_public_path__
		/******/
		/******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
		/******/
		/******/
		/******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
		/******/
	})(
		/************************************************************************/
		/******/ [
			/* 0 */
			/***/ function(module, __webpack_exports__, __webpack_require__) {
				'use strict';
				__webpack_require__.r(__webpack_exports__);

				// CONCATENATED MODULE: ./src/utils/index.ts
				function typeOf(wtf) {
					return Object.prototype.toString
						.call(wtf)
						.slice(8, -1)
						.toLowerCase();
				}
				function warn(msg) {
					if (false) {
					}
				}
				function isReserved(str) {
					var c = (str + '').charCodeAt(0);
					return c === 0x24 || c === 0x5f;
				}
				function hasOwn(wtf, key) {
					return Object.prototype.hasOwnProperty.call(wtf, key);
				}
				function def(target, key, value, enumerable) {
					Object.defineProperty(target, key, {
						value: value,
						enumerable: !!enumerable,
						writable: true,
						configurable: true,
					});
				}
				function proxy(target, sourceKey, key) {
					Object.defineProperty(target, key, {
						get: function() {
							return this[sourceKey][key];
						},
						set: function(newValue) {
							this[sourceKey][key] = newValue;
						},
					});
				}

				// CONCATENATED MODULE: ./src/core/observer/Dep.ts
				var uid = 0;
				var Dep = (function() {
					function Dep() {
						this.id = ++uid;
						this.watchers = [];
					}
					Dep.prototype.addWatcher = function(watcher) {
						this.watchers.push(watcher);
					};
					Dep.prototype.removeWatcher = function(watcher) {
						var index = this.watchers.indexOf(watcher);
						if (index > -1) {
							this.watchers.splice(index, 1);
						}
					};
					Dep.prototype.notify = function() {
						this.watchers.forEach(function(w) {
							w.update();
						});
					};
					Dep.target = null;
					return Dep;
				})();
				/* harmony default export */ var observer_Dep = Dep;

				// CONCATENATED MODULE: ./src/core/observer/Observer.ts

				var Observer_Observer = (function() {
					function Observer(data) {
						this.data = data;
						this.walk(data);
					}
					Observer.prototype.walk = function(data) {
						for (var key in data) {
							this.defineReactive(data, key, data[key]);
						}
					};
					Observer.prototype.defineReactive = function(data, key, val) {
						var dep = new observer_Dep();
						Object.defineProperty(data, key, {
							enumerable: true,
							configurable: false,
							get: function() {
								return val;
							},
							set: function(newVal) {
								if (newVal === val) {
									return;
								}
								val = newVal;
								observe(newVal);
								dep.notify();
							},
						});
					};
					return Observer;
				})();
				/* harmony default export */ var observer_Observer = Observer_Observer;

				// CONCATENATED MODULE: ./src/core/observer/index.ts

				function observe(data) {
					if (!data || typeof data !== 'object') {
						return;
					}
					if (data.__ob__) {
						return data.__ob__;
					}
					var __ob__ = new observer_Observer(data);
					Object.defineProperty(data, '__ob__', {
						configurable: false,
						writable: false,
						enumerable: false,
						value: __ob__,
					});
					return __ob__;
				}

				// CONCATENATED MODULE: ./src/core/instance/state.ts

				function initState(bm) {
					var data = bm.$options.data;
					if (data) {
						initData(bm);
					} else {
						observe((bm._data = {}));
					}
				}
				function initData(bm) {
					var _a = bm.$options,
						data = _a.data,
						methods = _a.methods;
					data = bm._data = typeof data === 'function' ? data.call(bm) : data;
					if (typeOf(data) === 'object') {
						for (var key in data) {
							if (methods && hasOwn(methods, key)) {
								warn('The method "' + key + '" has already been declared as a data property.');
							}
							if (isReserved(key)) {
								warn('The data property "' + key + '" is a reserved key.');
							} else {
								proxy(bm, '_data', key);
							}
						}
					}
					observe(data);
				}

				// CONCATENATED MODULE: ./src/core/index.ts

				var core_uid = 0;
				var core_Bue = (function() {
					function Bue(options) {
						this._uid = ++core_uid;
						this._isBue = true;
						this.$options = options;
						initState(this);
					}
					return Bue;
				})();
				/* harmony default export */ var core = (__webpack_exports__['default'] = core_Bue);

				/***/
			},
			/******/
		]
	)['default'];
});
