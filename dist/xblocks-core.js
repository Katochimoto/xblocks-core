(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("xtag"), require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["xtag", "react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["xblocks-core"] = factory(require("xtag"), require("react"), require("react-dom"));
	else
		root["xblocks-core"] = factory(root["xtag"], root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_114__, __WEBPACK_EXTERNAL_MODULE_122__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.element = exports.view = exports.utils = exports.event = exports.dom = exports.create = undefined;

	var _block = __webpack_require__(1);

	Object.defineProperty(exports, 'create', {
	  enumerable: true,
	  get: function get() {
	    return _block.create;
	  }
	});

	var _decorator = __webpack_require__(140);

	Object.defineProperty(exports, 'element', {
	  enumerable: true,
	  get: function get() {
	    return _decorator.element;
	  }
	});

	var _dom2 = __webpack_require__(112);

	var _dom = _interopRequireWildcard(_dom2);

	var _event2 = __webpack_require__(124);

	var _event = _interopRequireWildcard(_event2);

	var _utils2 = __webpack_require__(137);

	var _utils = _interopRequireWildcard(_utils2);

	var _view2 = __webpack_require__(123);

	var _view = _interopRequireWildcard(_view2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.dom = _dom;
	exports.event = _event;
	exports.utils = _utils;
	exports.view = _view;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.create = create;

	var _xtag = __webpack_require__(2);

	var xtag = _interopRequireWildcard(_xtag);

	var _isPlainObject = __webpack_require__(3);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _isArray = __webpack_require__(7);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _merge = __webpack_require__(8);

	var _merge2 = _interopRequireDefault(_merge);

	var _uniqueId = __webpack_require__(110);

	var _uniqueId2 = _interopRequireDefault(_uniqueId);

	var _dom = __webpack_require__(112);

	var dom = _interopRequireWildcard(_dom);

	var _element = __webpack_require__(121);

	var _utils = __webpack_require__(137);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var BLOCK_COMMON = {
	    lifecycle: {
	        /**
	         * The callback of the create element.
	         */
	        created: function created() {
	            blockInit(this);
	        },

	        /**
	         * The callback of the insert in DOM.
	         */
	        inserted: function inserted() {
	            if (this.xinserted) {
	                return;
	            }

	            blockInit(this);

	            this.xinserted = true;

	            var isScriptContent = Boolean(this.querySelector('script'));

	            // asynchronous read content
	            // <xb-test><script>...</script><div>not found</div></xb-test>
	            if (isScriptContent) {
	                (0, _utils.lazy)(blockCreateLazy, this);
	            } else {
	                blockCreate(this);
	            }
	        },

	        /**
	         * The callback of the remote in DOM.
	         */
	        removed: function removed() {
	            this.xinserted = false;

	            if (this.xblock) {
	                this.xblock.destroy();
	                this.xblock = undefined;
	            }
	        }
	    },

	    accessors: {
	        mounted: {
	            /**
	             * Check react mounted
	             * @returns {boolean}
	             */
	            get: function get() {
	                return Boolean(this.xblock && this.xblock.isMounted());
	            }
	        },

	        content: {
	            /**
	             * Receiving the content.
	             * @returns {?string}
	             */
	            get: function get() {
	                if (this.mounted) {
	                    return this.xblock.getMountedContent();
	                }

	                return dom.contentNode(this).innerHTML;
	            },

	            /**
	             * Installing a new content.
	             * @param {string} content
	             */
	            set: function set(content) {
	                if (this.mounted) {
	                    this.xblock.setMountedContent(content);
	                } else {
	                    dom.contentNode(this).innerHTML = content;
	                    this.upgrade();
	                }
	            }
	        },

	        attrs: {
	            /**
	             * Getting object attributes.
	             * @returns {Object}
	             */
	            get: function get() {
	                return dom.attrs.toObject(this);
	            }
	        },

	        props: {
	            /**
	             * Getting object properties.
	             * @returns {Object}
	             */
	            get: function get() {
	                var props = dom.attrs.toObject(this);
	                var xprops = this.xprops;
	                var eprops = xtag.tags[this.xtagName].accessors;
	                var common = BLOCK_COMMON.accessors;

	                for (var prop in eprops) {
	                    if (xprops.hasOwnProperty(prop) && eprops.hasOwnProperty(prop) && !common.hasOwnProperty(prop)) {

	                        props[prop] = this[prop];
	                    }
	                }

	                dom.attrs.typeConversion(props, xprops);
	                return props;
	            }
	        },

	        xprops: {
	            /**
	             * Getting react properties.
	             * @returns {Object}
	             */
	            get: function get() {
	                return (0, _utils.propTypes)(this.xtagName);
	            }
	        },

	        outerHTML: dom.outerHTML
	    },

	    methods: {
	        /**
	         * Recalculation of the internal structure.
	         */
	        upgrade: function upgrade() {
	            dom.upgradeAll(this);
	        },

	        /**
	         * Cloning a node.
	         * @param {boolean} deep true if the content to be saved
	         * @returns {HTMLElement}
	         */
	        cloneNode: function cloneNode(deep) {
	            // not to clone the contents
	            var node = dom.cloneNode(this, false);
	            dom.upgrade(node);

	            node.xtmpl = this.xtmpl;
	            node.xinserted = false;

	            if (deep) {
	                node.content = this.content;
	            }

	            // ???
	            // if ('checked' in this) clone.checked = this.checked;

	            return node;
	        }
	    }
	};

	/**
	 * Creating a new tag.
	 * @see http://x-tags.org/docs
	 * @param {string} blockName the name of the new node
	 * @param {?Object|array} options settings tag creation
	 * @returns {HTMLElement}
	 * @public
	 */
	function create(blockName, options) {
	    options = (0, _isArray2.default)(options) ? options : [options];
	    options.unshift({});
	    options.push(BLOCK_COMMON);

	    // error when merging prototype in FireFox <=19
	    var proto = void 0;
	    var i = 1;
	    var l = options.length;

	    for (; i < l; i++) {
	        var o = options[i];

	        if ((0, _isPlainObject2.default)(o) && o.prototype) {
	            if (!proto) {
	                proto = o.prototype;
	            }

	            delete o.prototype;
	        }
	    }

	    options = _merge2.default.apply({}, options);

	    if (proto) {
	        options.prototype = proto;
	    }

	    return xtag.register(blockName, options);
	}

	/**
	 * Initialization of the element.
	 * @param {HTMLElement} node
	 * @returns {boolean}
	 * @private
	 */
	function blockInit(node) {
	    if (!node.xtagName) {
	        node.xtagName = node.tagName.toLowerCase();
	        node.xtmpl = {};
	        node.xuid = (0, _uniqueId2.default)();
	        node.xinserted = false;
	        return true;
	    }

	    return false;
	}

	/**
	 * Creating an item.
	 * @param {HTMLElement} node
	 * @private
	 */
	function blockCreate(node) {
	    if (node.hasChildNodes()) {
	        Array.prototype.forEach.call(node.querySelectorAll('script[type="text/x-template"][ref],template[ref]'), tmplCompileIterator, node);
	    }

	    node.xblock = new _element.XBElement(node);
	}

	/**
	 * Pending the creation of the item.
	 * @param {HTMLElement[]} nodes
	 * @private
	 */
	function blockCreateLazy(nodes) {
	    nodes.forEach(blockCreate);
	}

	/**
	 * The selection of templates.
	 * @param {HTMLElement} node
	 * @private
	 */
	function tmplCompileIterator(node) {
	    this.xtmpl[node.getAttribute('ref')] = node.innerHTML;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(4),
	    isHostObject = __webpack_require__(5),
	    isObjectLike = __webpack_require__(6);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(9),
	    createAssigner = __webpack_require__(103);

	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively.Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});

	module.exports = merge;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(10),
	    arrayEach = __webpack_require__(44),
	    assignMergeValue = __webpack_require__(45),
	    baseMergeDeep = __webpack_require__(46),
	    isArray = __webpack_require__(7),
	    isObject = __webpack_require__(28),
	    isTypedArray = __webpack_require__(97),
	    keysIn = __webpack_require__(99);

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  if (!(isArray(source) || isTypedArray(source))) {
	    var props = keysIn(source);
	  }
	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  });
	}

	module.exports = baseMerge;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var stackClear = __webpack_require__(11),
	    stackDelete = __webpack_require__(12),
	    stackGet = __webpack_require__(16),
	    stackHas = __webpack_require__(18),
	    stackSet = __webpack_require__(20);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}

	module.exports = stackClear;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var assocDelete = __webpack_require__(13);

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}

	module.exports = stackDelete;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(14);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	module.exports = assocDelete;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(15);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var assocGet = __webpack_require__(17);

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocGet(array, key) : data.map.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(14);

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	module.exports = assocGet;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var assocHas = __webpack_require__(19);

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocHas(array, key) : data.map.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(14);

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}

	module.exports = assocHas;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(21),
	    assocSet = __webpack_require__(42);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;

	  if (array) {
	    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var mapClear = __webpack_require__(22),
	    mapDelete = __webpack_require__(34),
	    mapGet = __webpack_require__(38),
	    mapHas = __webpack_require__(40),
	    mapSet = __webpack_require__(41);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;

	module.exports = MapCache;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(23),
	    Map = __webpack_require__(30);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': Map ? new Map : [],
	    'string': new Hash
	  };
	}

	module.exports = mapClear;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(24);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	module.exports = Hash;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(25);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(26);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(27),
	    isHostObject = __webpack_require__(5),
	    isObject = __webpack_require__(28),
	    toSource = __webpack_require__(29);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = isNative;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(28);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(25),
	    root = __webpack_require__(31);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var checkGlobal = __webpack_require__(33);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();

	module.exports = root;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)(module), (function() { return this; }())))

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	module.exports = checkGlobal;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(30),
	    assocDelete = __webpack_require__(13),
	    hashDelete = __webpack_require__(35),
	    isKeyable = __webpack_require__(37);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}

	module.exports = mapDelete;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var hashHas = __webpack_require__(36);

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}

	module.exports = hashDelete;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(24);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}

	module.exports = hashHas;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value != '__proto__') || value == null;
	}

	module.exports = isKeyable;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(30),
	    assocGet = __webpack_require__(17),
	    hashGet = __webpack_require__(39),
	    isKeyable = __webpack_require__(37);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}

	module.exports = mapGet;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(24);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(30),
	    assocHas = __webpack_require__(19),
	    hashHas = __webpack_require__(36),
	    isKeyable = __webpack_require__(37);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}

	module.exports = mapHas;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(30),
	    assocSet = __webpack_require__(42),
	    hashSet = __webpack_require__(43),
	    isKeyable = __webpack_require__(37);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}

	module.exports = mapSet;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(14);

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	module.exports = assocSet;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(24);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	}

	module.exports = hashSet;


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(15);

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (typeof key == 'number' && value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	module.exports = assignMergeValue;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(45),
	    baseClone = __webpack_require__(47),
	    copyArray = __webpack_require__(66),
	    isArguments = __webpack_require__(56),
	    isArray = __webpack_require__(7),
	    isArrayLikeObject = __webpack_require__(57),
	    isFunction = __webpack_require__(27),
	    isObject = __webpack_require__(28),
	    isPlainObject = __webpack_require__(3),
	    isTypedArray = __webpack_require__(97),
	    toPlainObject = __webpack_require__(98);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    newValue = srcValue;
	    if (isArray(srcValue) || isTypedArray(srcValue)) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
	      }
	      else {
	        newValue = objValue;
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  stack.set(srcValue, newValue);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	  }
	  stack['delete'](srcValue);
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(10),
	    arrayEach = __webpack_require__(44),
	    assignValue = __webpack_require__(48),
	    baseAssign = __webpack_require__(49),
	    cloneBuffer = __webpack_require__(65),
	    copyArray = __webpack_require__(66),
	    copySymbols = __webpack_require__(67),
	    getAllKeys = __webpack_require__(69),
	    getTag = __webpack_require__(72),
	    initCloneArray = __webpack_require__(77),
	    initCloneByTag = __webpack_require__(78),
	    initCloneObject = __webpack_require__(93),
	    isArray = __webpack_require__(7),
	    isBuffer = __webpack_require__(95),
	    isHostObject = __webpack_require__(5),
	    isObject = __webpack_require__(28),
	    keys = __webpack_require__(51);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (!isArr) {
	    var props = isFull ? getAllKeys(value) : keys(value);
	  }
	  // Recursively populate clone (susceptible to call stack limits).
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(15);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	module.exports = assignValue;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(50),
	    keys = __webpack_require__(51);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(48);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];

	    assignValue(object, key, newValue);
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(52),
	    baseKeys = __webpack_require__(53),
	    indexKeys = __webpack_require__(54),
	    isArrayLike = __webpack_require__(58),
	    isIndex = __webpack_require__(63),
	    isPrototype = __webpack_require__(64);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(4);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototype(object) === null);
	}

	module.exports = baseHas;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.exports = baseKeys;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(55),
	    isArguments = __webpack_require__(56),
	    isArray = __webpack_require__(7),
	    isLength = __webpack_require__(61),
	    isString = __webpack_require__(62);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.exports = indexKeys;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(57);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(58),
	    isObjectLike = __webpack_require__(6);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(59),
	    isFunction = __webpack_require__(27),
	    isLength = __webpack_require__(61);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(60);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(7),
	    isObjectLike = __webpack_require__(6);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(50),
	    getSymbols = __webpack_require__(68);

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	function getSymbols(object) {
	  // Coerce `object` to an object to avoid non-object errors in V8.
	  // See https://bugs.chromium.org/p/v8/issues/detail?id=3443 for more details.
	  return getOwnPropertySymbols(Object(object));
	}

	// Fallback for IE < 11.
	if (!getOwnPropertySymbols) {
	  getSymbols = function() {
	    return [];
	  };
	}

	module.exports = getSymbols;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(70),
	    getSymbols = __webpack_require__(68),
	    keys = __webpack_require__(51);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(71),
	    isArray = __webpack_require__(7);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object)
	    ? result
	    : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(73),
	    Map = __webpack_require__(30),
	    Promise = __webpack_require__(74),
	    Set = __webpack_require__(75),
	    WeakMap = __webpack_require__(76),
	    toSource = __webpack_require__(29);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(25),
	    root = __webpack_require__(31);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(25),
	    root = __webpack_require__(31);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(25),
	    root = __webpack_require__(31);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(25),
	    root = __webpack_require__(31);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 77 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(79),
	    cloneDataView = __webpack_require__(81),
	    cloneMap = __webpack_require__(82),
	    cloneRegExp = __webpack_require__(86),
	    cloneSet = __webpack_require__(87),
	    cloneSymbol = __webpack_require__(90),
	    cloneTypedArray = __webpack_require__(92);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(80);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(31);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(79);

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	module.exports = cloneDataView;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(83),
	    arrayReduce = __webpack_require__(84),
	    mapToArray = __webpack_require__(85);

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}

	module.exports = cloneMap;


