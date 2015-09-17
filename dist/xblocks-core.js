(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"), require("xtag"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM", "xtag"], factory);
	else if(typeof exports === 'object')
		exports["xblocks"] = factory(require("React"), require("ReactDOM"), require("xtag"));
	else
		root["xblocks"] = factory(root["React"], root["ReactDOM"], root["xtag"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_38__, __WEBPACK_EXTERNAL_MODULE_39__) {
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

	exports.create = __webpack_require__(1).create;
	exports.dom = __webpack_require__(2);
	exports.event = __webpack_require__(36);
	exports.utils = __webpack_require__(11);
	exports.view = __webpack_require__(32);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dom = __webpack_require__(2);
	var utils = __webpack_require__(11);
	var Element = __webpack_require__(35);
	var xtag = __webpack_require__(39);
	var forEach = Array.prototype.forEach;

	var blockCommon = {
	    lifecycle: {
	        created: function() {
	            (false) && utils.log.time(this, 'xb_init');
	            (false) && utils.log.time(this, 'dom_inserted');

	            blockInit(this);
	        },

	        inserted: function() {
	            if (this.xinserted) {
	                return;
	            }

	            blockInit(this);

	            this.xinserted = true;

	            var isScriptContent = Boolean(this.querySelector('script'));

	            // asynchronous read content
	            // <xb-test><script>...</script><div>not found</div></xb-test>
	            if (isScriptContent) {
	                utils.lazy(blockCreateLazy, this);

	            } else {
	                blockCreate(this);
	            }

	            (false) && utils.log.time(this, 'dom_inserted');
	        },

	        removed: function() {
	            this.xinserted = false;

	            if (this.xblock) {
	                this.xblock.destroy();
	                this.xblock = undefined;
	            }
	        }
	    },

	    accessors: {
	        // check mounted react
	        mounted: {
	            get: function() {
	                return Boolean(this.xblock && this.xblock.isMounted());
	            }
	        },

	        content: {
	            get: function() {
	                if (this.mounted) {
	                    return this.xblock.getMountedContent();
	                }

	                return dom.contentNode(this).innerHTML;
	            },

	            set: function(content) {
	                if (this.mounted) {
	                    this.xblock.setMountedContent(content);

	                } else {
	                    dom.contentNode(this).innerHTML = content;
	                    this.upgrade();
	                }
	            }
	        },

	        // getting object attributes
	        attrs: {
	            get: function() {
	                return dom.attrs.toObject(this);
	            }
	        },

	        props: {
	            get: function() {
	                var prop;
	                var props = dom.attrs.toObject(this);
	                var xprops = this.xprops;
	                var eprops = xtag.tags[ this.xtagName ].accessors;
	                var common = blockCommon.accessors;

	                for (prop in eprops) {
	                    if (xprops.hasOwnProperty(prop) &&
	                        eprops.hasOwnProperty(prop) &&
	                        !common.hasOwnProperty(prop)) {

	                        props[ prop ] = this[ prop ];
	                    }
	                }

	                dom.attrs.typeConversion(props, xprops);
	                return props;
	            }
	        },

	        outerHTML: dom.outerHTML
	    },

	    methods: {
	        upgrade: function() {
	            dom.upgradeAll(this);
	        },

	        cloneNode: function(deep) {
	            // not to clone the contents
	            var node = dom.cloneNode(this, false);
	            dom.upgrade(node);

	            node.xtmpl = this.xtmpl;
	            node.xinserted = false;

	            if (deep) {
	                node.content = this.content;
	            }

	            //???
	            //if ('checked' in this) clone.checked = this.checked;

	            return node;
	        }
	    }
	};

	/**
	 * Creating a new tag
	 *
	 * @see http://x-tags.org/docs
	 * @param {string} blockName the name of the new node
	 * @param {?object|array} options settings tag creation
	 * @returns {HTMLElement}
	 */
	exports.create = function(blockName, options) {
	    options = Array.isArray(options) ? options : [ options ];
	    options.unshift(true, {});
	    options.push(blockCommon);

	    // error when merging prototype in FireFox <=19
	    var proto;
	    var o;
	    var i = 2;
	    var l = options.length;

	    for (; i < l; i++) {
	        o = options[ i ];

	        if (utils.isPlainObject(o)) {
	            if (!proto && o.prototype) {
	                proto = o.prototype;
	            }

	            delete o.prototype;
	        }
	    }

	    options = utils.merge.apply({}, options);

	    if (proto) {
	        options.prototype = proto;
	    }

	    return xtag.register(blockName, options);
	};

	function blockInit(node) {
	    if (!node.xtagName) {
	        node.xtagName = node.tagName.toLowerCase();
	        node.xtmpl = {};
	        node.xuid = utils.seq();
	        node.xprops = utils.propTypes(node.xtagName);
	        node.xinserted = false;
	        return true;
	    }

	    return false;
	}

	function blockCreate(node) {
	    if (node.hasChildNodes()) {
	        forEach.call(
	            node.querySelectorAll('script[type="text/x-template"][ref],template[ref]'),
	            tmplCompileIterator,
	            node
	        );
	    }

	    node.xblock = new Element(node);
	}

	function blockCreateLazy(nodes) {
	    nodes.forEach(blockCreate);
	}

	function tmplCompileIterator(tmplNode) {
	    this.xtmpl[ tmplNode.getAttribute('ref') ] = tmplNode.innerHTML;
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.attrs = __webpack_require__(3);
	exports.cloneNode = __webpack_require__(5);
	exports.contentNode = __webpack_require__(7);
	exports.outerHTML = __webpack_require__(8);
	exports.upgrade = __webpack_require__(9);
	exports.upgradeAll = __webpack_require__(10);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4);
	var forEach = Array.prototype.forEach;

	/**
	 * A set of boolean attributes
	 * @type {string[]}
	 */
	var attrsBoolean = [
	    'active',
	    'autofocus',
	    'checked',
	    'defer',
	    'disabled',
	    'ismap',
	    'multiple',
	    'readonly',
	    'required',
	    'selected'
	];

	/**
	 * To obtain the specified attributes
	 *
	 * @example
	 * node = document.createElement('div');
	 * node.setAttribute('attr1', '');
	 * node.setAttribute('attr2', 'test1');
	 * node.setAttribute('attr3', 'test2');
	 * xblocks.dom.attrs.get(node, {
	 *     'attr1': false,
	 *     'attr2': undefined
	 * });
	 * // { 'attr1': true, 'attr2': 'test1' }
	 *
	 * @function xblocks.dom.attrs.get
	 * @param {HTMLElement} element
	 * @param {object} attrs the set of derived attributes (+default values)
	 * @return {object}
	 */
	exports.get = function(element, attrs) {
	    if (element.nodeType !== 1 || !element.hasAttributes()) {
	        return attrs;
	    }

	    var attrName;
	    for (attrName in attrs) {
	        if (attrs.hasOwnProperty(attrName) && element.hasAttribute(attrName)) {
	            if (typeof(attrs[ attrName ]) === 'boolean') {
	                attrs[ attrName ] = valueConversion(
	                    attrName,
	                    element.getAttribute(attrName),
	                    React.PropTypes.bool
	                );

	            } else {
	                attrs[ attrName ] = element.getAttribute(attrName);
	            }
	        }
	    }

	    return attrs;
	};

	/**
	 * Retrieve object attributes
	 *
	 * @example
	 * node = document.createElement('div');
	 * node.setAttribute('attr1', '');
	 * node.setAttribute('attr2', 'test');
	 * xblocks.dom.attrs.toObject(node);
	 * // { 'attr1': '', 'attr2': 'test' }
	 *
	 * @function xblocks.dom.attrs.toObject
	 * @param {HTMLElement} element
	 * @return {object}
	 */
	exports.toObject = function(element) {
	    var attrs = {};

	    if (element.nodeType === 1 && element.hasAttributes()) {
	        forEach.call(element.attributes, toObjectIterator, attrs);
	    }

	    return attrs;
	};

	/**
	 * Convert the attribute value to the specified type
	 *
	 * @example
	 * xblocks.dom.attrs.valueConversion('attr1', 'true');
	 * // true
	 * xblocks.dom.attrs.valueConversion('attr1', 'true', React.PropTypes.string);
	 * // 'true'
	 * xblocks.dom.attrs.valueConversion('attr1', '123', React.PropTypes.number);
	 * // 123
	 *
	 * @function xblocks.dom.attrs.valueConversion
	 * @param {string} prop attribute name
	 * @param {*} value attribute value
	 * @param {function} [type] attribute type
	 * @returns {*}
	 */
	exports.valueConversion = valueConversion;

	/**
	 * Collective conversion of attribute types
	 *
	 * @example
	 * xblocks.dom.attrs.typeConversion({
	 *     'attr1': '123',
	 *     'attr2': ''
	 * }, {
	 *     'attr1': React.PropTypes.number,
	 *     'attr2': React.PropTypes.bool
	 * });
	 * // { 'attr1': 123, 'attr2': true }
	 *
	 * @function xblocks.dom.attrs.typeConversion
	 * @param {object} props the set of attributes
	 * @param {object} [propTypes] the set of attribute types
	 * @returns {object}
	 */
	exports.typeConversion = function(props, propTypes) {
	    propTypes = propTypes || {};

	    var prop;
	    for (prop in props) {
	        if (props.hasOwnProperty(prop)) {
	            props[ prop ] = valueConversion(
	                prop,
	                props[ prop ],
	                propTypes[ prop ]
	            );
	        }
	    }

	    return props;
	};

	/**
	 * @param {Attr} attr
	 * @private
	 */
	function toObjectIterator(attr) {
	    this[ attr.nodeName ] = attr.value;
	}

	function valueConversion(prop, value, type) {
	    if (!type) {
	        if (value === 'true' || value === 'false' || attrsBoolean.indexOf(prop) !== -1) {
	            type = React.PropTypes.bool;
	        }
	    }

	    switch (type) {
	        case React.PropTypes.bool:
	            return Boolean(value === true || value === '' || prop === value || value === 'true');

	        case React.PropTypes.string:
	            return String(value);

	        case React.PropTypes.number:
	            return Number(value);

	        default:
	            return value;
	    }
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(6);
	var elementProto = (context.HTMLElement || context.Element).prototype;

	/**
	 * Cloning node
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node.cloneNode
	 * @function xblocks.dom.cloneNode
	 * @param {HTMLElement} node the node to be cloned
	 * @param {boolean} deep true if the children of the node should also be cloned, or false to clone only the specified node.
	 * @returns {HTMLElement} The new node that will be a clone of node
	 */
	module.exports = function(node, deep) {
	    // FireFox19 cannot use native cloneNode the Node object
	    return elementProto.cloneNode.call(node, deep);

	    /*
	    try {
	        // FireFox19 cannot use native cloneNode the Node object
	        return elementProto.cloneNode.call(node, deep);
	    } catch(e) {
	        // FireFox <=13
	        // uncaught exception: [Exception... "Could not convert JavaScript argument"  nsresult: "0x80570009 (NS_ERROR_XPC_BAD_CONVERT_JS)"
	        return node.ownerDocument.importNode(node, deep);
	    }
	    */
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*jshint -W067*/
	'use strict';

	module.exports = (function() {
	    return this || (1, eval)('this');
	})();


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @function xblocks.dom.contentNode
	 * @param {HTMLElement} node
	 * @returns {HTMLElement}
	 */
	module.exports = function(node) {
	    var element;

	    if (node.xuid && node.nodeType === 1 && node.hasChildNodes()) {
	        element = node.querySelector('[data-xb-content="' + node.xuid + '"]');

	        if (!element) {
	            element = node.querySelector('script[type="text/x-template"]:not([ref]),template:not([ref])');
	        }
	    }

	    return element || node;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(6);

	/**
	 * @function xblocks.dom.outerHTML
	 * @prop {object} xblocks.dom.outerHTML
	 * @prop {function} xblocks.dom.outerHTML.get
	 * @prop {function} xblocks.dom.outerHTML.set
	 */
	module.exports = (function() {

	    var container = context.document.createElementNS('http://www.w3.org/1999/xhtml', '_');
	    var getter;
	    var setter;

	    if (container.hasOwnProperty('outerHTML')) {
	        getter = function() {
	            return this.outerHTML;
	        };

	        setter = function(html) {
	            this.outerHTML = html;
	        };

	    } else {
	        var serializer = context.XMLSerializer && (new context.XMLSerializer());
	        var xmlns = /\sxmlns=\"[^\"]+\"/;

	        if (serializer) {
	            getter = function() {
	                return serializer.serializeToString(this).replace(xmlns, '');
	            };

	        } else {
	            getter = function() {
	                container.appendChild(this.cloneNode(false));
	                var html = container.innerHTML.replace('><', '>' + this.innerHTML + '<');
	                container.innerHTML = '';
	                return html;
	            };
	        }

	        setter = function(html) {
	            var node = this;
	            var parent = node.parentNode;
	            var child;

	            if (!parent) {
	                context.DOMException.code = context.DOMException.NOT_FOUND_ERR;
	                throw context.DOMException;
	            }

	            container.innerHTML = html;

	            while ((child = container.firstChild)) {
	                parent.insertBefore(child, node);
	            }

	            parent.removeChild(node);
	        };
	    }

	    return {
	        'get': getter,
	        'set': setter
	    };

	}());


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(6);

	/**
	 * @function xblocks.dom.upgrade
	 */
	module.exports = (function() {
	    if (context.CustomElements && typeof(context.CustomElements.upgrade) === 'function') {
	        return context.CustomElements.upgrade;

	    } else {
	        return function() {};
	    }
	}());


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(6);

	/**
	 * @function xblocks.dom.upgradeAll
	 */
	module.exports = (function() {
	    if (context.CustomElements && typeof(context.CustomElements.upgradeAll) === 'function') {
	        return context.CustomElements.upgradeAll;

	    } else {
	        return function() {};
	    }
	}());


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.assign = __webpack_require__(12);
	exports.equals = __webpack_require__(16);
	exports.isPlainObject = __webpack_require__(14);
	exports.lazy = __webpack_require__(17);
	exports.log = __webpack_require__(28);
	exports.merge = __webpack_require__(29);
	exports.pristine = __webpack_require__(30);
	exports.propTypes = __webpack_require__(31);
	exports.seq = __webpack_require__(33);
	exports.tmpl = __webpack_require__(34);
	exports.type = __webpack_require__(15);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mergeBase = __webpack_require__(13);

	/**
	 * Combining objects with undefined params
	 *
	 * @example
	 * xblocks.utils.assign({}, { a: 1, b: undefined }, { a: undefined, c: undefined })
	 * // { a: undefined, b: undefined, c: undefined }
	 *
	 * @function xblocks.utils.assign
	 * @returns {object}
	 */
	module.exports = function() {
	    return mergeBase.call(this, utilsAssignCheckCopy, arguments);
	};

	function utilsAssignCheckCopy() {
	    return true;
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isPlainObject = __webpack_require__(14);

	module.exports = mergeBase;

	function mergeBase(checkСopy, args) {
	    var options;
	    var name;
	    var src;
	    var copy;
	    var copyIsArray;
	    var clone;
	    var target = args[0] || {};
	    var i = 1;
	    var length = args.length;
	    var deep = false;

	    // Handle a deep copy situation
	    if (typeof(target) === 'boolean') {
	        deep = target;

	        // Skip the boolean and the target
	        target = args[ i ] || {};
	        i++;
	    }

	    // Handle case when target is a string or something (possible in deep copy)
	    if (typeof(target) !== 'object' && typeof(target) !== 'function') {
	        target = {};
	    }

	    // Extend jQuery itself if only one argument is passed
	    if (i === length) {
	        target = this;
	        i--;
	    }

	    for (; i < length; i++) {
	        // Only deal with non-null/undefined values
	        if ((options = args[ i ]) != null) {
	            // Extend the base object
	            for (name in options) {
	                src = target[ name ];
	                copy = options[ name ];

	                // Prevent never-ending loop
	                if (target === copy) {
	                    continue;
	                }

	                // Recurse if we're merging plain objects or arrays
	                if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

	                    if (copyIsArray) {
	                        copyIsArray = false;
	                        clone = src && Array.isArray(src) ? src : [];

	                    } else {
	                        clone = src && isPlainObject(src) ? src : {};
	                    }

	                    // Never move original objects, clone them
	                    target[ name ] = mergeBase(checkСopy, [ deep, clone, copy ]);

	                } else if (checkСopy(copy)) {
	                    target[ name ] = copy;
	                }
	            }
	        }
	    }

	    // Return the modified object
	    return target;
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var type = __webpack_require__(15);

	/**
	 * Check to see if an object is a plain object (created using "{}" or "new Object")
	 *
	 * @example
	 * xblocks.utils.isPlainObject({})
	 * // true
	 * xblocks.utils.isPlainObject(test)
	 * // false
	 *
	 * @function xblocks.utils.isPlainObject
	 * @param {*} value the value to test
	 * @returns {boolean}
	 */
	module.exports = function(value) {
	    if (type(value) !== 'object') {
	        return false;
	    }

	    if (value.constructor && !value.constructor.prototype.hasOwnProperty('isPrototypeOf')) {
	        return false;
	    }

	    return true;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString;
	var regType = /\s([a-zA-Z]+)/;

	/**
	 * The definition of the data type
	 * @function xblocks.utils.type
	 * @param {*} param
	 * @returns {string}
	 */
	module.exports = function(param) {
	    if (param === undefined) {
	        return 'undefined';
	    }

	    if (param === null) {
	        return 'null';
	    }

	    var type = typeof(param);

	    if (type === 'object') {
	        type = toString.call(param)
	            .match(regType)[1]
	            .toLowerCase();
	    }

	    if (type === 'number') {
	        var paramStr = param.toString();
	        if (paramStr === 'NaN') {
	            type = 'NaN';

	        } else {
	            type = paramStr.indexOf('.') === -1 ? 'integer' : 'float';
	        }
	    }

	    return type;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var type = __webpack_require__(15);

	/**
	 * @param {*} x
	 * @param {*} y
	 * @returns {boolean}
	 * @private
	 */
	var equal = {
	    'array': function(x, y) {
	        var i = 0;
	        var l = x.length;

	        if (l !== y.length) {
	            return false;
	        }

	        for (; i < l; i++) {
	            if (!equals(x[i], y[i])) {
	                return false;
	            }
	        }

	        return true;
	    },

	    'object': function(x, y) {
	        var i;

	        for (i in x) {
	            if (y.hasOwnProperty(i)) {
	                if (!equals(x[i], y[i])) {
	                    return false;
	                }

	            } else {
	                return false;
	            }
	    	}

	        for (i in y) {
	            if (!x.hasOwnProperty(i)) {
	                return false;
	            }
	        }

	    	return true;
	    },

	    'date': function(x, y) {
	        return x.getTime() === y.getTime();
	    },

	    'regexp': function(x, y) {
	        return x.toString() === y.toString();
	    },

	    'function': function(x, y) {
	        return x.toString() === y.toString();
	    }
	};

	function equals(x, y) {
	    if (x === y) {
	        return true;
	    }

	    var xType = type(x);
	    var yType = type(y);

	    if (xType !== yType) {
	        return false;
	    }

	    if (equal.hasOwnProperty(xType)) {
	        return equal[ xType ](x, y);
	    }

	    return x == y;
	}

	/**
	 * Comparison
	 *
	 * @example
	 * xblocks.utils.equals(1, 1)
	 * // true
	 * xblocks.utils.equals({ a: 1 }, { a: 1 })
	 * // true
	 * xblocks.utils.equals({ a: 1 }, { a: 2 })
	 * // false
	 *
	 * @function xblocks.utils.equals
	 * @param {*} x that compared
	 * @param {*} y compared to
	 * @returns {boolean}
	 */
	module.exports = equals;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var immediate = __webpack_require__(18);

	/**
	 * Deferred execution
	 *
	 * @example
	 * var lazyCallback = function() {
	 *     console.log(arguments);
	 * };
	 * xblocks.utils.lazy(lazyCallback, 'a');
	 * xblocks.utils.lazy(lazyCallback, 'b');
	 * xblocks.utils.lazy(lazyCallback, 'c');
	 * // ....
	 * [ Array[ 'a', 'b', 'c' ] ]
	 *
	 * @function xblocks.utils.lazy
	 * @param {function} callback
	 * @param {*} args
	 * @returns {function}
	 */
	module.exports = function(callback, args) {
	    if (!callback._args) {
	        callback._args = [];
	    }

	    callback._args.push(args);

	    if (!callback._timer) {
	        callback._timer = immediate.setImmediate(function() {
	            callback._timer = 0;

	            var args = callback._args;
	            callback._args = [];

	            callback(args);
	        });
	    }

	    return callback;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(19);
	var useNative = __webpack_require__(20);
	var Timer = __webpack_require__(21);
	var setTimeoutPolifill = __webpack_require__(22);
	var polifills = [
	    __webpack_require__(23),
	    __webpack_require__(24),
	    __webpack_require__(25),
	    __webpack_require__(26),
	    __webpack_require__(27)
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
/* 19 */
/***/ function(module, exports) {

	/*jshint -W067*/
	'use strict';

	module.exports = (function() {
	    return this || (1, eval)('this');
	})();


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var context = __webpack_require__(19);

	// @see http://codeforhire.com/2013/09/21/setimmediate-and-messagechannel-broken-on-internet-explorer-10/
	module.exports = function() {
	    return !(context.navigator && /Trident|Edge/.test(context.navigator.userAgent));
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(19);

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(19);
	var Timer = __webpack_require__(21);

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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(19);
	var Timer = __webpack_require__(21);

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(19);
	var Timer = __webpack_require__(21);

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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(19);
	var Timer = __webpack_require__(21);

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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(19);
	var Timer = __webpack_require__(21);

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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(19);
	var Timer = __webpack_require__(21);

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
/* 28 */
/***/ function(module, exports) {

	'use strict';

	exports.time = function(element, name) {
	    if (!element._xtimers) {
	        element._xtimers = {};
	    }

	    if (!Array.isArray(element._xtimers[ name ])) {
	        element._xtimers[ name ] = [];
	    }

	    element._xtimers[ name ].push(performance.now());
	};

	exports.info = function() {
	    console.info.apply(console, arguments);
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mergeBase = __webpack_require__(13);

	/**
	 * Combining objects
	 *
	 * @example
	 * var target = { a: 1 };
	 * xblocks.utils.merge(target, { b: 2 })
	 * // { a: 1, b: 2 }
	 *
	 * xblocks.utils.merge({ a: 1 }, { b: 2 }, { c: 3 })
	 * // { a: 1, b: 2, c: 3 }
	 *
	 * xblocks.utils.merge(true, { a: 1 }, { b: { c: 2 } }, { b: { d: 3 } })
	 * // { a: 1, b: { c: 2, d: 3 } }
	 *
	 * xblocks.utils.merge({}, { a: 1, b: undefined }, { a: undefined, c: undefined })
	 * // { a: 1 }
	 *
	 * @function xblocks.utils.merge
	 * @returns {object}
	 */
	module.exports = function() {
	    return mergeBase.call(this, utilsMergeCheckCopy, arguments);
	};

	function utilsMergeCheckCopy(value) {
	    return (value !== undefined);
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(6);
	var regPristine = /^[\$_a-z][\$\w]*$/i;

	/**
	 * Check the override method
	 * @function xblocks.utils.pristine
	 * @param {string} methodName method name
	 * @returns {boolean} true if the method is not overridden
	 */
	module.exports = function(methodName) {
	    if (!methodName) {
	        return false;
	    }

	    var method = context[ methodName ];

	    if (!method) {
	        return false;
	    }

	    if (!regPristine.test(methodName)) {
	        return false;
	    }

	    var type = typeof(method);

	    if (type !== 'function' && type !== 'object') {
	        return false;
	    }

	    var re = new RegExp("function\\s+" + methodName + "\\(\\s*\\)\\s*{\\s*\\[native code\\]\\s*}");

	    if (!re.test(method)) {
	        return false;
	    }

	    if (type === 'function') {
	        if (!method.valueOf || method.valueOf() !== method) {
	            return false;
	        }
	    }

	    return true;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var view = __webpack_require__(32);

	/**
	 * @function xblocks.utils.propTypes
	 * @param {string} tagName
	 * @returns {object}
	 */
	module.exports = function(tagName) {
	    var viewClass = view.getClass(tagName);

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


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4);
	var merge = __webpack_require__(29);
	var viewComponentsClass = {};
	var viewCommon = {

	    /**
	     * Required attributes
	     * @memberOf ReactElement.prototype
	     * @type {object}
	     */
	    propTypes: {
	        '_uid':         React.PropTypes.node,
	        '_container':   React.PropTypes.any,  // Bad way ;(
	        'children':     React.PropTypes.node
	    },

	    /**
	     * Create node by template
	     * @memberOf ReactElement.prototype
	     * @param {string} ref template name
	     * @param {object} [props] the attributes of a node
	     * @returns {?ReactElement}
	     */
	    template: function(ref, props) {
	        var xtmpl = this.props._container && this.props._container.xtmpl;

	        if (typeof(xtmpl) === 'object' && xtmpl !== null && xtmpl.hasOwnProperty(ref)) {
	            props = merge.apply({}, props, {
	                'dangerouslySetInnerHTML': {
	                    '__html': this.templatePrepare(xtmpl[ ref ])
	                }
	            });

	            return React.createElement('div', props);
	        }

	        return null;
	    },

	    /**
	     * Get the node associated with the view
	     * @returns {HTMLElement}
	     */
	    container: function() {
	        return this.props._container;
	    }
	};

	var viewCommonUser = {
	    templatePrepare: function(tmplString) {
	        return tmplString;
	    }
	};

	/**
	 * Create class view node
	 *
	 * @example
	 * var view = require('./view');
	 *
	 * var XBButtonContent = view.create({
	 *     'displayName': 'XBButtonContent',
	 *     'render': function() {
	 *         return (
	 *             &lt;span {...this.props}&gt;{this.props.children}&lt;/span&gt;
	 *         );
	 *     }
	 * });
	 *
	 * view.register('xb-button', {
	 *     'displayName': 'xb-button',
	 *     'render': function() {
	 *         return (
	 *             &lt;button&gt;
	 *                 &lt;XBButtonContent {...this.props} /&gt;
	 *             &lt;/button&gt;
	 *         );
	 *     }
	 * });
	 *
	 * @see http://facebook.github.io/react/docs/component-specs.html
	 * @param {object|array} component settings view creation
	 * @returns {function}
	 */
	exports.create = createClass;

	/**
	 * Registration of a new node
	 *
	 * @example
	 * var view = require('./view');
	 * view.register('xb-button', {
	 *     'displayName': 'xb-button',
	 *     'render': function() {
	 *         return (
	 *             &lt;button {...this.props}&gt;{this.props.children}&lt;/button&gt;
	 *         );
	 *     }
	 * });
	 *
	 * @see http://facebook.github.io/react/docs/component-specs.html
	 * @param {string} blockName the name of the new node
	 * @param {object|array} component settings view creation
	 * @returns {function}
	 */
	exports.register = function(blockName, component) {
	    if (React.DOM.hasOwnProperty(blockName)) {
	        throw 'Specified item "' + blockName + '" is already defined';
	    }

	    var componentClass = createClass(component);
	    viewComponentsClass[ blockName ] = componentClass;

	    React.DOM[ blockName ] = React.createFactory(componentClass);

	    return componentClass;
	};

	/**
	 * Get factory view node
	 * @param {string} blockName the name of the new node
	 * @returns {function}
	 */
	exports.getFactory = function(blockName) {
	    return React.DOM[ blockName ];
	};

	/**
	 * Get class view node
	 * @param {string} blockName the name of the new node
	 * @returns {function}
	 */
	exports.getClass = function(blockName) {
	    return viewComponentsClass[ blockName ];
	};

	function createClass(component) {
	    component = Array.isArray(component) ? component : [ component ];
	    component.unshift(true, {}, viewCommonUser);
	    component.push(viewCommon);

	    return React.createClass(merge.apply({}, component));
	}


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	var i = 0;

	/**
	 * The generator is a unique sequence of positive numbers
	 *
	 * @example
	 * xblocks.utils.seq()
	 * // 1
	 * xblocks.utils.seq()
	 * // 2
	 *
	 * @function xblocks.utils.seq
	 * @returns {number} a unique, incremental positive number
	 */
	module.exports = function() {
	    return ++i;
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	var cache = {};

	/**
	 * Template engine
	 * @function xblocks.utils.tmpl
	 * @param {string} str template
	 * @param {object} data the template data
	 * @returns {string}
	 * @see http://ejohn.org/blog/javascript-micro-templating/
	 */
	module.exports = function(str, data) {
	    if (!cache.hasOwnProperty(str)) {
	        /* jshint -W054 */
	        cache[ str ] = new Function('obj',
	           "var p=[],print=function(){p.push.apply(p,arguments);};" +
	           "with(obj){p.push('" +
	           str.replace(/[\r\t\n]/g, " ")
	               .split("<%").join("\t")
	               .replace(/((^|%>)[^\t]*)'/g, "$1\r")
	               .replace(/\t=(.*?)%>/g, "',$1,'")
	               .split("\t").join("');")
	               .split("%>").join("p.push('")
	               .split("\r").join("\\'") +
	               "');}return p.join('');");
	    }

	    return data ? cache[ str ](data) : cache[ str ];
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(6);
	var dom = __webpack_require__(2);
	var event = __webpack_require__(36);
	var ReactDOM = __webpack_require__(38);
	var utils = __webpack_require__(11);
	var view = __webpack_require__(32);

	module.exports = Element;

	/**
	 * Xblock element constructor
	 * @param {HTMLElement} node the node of a custom element
	 * @constructor
	 */
	function Element(node) {
	    node.xblock = this;

	    this._callbackMutation = this._callbackMutation.bind(this);

	    this._observerOptions = {
	        'attributeFilter': Object.keys(node.xprops),
	        'attributeOldValue': false,
	        'attributes': true,
	        'characterData': true,
	        'characterDataOldValue': false,
	        'childList': true,
	        'subtree': false
	    };

	    this._node = node;
	    this._init();
	}

	/**
	 * The node of a custom element
	 * @type {HTMLElement}
	 * @protected
	 */
	Element.prototype._node = null;

	/**
	 * React component
	 * @type {Constructor}
	 * @protected
	 */
	Element.prototype._component = null;

	/**
	 * Instance MutationObserver
	 * @type {MutationObserver}
	 * @protected
	 */
	Element.prototype._observer = null;

	/**
	 * Unmounts a component and removes it from the DOM
	 * @fires xblocks.Element~event:xb-destroy
	 */
	Element.prototype.destroy = function() {
	    var node = this._node;
	    var content = node.content;

	    this._observer.disconnect();
	    this._observer = null;
	    this._component = null;
	    this._node = null;

	    ReactDOM.unmountComponentAtNode(node);

	    // replace initial content after destroy react component
	    // fix:
	    // element.parentNode.removeChild(element);
	    // document.body.appendChild(element);
	    node.content = content;
	    node.xblock = undefined;

	    event.dispatch(node, 'xb-destroy', { 'bubbles': false, 'cancelable': false });

	    (true) && utils.log.info('element destroy: %O', this);
	};

	/**
	 * Update react view
	 * @param {object} [props] added attributes
	 * @param {array} [removeProps] remote attributes
	 * @param {function} [callback] the callback function
	 */
	Element.prototype.update = function(props, removeProps, callback) {
	    var nextProps = utils.merge(true, {}, this.getMountedProps(), this._node.props, props);

	    // merge of new and current properties
	    // and the exclusion of remote properties
	    if (Array.isArray(removeProps) && removeProps.length) {
	        var l = removeProps.length;
	        while (l--) {
	            if (nextProps.hasOwnProperty(removeProps[ l ])) {
	                delete nextProps[ removeProps[ l ] ];
	            }
	        }
	    }

	    dom.attrs.typeConversion(nextProps, this._node.xprops);

	    var proxyConstructor = view.getFactory(this._node.xtagName)(nextProps);
	    var that = this;
	    var renderCallback = function() {
	        that._component = this;
	        that._callbackUpdate(callback);
	    };

	    this._observer.disconnect();
	    this._component = ReactDOM.render(proxyConstructor, this._node, renderCallback);

	    (true) && utils.log.info('element update: %O, props: %O', this, nextProps);
	};

	/**
	 * Returns true if the component is rendered into the DOM, false otherwise
	 * @see http://facebook.github.io/react/docs/component-api.html#ismounted
	 * @returns {boolean}
	 */
	Element.prototype.isMounted = function() {
	    return Boolean(this._component && this._component.isMounted());
	};

	/**
	 * Installing a new content react component
	 * @param {string} content
	 */
	Element.prototype.setMountedContent = function(content) {
	    if (this.isMounted()) {
	        this.update({ 'children': content });
	    }
	};

	/**
	 * Receiving the content components react
	 * @returns {?string}
	 */
	Element.prototype.getMountedContent = function() {
	    if (this.isMounted()) {
	        return this._component.props.children;
	    }
	};

	/**
	 * Get components react
	 * @returns {?ReactCompositeComponent.createClass.Constructor}
	 */
	Element.prototype.getMountedComponent = function() {
	    if (this.isMounted()) {
	        return this._component;
	    }
	};

	/**
	 * Gets the attributes of the components
	 * @returns {?object}
	 */
	Element.prototype.getMountedProps = function() {
	    return this.isMounted() ? this._component.props : null;
	};

	/**
	 * @protected
	 */
	Element.prototype._init = function() {
	    var children = this._node.content;
	    var props = utils.merge(true, {}, this._node.props, {
	        '_uid': this._node.xuid,
	        '_container': this._node
	    });

	    dom.attrs.typeConversion(props, this._node.xprops);

	    var proxyConstructor = view.getFactory(this._node.xtagName)(props, children);
	    var that = this;
	    var renderCallback = function() {
	        that._component = this;
	        that._callbackInit();
	    };

	    this._component = ReactDOM.render(proxyConstructor, this._node, renderCallback);

	    (true) && utils.log.info('element init: %O', this);
	};

	/**
	 * @protected
	 * @fires xblocks.Element~event:xb-created
	 */
	Element.prototype._callbackInit = function() {
	    this._node.upgrade();
	    this._observer = new context.MutationObserver(this._callbackMutation);
	    this._observer.observe(this._node, this._observerOptions);

	    event.dispatch(this._node, 'xb-created');
	    utils.lazy(globalInitEvent, this._node);

	    (false) && utils.log.time(this._node, 'xb_init');
	};

	/**
	 * @param {function} [callback] the callback function
	 * @protected
	 * @fires xblocks.Element~event:xb-update
	 */
	Element.prototype._callbackUpdate = function(callback) {
	    this._node.upgrade();
	    this._observer.observe(this._node, this._observerOptions);

	    event.dispatch(this._node, 'xb-update');
	    utils.lazy(globalUpdateEvent, this._node);

	    if (callback) {
	        callback.call(this);
	    }
	};

	/**
	 * @param {MutationRecord[]} records
	 * @protected
	 */
	Element.prototype._callbackMutation = function(records) {
	    var removeAttrs = records
	        .filter(filterAttributesRemove, this)
	        .map(mapAttributesName);

	    this.update(null, removeAttrs);
	};

	/**
	 * @param {MutationRecord} record
	 * @returns {boolean}
	 * @protected
	 */
	function filterAttributesRemove(record) {
	    return (record.type === 'attributes' && !this._node.hasAttribute(record.attributeName));
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
	    event.dispatch(context, 'xb-created', { 'detail': { 'records': records } });
	}

	/**
	 * @param {array} records
	 * @protected
	 */
	function globalUpdateEvent(records) {
	    event.dispatch(context, 'xb-update', { 'detail': { 'records': records } });
	}

	/**
	 * Created event
	 * @event xblocks.Element~event:xb-created
	 * @type {xblocks.event.Custom}
	 */

	/**
	 * Destroy event
	 * @event xblocks.Element~event:xb-destroy
	 * @type {xblocks.event.Custom}
	 */

	/**
	 * Updated event
	 * @event xblocks.Element~event:xb-update
	 * @type {xblocks.event.Custom}
	 */


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(6);
	var pristine = __webpack_require__(30);
	var CustomEventCommon = __webpack_require__(37);
	var Custom = (function() {
	    if (pristine('CustomEvent')) {
	        return context.CustomEvent;
	    }

	    return CustomEventCommon;
	}());

	/**
	 * Designer events
	 *
	 * @example
	 * new xblocks.event.Custom('custom-event', {
	 *     bubbles: true,
	 *     cancelable: true,
	 *     detail: { data: '123' }
	 * })
	 *
	 * @constructor
	 * @memberOf xblocks.event
	 */
	exports.Custom = Custom;

	/**
	 * Dispatch event
	 *
	 * @example
	 * xblocks.event.dispatch(node, 'custom-event', {
	 *     bubbles: true,
	 *     cancelable: true,
	 *     detail: { data: '123' }
	 * })
	 *
	 * @param {HTMLElement} element node events
	 * @param {string} name event name
	 * @param {object} params the event parameters
	 */
	exports.dispatch = function(element, name, params) {
	    element.dispatchEvent(new Custom(name, params || {}));
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(6);
	var CustomEventCommon;
	var issetCustomEvent = false;

	try {
	    issetCustomEvent = Boolean(context.document.createEvent('CustomEvent'));
	} catch(e) {
	    // do nothing
	}

	if (issetCustomEvent) {
	    CustomEventCommon = function(eventName, params) {
	        params = params || {};

	        var bubbles = Boolean(params.bubbles);
	        var cancelable = Boolean(params.cancelable);
	        var evt = context.document.createEvent('CustomEvent');

	        evt.initCustomEvent(eventName, bubbles, cancelable, params.detail);

	        return evt;
	    };

	} else {
	    CustomEventCommon = function(eventName, params) {
	        params = params || {};

	        var bubbles = Boolean(params.bubbles);
	        var cancelable = Boolean(params.cancelable);
	        var evt = context.document.createEvent('Event');

	        evt.initEvent(eventName, bubbles, cancelable);
	        evt.detail = params.detail;

	        return evt;
	    };
	}

	CustomEventCommon.prototype = context.Event.prototype;

	module.exports = CustomEventCommon;


/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_38__;

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_39__;

/***/ }
/******/ ])
});
;