/***/ },
/* 83 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `Map#set` because it doesn't return the map instance in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(88),
	    arrayReduce = __webpack_require__(84),
	    setToArray = __webpack_require__(89);

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}

	module.exports = cloneSet;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(91);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(31);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(79);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(94),
	    getPrototype = __webpack_require__(4),
	    isPrototype = __webpack_require__(64);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(28);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}

	module.exports = baseCreate;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var constant = __webpack_require__(96),
	    root = __webpack_require__(31);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = (freeModule && freeModule.exports === freeExports)
	  ? freeExports
	  : undefined;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = !Buffer ? constant(false) : function(value) {
	  return value instanceof Buffer;
	};

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)(module)))

/***/ },
/* 96 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(61),
	    isObjectLike = __webpack_require__(6);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(50),
	    keysIn = __webpack_require__(99);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(100),
	    indexKeys = __webpack_require__(54),
	    isIndex = __webpack_require__(63),
	    isPrototype = __webpack_require__(64);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(101),
	    iteratorToArray = __webpack_require__(102);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);

	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}

	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}

	module.exports = baseKeysIn;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(31);

	/** Built-in value references. */
	var Reflect = root.Reflect;

	module.exports = Reflect;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];

	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}

	module.exports = iteratorToArray;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(104),
	    rest = __webpack_require__(105);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = typeof customizer == 'function'
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(15),
	    isArrayLike = __webpack_require__(58),
	    isIndex = __webpack_require__(63),
	    isObject = __webpack_require__(28);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(106),
	    toInteger = __webpack_require__(107);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = rest;


/***/ },
/* 106 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(108);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(27),
	    isObject = __webpack_require__(28),
	    isSymbol = __webpack_require__(109);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(6);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(111);

	/** Used to generate unique IDs. */
	var idCounter = 0;

	/**
	 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {string} [prefix=''] The value to prefix the ID with.
	 * @returns {string} Returns the unique ID.
	 * @example
	 *
	 * _.uniqueId('contact_');
	 * // => 'contact_104'
	 *
	 * _.uniqueId();
	 * // => '105'
	 */
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return toString(prefix) + id;
	}

	module.exports = uniqueId;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(91),
	    isSymbol = __webpack_require__(109);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toString;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.upgradeAll = exports.upgrade = exports.outerHTML = exports.contentNode = exports.cloneNode = exports.attrs = undefined;

	var _attrs2 = __webpack_require__(113);

	var _attrs = _interopRequireWildcard(_attrs2);

	var _cloneNode2 = __webpack_require__(115);

	var _cloneNode3 = _interopRequireDefault(_cloneNode2);

	var _contentNode2 = __webpack_require__(117);

	var _contentNode3 = _interopRequireDefault(_contentNode2);

	var _outerHTML2 = __webpack_require__(118);

	var _outerHTML3 = _interopRequireDefault(_outerHTML2);

	var _upgrade2 = __webpack_require__(119);

	var _upgrade3 = _interopRequireDefault(_upgrade2);

	var _upgradeAll2 = __webpack_require__(120);

	var _upgradeAll3 = _interopRequireDefault(_upgradeAll2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.attrs = _attrs;
	exports.cloneNode = _cloneNode3.default;
	exports.contentNode = _contentNode3.default;
	exports.outerHTML = _outerHTML3.default;
	exports.upgrade = _upgrade3.default;
	exports.upgradeAll = _upgradeAll3.default;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.get = get;
	exports.toObject = toObject;
	exports.typeConversion = typeConversion;
	exports.valueConversion = valueConversion;

	var _react = __webpack_require__(114);

	/**
	 * A set of boolean attributes.
	 * @type {string[]}
	 */
	var attrsBoolean = ['active', 'autofocus', 'checked', 'defer', 'disabled', 'ismap', 'multiple', 'readonly', 'required', 'selected'];

	/**
	 * To obtain the specified attributes.
	 *
	 * @example
	 * node = document.createElement('div');
	 * node.setAttribute('attr1', '');
	 * node.setAttribute('attr2', 'test1');
	 * node.setAttribute('attr3', 'test2');
	 * get(node, {
	 *     'attr1': false,
	 *     'attr2': undefined
	 * });
	 * // { 'attr1': true, 'attr2': 'test1' }
	 *
	 * @param {HTMLElement} element
	 * @param {Object} attrs the set of derived attributes (+default values)
	 * @returns {Object}
	 */
	function get(element, attrs) {
	    if (element.nodeType !== 1 || !element.hasAttributes()) {
	        return attrs;
	    }

	    for (var attrName in attrs) {
	        if (attrs.hasOwnProperty(attrName) && element.hasAttribute(attrName)) {
	            if (typeof attrs[attrName] === 'boolean') {
	                attrs[attrName] = valueConversion(attrName, element.getAttribute(attrName), _react.PropTypes.bool);
	            } else {
	                attrs[attrName] = element.getAttribute(attrName);
	            }
	        }
	    }

	    return attrs;
	}

	/**
	 * Retrieve object attributes.
	 *
	 * @example
	 * node = document.createElement('div');
	 * node.setAttribute('attr1', '');
	 * node.setAttribute('attr2', 'test');
	 * toObject(node);
	 * // { 'attr1': '', 'attr2': 'test' }
	 *
	 * @param {HTMLElement} element
	 * @returns {Object}
	 */
	function toObject(element) {
	    var attrs = {};

	    if (element.nodeType === 1 && element.hasAttributes()) {
	        Array.prototype.forEach.call(element.attributes, toObjectIterator, attrs);
	    }

	    return attrs;
	}

	/**
	 * Collective conversion of attribute types.
	 *
	 * @example
	 * typeConversion({
	 *     'attr1': '123',
	 *     'attr2': ''
	 * }, {
	 *     'attr1': PropTypes.number,
	 *     'attr2': PropTypes.bool
	 * });
	 * // { 'attr1': 123, 'attr2': true }
	 *
	 * @param {Object} props the set of attributes
	 * @param {Object} [propTypes] the set of attribute types
	 * @returns {Object}
	 */
	function typeConversion(props, propTypes) {
	    propTypes = propTypes || {};

	    for (var prop in props) {
	        if (props.hasOwnProperty(prop)) {
	            props[prop] = valueConversion(prop, props[prop], propTypes[prop]);
	        }
	    }

	    return props;
	}

	/**
	 * Convert the attribute value to the specified type.
	 *
	 * @example
	 * valueConversion('attr1', 'true');
	 * // true
	 * valueConversion('attr1', 'true', PropTypes.string);
	 * // 'true'
	 * valueConversion('attr1', '123', PropTypes.number);
	 * // 123
	 *
	 * @param {string} prop attribute name
	 * @param {*} value attribute value
	 * @param {function} [type] attribute type
	 * @returns {*}
	 */
	function valueConversion(prop, value, type) {
	    if (!type) {
	        if (value === 'true' || value === 'false' || attrsBoolean.indexOf(prop) !== -1) {
	            type = _react.PropTypes.bool;
	        }
	    }

	    switch (type) {
	        case _react.PropTypes.bool:
	            return Boolean(value === true || value === '' || prop === value || value === 'true');

	        case _react.PropTypes.string:
	            return String(value);

	        case _react.PropTypes.number:
	            return Number(value);

	        default:
	            return value;
	    }
	}

	/**
	 * @param {Attr} attr
	 * @private
	 */
	function toObjectIterator(attr) {
	    this[attr.nodeName] = attr.value;
	}

/***/ },
/* 114 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_114__;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (node, deep) {
	    // FireFox19 cannot use native cloneNode the Node object
	    return elementProto.cloneNode.call(node, deep);

	    /*
	    try {
	        // FireFox19 cannot use native cloneNode the Node object
	        return elementProto.cloneNode.call(node, deep);
	    } catch(e) {
	        // FireFox <=13
	        // uncaught exception: [Exception... "Could not convert JavaScript argument"
	        // nsresult: "0x80570009 (NS_ERROR_XPC_BAD_CONVERT_JS)"
	        return node.ownerDocument.importNode(node, deep);
	    }
	    */
	};

	var _context = __webpack_require__(116);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var elementProto = (_context2.default.HTMLElement || _context2.default.Element).prototype;

	/**
	 * Cloning node.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node.cloneNode
	 * @param {HTMLElement} node the node to be cloned
	 * @param {boolean} deep true if the children of the node should also be cloned,
	 * or false to clone only the specified node.
	 * @returns {HTMLElement} The new node that will be a clone of node
	 */

/***/ },
/* 116 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    /* eslint no-eval: 0 */
	    return this || (1, eval)('this');
	}();

/***/ },
/* 117 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (node) {
	    var element = void 0;

	    if (node.xuid && node.nodeType === 1 && node.hasChildNodes()) {
	        element = node.querySelector('[data-xb-content="' + node.xuid + '"]');

	        if (!element) {
	            element = node.querySelector('script[type="text/x-template"]:not([ref]),template:not([ref])');
	        }
	    }

	    return element || node;
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _context = __webpack_require__(116);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @function xblocks.dom.outerHTML
	 * @prop {Object} xblocks.dom.outerHTML
	 * @prop {function} xblocks.dom.outerHTML.get
	 * @prop {function} xblocks.dom.outerHTML.set
	 */

	exports.default = function () {

	    var container = _context2.default.document.createElementNS('http://www.w3.org/1999/xhtml', '_');
	    var getter = void 0;
	    var setter = void 0;

	    if (container.hasOwnProperty('outerHTML')) {
	        getter = function getter() {
	            return this.outerHTML;
	        };

	        setter = function setter(html) {
	            this.outerHTML = html;
	        };
	    } else {
	        (function () {
	            var serializer = _context2.default.XMLSerializer && new _context2.default.XMLSerializer();
	            var xmlns = /\sxmlns=\"[^\"]+\"/;

	            if (serializer) {
	                getter = function getter() {
	                    return serializer.serializeToString(this).replace(xmlns, '');
	                };
	            } else {
	                getter = function getter() {
	                    container.appendChild(this.cloneNode(false));
	                    var html = container.innerHTML.replace('><', '>' + this.innerHTML + '<');
	                    container.innerHTML = '';
	                    return html;
	                };
	            }

	            setter = function setter(html) {
	                var node = this;
	                var parent = node.parentNode;
	                var child = void 0;

	                if (!parent) {
	                    _context2.default.DOMException.code = _context2.default.DOMException.NOT_FOUND_ERR;
	                    throw _context2.default.DOMException;
	                }

	                container.innerHTML = html;

	                while (child = container.firstChild) {
	                    parent.insertBefore(child, node);
	                }

	                parent.removeChild(node);
	            };
	        })();
	    }

	    return {
	        'get': getter,
	        'set': setter
	    };
	}();

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _context = __webpack_require__(116);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @function upgrade
	 */

	exports.default = function () {
	    if (_context2.default.CustomElements && typeof _context2.default.CustomElements.upgrade === 'function') {
	        return _context2.default.CustomElements.upgrade;
	    } else {
	        return function () {};
	    }
	}();

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _context = __webpack_require__(116);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @function upgradeAll
	 */

	exports.default = function () {
	    if (_context2.default.CustomElements && typeof _context2.default.CustomElements.upgradeAll === 'function') {
	        return _context2.default.CustomElements.upgradeAll;
	    } else {
	        return function () {};
	    }
	}();

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.XBElement = XBElement;

	var _reactDom = __webpack_require__(122);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _merge = __webpack_require__(8);

	var _merge2 = _interopRequireDefault(_merge);

	var _keys = __webpack_require__(51);

	var _keys2 = _interopRequireDefault(_keys);

	var _isArray = __webpack_require__(7);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _context = __webpack_require__(116);

	var _context2 = _interopRequireDefault(_context);

	var _attrs = __webpack_require__(113);

	var _view = __webpack_require__(123);

	var _event = __webpack_require__(124);

	var _lazy = __webpack_require__(126);

	var _lazy2 = _interopRequireDefault(_lazy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Xblock element constructor.
	 * @param {HTMLElement} node the node of a custom element
	 * @constructor XBElement
	 */
	function XBElement(node) {
	    node.xblock = this;

	    this._observerOptions = {
	        attributeFilter: (0, _keys2.default)(node.xprops),
	        attributeOldValue: false,
	        attributes: true,
	        characterData: true,
	        characterDataOldValue: false,
	        childList: true,
	        subtree: false
	    };

	    this._node = node;
	    this._init();
	}

	/**
	 * The node of a custom element.
	 * @type {HTMLElement}
	 * @protected
	 */
	XBElement.prototype._node = null;

	/**
	 * React component.
	 * @type {Constructor}
	 * @protected
	 */
	XBElement.prototype._component = null;

	/**
	 * Instance MutationObserver.
	 * @type {MutationObserver}
	 * @protected
	 */
	XBElement.prototype._observer = null;

	/**
	 * Unmounts a component and removes it from the DOM.
	 * @fires XBElement~event:xb-destroy
	 */
	XBElement.prototype.destroy = function () {
	    var node = this._node;
	    var content = node.content;

	    this._observer.disconnect();
	    this._observer = null;
	    this._component = null;
	    this._node = null;

	    _reactDom2.default.unmountComponentAtNode(node);

	    // replace initial content after destroy react component
	    // fix:
	    // element.parentNode.removeChild(element);
	    // document.body.appendChild(element);
	    node.content = content;
	    node.xblock = undefined;

	    (0, _event.dispatch)(node, 'xb-destroy', { bubbles: false, cancelable: false });
	};

	/**
	 * Update react view.
	 * @param {Object} [props] added attributes
	 * @param {array} [removeProps] remote attributes
	 * @param {function} [callback] the callback function
	 */
	XBElement.prototype.update = function (props, removeProps, callback) {
	    var nextProps = (0, _merge2.default)({}, this.getMountedProps(), this._node.props, props);

	    // merge of new and current properties
	    // and the exclusion of remote properties
	    if ((0, _isArray2.default)(removeProps) && removeProps.length) {
	        var l = removeProps.length;
	        while (l--) {
	            if (nextProps.hasOwnProperty(removeProps[l])) {
	                delete nextProps[removeProps[l]];
	            }
	        }
	    }

	    (0, _attrs.typeConversion)(nextProps, this._node.xprops);

	    var proxyConstructor = (0, _view.getFactory)(this._node.xtagName)(nextProps);
	    var that = this;
	    var renderCallback = function renderCallback() {
	        that._component = this;
	        that._callbackUpdate(callback);
	    };

	    this._observer.disconnect();
	    this._component = _reactDom2.default.render(proxyConstructor, this._node, renderCallback);
	};

	/**
	 * Returns true if the component is rendered into the DOM, false otherwise.
	 * @see http://facebook.github.io/react/docs/component-api.html#ismounted
	 * @returns {boolean}
	 */
	XBElement.prototype.isMounted = function () {
	    return Boolean(this._component && this._component.isMounted());
	};

	/**
	 * Installing a new content react component.
	 * @param {string} content
	 */
	XBElement.prototype.setMountedContent = function (content) {
	    if (this.isMounted()) {
	        this.update({ children: content });
	    }
	};

	/**
	 * Receiving the content components react.
	 * @returns {?string}
	 */
	XBElement.prototype.getMountedContent = function () {
	    if (this.isMounted()) {
	        return this._component.props.children;
	    }
	};

	/**
	 * Get components react.
	 * @returns {?ReactCompositeComponent.createClass.Constructor}
	 */
	XBElement.prototype.getMountedComponent = function () {
	    if (this.isMounted()) {
	        return this._component;
	    }
	};

	/**
	 * Gets the attributes of the components.
	 * @returns {?object}
	 */
	XBElement.prototype.getMountedProps = function () {
	    return this.isMounted() ? this._component.props : null;
	};

	/**
	 * @protected
	 */
	XBElement.prototype._init = function () {
	    var children = this._node.content;
	    var props = (0, _merge2.default)({}, this._node.props, {
	        _uid: this._node.xuid,
	        _container: this._node
	    });

	    (0, _attrs.typeConversion)(props, this._node.xprops);

	    var proxyConstructor = (0, _view.getFactory)(this._node.xtagName)(props, children);
	    var that = this;
	    var renderCallback = function renderCallback() {
	        that._component = this;
	        that._callbackInit();
	    };

	    this._component = _reactDom2.default.render(proxyConstructor, this._node, renderCallback);
	};

	/**
	 * @protected
	 * @fires XBElement~event:xb-created
	 */
	XBElement.prototype._callbackInit = function () {
	    this._node.upgrade();
	    this._observer = new _context2.default.MutationObserver(this._callbackMutation.bind(this));
	    this._observer.observe(this._node, this._observerOptions);

	    (0, _event.dispatch)(this._node, 'xb-created');
	    (0, _lazy2.default)(globalInitEvent, this._node);
	};

	/**
	 * @param {function} [callback] the callback function
	 * @protected
	 * @fires XBElement~event:xb-update
	 */
	XBElement.prototype._callbackUpdate = function (callback) {
	    this._node.upgrade();
	    this._observer.observe(this._node, this._observerOptions);

	    (0, _event.dispatch)(this._node, 'xb-update');
	    (0, _lazy2.default)(globalUpdateEvent, this._node);

	    if (callback) {
	        callback.call(this);
	    }
	};

	/**
	 * @param {MutationRecord[]} records
	 * @protected
	 */
	XBElement.prototype._callbackMutation = function (records) {
	    var removeAttrs = records.filter(filterAttributesRemove, this).map(mapAttributesName);

	    this.update(null, removeAttrs);
	};

	/**
	 * @param {MutationRecord} record
	 * @returns {boolean}
	 * @protected
	 */
	function filterAttributesRemove(record) {
	    return record.type === 'attributes' && !this._node.hasAttribute(record.attributeName);
	}

	/**
	 * @param {MutationRecord} record
	 * @returns {string}
	 * @protected
	 */
	function mapAttributesName(record) {
	    return record.attributeName;
	}

	/**
	 * @param {array} records
	 * @protected
	 */
	function globalInitEvent(records) {
	    (0, _event.dispatch)(_context2.default, 'xb-created', { detail: { records: records } });
	}

	/**
	 * @param {array} records
	 * @protected
	 */
	function globalUpdateEvent(records) {
	    (0, _event.dispatch)(_context2.default, 'xb-update', { detail: { records: records } });
	}

	/**
	 * Created event
	 * @event XBElement~event:xb-created
	 * @type {CustomEvent}
	 */

	/**
	 * Destroy event
	 * @event XBElement~event:xb-destroy
	 * @type {CustomEvent}
	 */

	/**
	 * Updated event
	 * @event XBElement~event:xb-update
	 * @type {CustomEvent}
	 */

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_122__;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.create = create;
	exports.register = register;
	exports.getFactory = getFactory;
	exports.getClass = getClass;

	var _react = __webpack_require__(114);

	var _react2 = _interopRequireDefault(_react);

	var _merge = __webpack_require__(8);

	var _merge2 = _interopRequireDefault(_merge);

	var _isArray = __webpack_require__(7);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _isFunction = __webpack_require__(27);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var VIEW_COMMON = {

	    /**
	     * Required attributes.
	     * @memberOf ReactElement.prototype
	     * @type {Object}
	     */
	    propTypes: {
	        _uid: _react.PropTypes.node,
	        _container: _react.PropTypes.any, // Bad way ;(
	        children: _react.PropTypes.node
	    },

	    /**
	     * Create node by template.
	     * @memberOf ReactElement.prototype
	     * @param {string} ref template name
	     * @param {Object} [props] the attributes of a node
	     * @returns {?ReactElement}
	     */
	    template: function template(ref, props) {
	        var xtmpl = this.props._container && this.props._container.xtmpl;

	        if ((typeof xtmpl === 'undefined' ? 'undefined' : _typeof(xtmpl)) === 'object' && xtmpl !== null && xtmpl.hasOwnProperty(ref)) {
	            return _react2.default.createElement('div', _extends({}, props, { dangerouslySetInnerHTML: { '__html': this.templatePrepare(xtmpl[ref]) } }));
	        }

	        return null;
	    },

	    /**
	     * Get the node associated with the view.
	     * @returns {HTMLElement}
	     */
	    container: function container() {
	        return this.props._container;
	    }
	};

	var VIEW_COMMON_USER = {
	    /**
	     * Custom conversion template.
	     * @param {string} tmplString
	     * @returns {string}
	     */
	    templatePrepare: function templatePrepare(tmplString) {
	        return tmplString;
	    }
	};

	var viewComponentsClass = {};

	/**
	 * Create class view node.
	 *
	 * @example
	 * var view = require('./view');
	 *
	 * var XBButtonContent = view.create({
	 *     'displayName': 'XBButtonContent',
	 *     'render': function () {
	 *         return (
	 *             &lt;span {...this.props}&gt;{this.props.children}&lt;/span&gt;
	 *         );
	 *     }
	 * });
	 *
	 * view.register('xb-button', {
	 *     'displayName': 'xb-button',
	 *     'render': function () {
	 *         return (
	 *             &lt;button&gt;
	 *                 &lt;XBButtonContent {...this.props} /&gt;
	 *             &lt;/button&gt;
	 *         );
	 *     }
	 * });
	 *
	 * @see http://facebook.github.io/react/docs/component-specs.html
	 * @param {Object|array} component settings view creation
	 * @returns {function}
	 */
	function create(component) {
	    component = (0, _isArray2.default)(component) ? component : [component];
	    component.unshift({}, VIEW_COMMON_USER);
	    component.push(VIEW_COMMON);

	    return _react2.default.createClass(_merge2.default.apply({}, component));
	}

	/**
	 * Registration of a new node.
	 *
	 * @example
	 * var view = require('./view');
	 * view.register('xb-button', {
	 *     'displayName': 'xb-button',
	 *     'render': function () {
	 *         return (
	 *             &lt;button {...this.props}&gt;{this.props.children}&lt;/button&gt;
	 *         );
	 *     }
	 * });
	 *
	 * @see http://facebook.github.io/react/docs/component-specs.html
	 * @param {string} blockName the name of the new node
	 * @param {Object|array|React.Component} component settings view creation
	 * @returns {function}
	 */
	function register(blockName, component) {
	    if (_react2.default.DOM.hasOwnProperty(blockName)) {
	        /* eslint no-throw-literal:0 */
	        throw 'Specified item "' + blockName + '" is already defined';
	    }

	    var componentClass = (0, _isFunction2.default)(component) ? component : create(component);

	    viewComponentsClass[blockName] = componentClass;

	    _react2.default.DOM[blockName] = _react2.default.createFactory(componentClass);

	    return componentClass;
	}

	/**
	 * Get factory view node.
	 * @param {string} blockName the name of the new node
	 * @returns {function}
	 */
	function getFactory(blockName) {
	    return _react2.default.DOM[blockName];
	}

	/**
	 * Get class view node.
	 * @param {string} blockName the name of the new node
	 * @returns {function}
	 */
	function getClass(blockName) {
	    return viewComponentsClass[blockName];
	}

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Custom = undefined;
	exports.dispatch = dispatch;

	var _isNative = __webpack_require__(26);

	var _isNative2 = _interopRequireDefault(_isNative);

	var _context = __webpack_require__(116);

	var _context2 = _interopRequireDefault(_context);

	var _CustomEventCommon = __webpack_require__(125);

	var _CustomEventCommon2 = _interopRequireDefault(_CustomEventCommon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Designer events.
	 *
	 * @example
	 * import { Custom } from './event';
	 * new Custom('custom-event', {
	 *     bubbles: true,
	 *     cancelable: true,
	 *     detail: { data: '123' }
	 * })
	 *
	 * @constructor
	 */
	var Custom = exports.Custom = function () {
	    if ((0, _isNative2.default)('CustomEvent')) {
	        return _context2.default.CustomEvent;
	    }

	    return _CustomEventCommon2.default;
	}();

	/**
	 * Dispatch event.
	 *
	 * @example
	 * mport { dispatch } from './event';
	 * dispatch(node, 'custom-event', {
	 *     bubbles: true,
	 *     cancelable: true,
	 *     detail: { data: '123' }
	 * })
	 *
	 * @param {HTMLElement} element node events
	 * @param {string} name event name
	 * @param {Object} params the event parameters
	 */
	function dispatch(element, name, params) {
	    element.dispatchEvent(new Custom(name, params || {}));
	}

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _context = __webpack_require__(116);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var issetCustomEvent = false;

	try {
	    issetCustomEvent = Boolean(_context2.default.document.createEvent('CustomEvent'));
	} catch (e) {
	    // do nothing
	}

	var CustomEventCommon = function () {
	    if (issetCustomEvent) {
	        return function (eventName, params) {
	            params = params || {};

	            var bubbles = Boolean(params.bubbles);
	            var cancelable = Boolean(params.cancelable);
	            var evt = _context2.default.document.createEvent('CustomEvent');

	            evt.initCustomEvent(eventName, bubbles, cancelable, params.detail);

	            return evt;
	        };
	    }

	    return function (eventName, params) {
	        params = params || {};

	        var bubbles = Boolean(params.bubbles);
	        var cancelable = Boolean(params.cancelable);
	        var evt = _context2.default.document.createEvent('Event');

	        evt.initEvent(eventName, bubbles, cancelable);
	        evt.detail = params.detail;

	        return evt;
	    };
	}();

	CustomEventCommon.prototype = _context2.default.Event.prototype;

	exports.default = CustomEventCommon;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (callback, args) {
	    if (!callback._args) {
	        callback._args = [];
	    }

	    callback._args.push(args);

	    if (!callback._timer) {
	        callback._timer = _src2.default.setImmediate(function () {
	            callback._timer = 0;

	            var saveArgs = callback._args;
	            callback._args = [];

	            callback(saveArgs);
	        });
	    }

	    return callback;
	};

	var _src = __webpack_require__(127);

	var _src2 = _interopRequireDefault(_src);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(128);
	var useNative = __webpack_require__(129);
	var Timer = __webpack_require__(130);
	var setTimeoutPolifill = __webpack_require__(131);
	var polifills = [
	    __webpack_require__(132),
	    __webpack_require__(133),
	    __webpack_require__(134),
	    __webpack_require__(135),
	    __webpack_require__(136)
	];
	var setImmediate;
	var clearImmediate;

	if (useNative()) {
	    setImmediate = context.setImmediate ||
	        context.msSetImmediate ||
	        usePolifill(polifills, setTimeoutPolifill);

	    clearImmediate = context.clearImmediate ||
	        context.msClearImmediate ||
	        Timer.clear;

	} else {
	    setImmediate = setTimeoutPolifill.init();
	    clearImmediate = Timer.clear;
	}

	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;

	exports.msSetImmediate = setImmediate;
	exports.msClearImmediate = clearImmediate;

	function usePolifill(polifills, def) {
	    for (var i = 0; i < polifills.length; i++) {
	        var polifill = polifills[ i ];
	        if (polifill.canUse()) {
	            return polifill.init();
	        }
	    }

	    return def.init();
	}


/***/ },
/* 128 */
/***/ function(module, exports) {

	/*jshint -W067*/
	'use strict';

	module.exports = (function() {
	    return this || (1, eval)('this');
	})();


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var context = __webpack_require__(128);

	// @see http://codeforhire.com/2013/09/21/setimmediate-and-messagechannel-broken-on-internet-explorer-10/
	module.exports = function() {
	    return !(context.navigator && /Trident|Edge/.test(context.navigator.userAgent));
	};


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(128);

	var nextId = 1;
	var tasks = {};
	var lock = false;

	function wrap(handler) {
	    var args = Array.prototype.slice.call(arguments, 1);

	    return function() {
	        handler.apply(undefined, args);
	    };
	}

	function create(args) {
	    tasks[ nextId ] = wrap.apply(undefined, args);
	    return nextId++;
	}

	function clear(handleId) {
	    delete tasks[ handleId ];
	}

	function run(handleId) {
	    if (lock) {
	        context.setTimeout( wrap( run, handleId ), 0 );

	    } else {
	        var task = tasks[ handleId ];

	        if (task) {
	            lock = true;

	            try {
	                task();

	            } finally {
	                clear( handleId );
	                lock = false;
	            }
	        }
	    }
	}

	exports.run = run;
	exports.wrap = wrap;
	exports.create = create;
	exports.clear = clear;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(128);
	var Timer = __webpack_require__(130);

	exports.init = function() {
	    var polifill = function() {
	        var handleId = Timer.create(arguments);
	        context.setTimeout( Timer.wrap( Timer.run, handleId ), 0 );
	        return handleId;
	    };
	    polifill.usePolifill = 'setTimeout';
	    return polifill;
	};

	exports.canUse = function() {
	    return true;
	};


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(128);
	var Timer = __webpack_require__(130);

	exports.init = function() {
	    var polifill = function() {
	        var handleId = Timer.create(arguments);
	        context.process.nextTick( Timer.wrap( Timer.run, handleId ) );
	        return handleId;
	    };
	    polifill.usePolifill = 'nextTick';
	    return polifill;
	};

	// Don't get fooled by e.g. browserify environments.
	// For Node.js before 0.9
	exports.canUse = function() {
	    return (Object.prototype.toString.call(context.process) === '[object process]');
	};


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(128);
	var Timer = __webpack_require__(130);

	exports.init = function() {
	    var messagePrefix = 'setImmediate$' + Math.random() + '$';

	    var onGlobalMessage = function(event) {
	        if (event.source === context &&
	            typeof(event.data) === 'string' &&
	            event.data.indexOf(messagePrefix) === 0) {

	            Timer.run(Number(event.data.slice(messagePrefix.length)));
	        }
	    };

	    if (context.addEventListener) {
	        context.addEventListener('message', onGlobalMessage, false);

	    } else {
	        context.attachEvent('onmessage', onGlobalMessage);
	    }

	    var polifill = function() {
	        var handleId = Timer.create(arguments);
	        context.postMessage(messagePrefix + handleId, '*');
	        return handleId;
	    };
	    polifill.usePolifill = 'postMessage';
	    return polifill;
	};

	// For non-IE10 modern browsers
	exports.canUse = function() {
	    if (context.importScripts || !context.postMessage) {
	        return false;
	    }

	    var asynch = true;
	    var oldOnMessage = context.onmessage;
	    context.onmessage = function() {
	        asynch = false;
	    };

	    context.postMessage('', '*');
	    context.onmessage = oldOnMessage;
	    return asynch;
	};


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(128);
	var Timer = __webpack_require__(130);

	exports.init = function() {
	    var channel = new context.MessageChannel();

	    channel.port1.onmessage = function(event) {
	        Timer.run(Number(event.data));
	    };

	    var polifill = function() {
	        var handleId = Timer.create(arguments);
	        channel.port2.postMessage(handleId);
	        return handleId;
	    };
	    polifill.usePolifill = 'messageChannel';
	    return polifill;
	};

	// For web workers, where supported
	exports.canUse = function() {
	    return Boolean(context.MessageChannel);
	};


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(128);
	var Timer = __webpack_require__(130);

	exports.init = function() {
	    var html = context.document.documentElement;
	    var polifill = function() {
	        var handleId = Timer.create(arguments);
	        var script = context.document.createElement('script');

	        script.onreadystatechange = function() {
	            Timer.run(handleId);
	            script.onreadystatechange = null;
	            html.removeChild(script);
	            script = null;
	        };

	        html.appendChild(script);
	        return handleId;
	    };

	    polifill.usePolifill = 'readyStateChange';
	    return polifill;
	};

	// For IE 6–8
	exports.canUse = function() {
	    return (context.document && ('onreadystatechange' in context.document.createElement('script')));
	};


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(128);
	var Timer = __webpack_require__(130);

	exports.init = function() {
	    var polifill = function() {
	        var handleId = Timer.create(arguments);
	        var img = new context.Image();
	        img.onload = img.onerror = Timer.wrap( Timer.run, handleId );
	        img.src = '';

	        return handleId;
	    };
	    polifill.usePolifill = 'image';
	    return polifill;
	};

	exports.canUse = function() {
	    return Boolean(context.window && context.Image);
	};


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.propTypes = exports.log = exports.lazy = undefined;

	var _lazy2 = __webpack_require__(126);

	var _lazy3 = _interopRequireDefault(_lazy2);

	var _log2 = __webpack_require__(138);

	var _log = _interopRequireWildcard(_log2);

	var _propTypes2 = __webpack_require__(139);

	var _propTypes3 = _interopRequireDefault(_propTypes2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.lazy = _lazy3.default;
	exports.log = _log;
	exports.propTypes = _propTypes3.default;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.time = time;
	exports.info = info;

	var _context2 = __webpack_require__(116);

	var _context3 = _interopRequireDefault(_context2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @param {HTMLElement} element
	 * @param {string} name
	 */
	function time(element, name) {
	    if (!element._xtimers) {
	        element._xtimers = {};
	    }

	    if (!Array.isArray(element._xtimers[name])) {
	        element._xtimers[name] = [];
	    }

	    element._xtimers[name].push(_context3.default.performance.now());
	}

	/**
	 * Console output info.
	 * @param {...*} args
	 */
	function info() {
	    var _context, _info;

	    (_info = (_context = _context3.default.console).info).call.apply(_info, [_context].concat(Array.prototype.slice.call(arguments)));
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (tagName) {
	    var viewClass = tagName && (0, _view.getClass)(tagName);

	    if (!viewClass) {
	        return {};
	    }

	    if (viewClass.propTypes) {
	        return viewClass.propTypes;
	    }

	    if (viewClass.originalSpec && viewClass.originalSpec.propTypes) {
	        return viewClass.originalSpec.propTypes;
	    }

	    return {};
	};

	var _view = __webpack_require__(123);

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.element = element;

	var _block = __webpack_require__(1);

	var _view = __webpack_require__(123);

	/**
	 * Decorating React.Component
	 *
	 * @example
	 * var xcore = require('xblocks-core');
	 *
	 * @xcore.element('x-element')
	 * class XElement extends React.Component {
	 *     render() {
	 *         return (
	 *             <div data-xb-content={this.props._uid} title={this.props.test1}>{this.props.children}</div>
	 *         );
	 *     }
	 * }
	 *
	 * XElement.propTypes = {
	 *     test1: React.PropTypes.string
	 * };
	 *
	 * @example
	 * var xcore = require('xblocks-core');
	 *
	 * @xcore.element('x-element', {
	 *     events: {
	 *         'xb-created': function() {}
	 *     }
	 * })
	 * class XElement extends React.Component {
	 *     // ...
	 * }
	 *
	 * @param {string} blockName the name of the new node
	 * @param {?Object|array} options settings tag creation
	 * @returns {function}
	 */
	function element(blockName, options) {
	    return function (component) {
	        (0, _block.create)(blockName, options);
	        (0, _view.register)(blockName, component);
	    };
	}

/***/ }
/******/ ])
});
;