(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("xtag"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "xtag"], factory);
	else if(typeof exports === 'object')
		exports["xblocks-core"] = factory(require("react"), require("react-dom"), require("xtag"));
	else
		root["xblocks-core"] = factory(root["React"], root["ReactDOM"], root["xtag"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_66__) {
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

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _xblocksBlock = __webpack_require__(1);

	var _xblocksDom = __webpack_require__(2);

	var _xblocksDom2 = _interopRequireDefault(_xblocksDom);

	var _xblocksEvent = __webpack_require__(13);

	var _xblocksEvent2 = _interopRequireDefault(_xblocksEvent);

	var _xblocksUtils = __webpack_require__(70);

	var _xblocksUtils2 = _interopRequireDefault(_xblocksUtils);

	var _xblocksView = __webpack_require__(20);

	var _xblocksView2 = _interopRequireDefault(_xblocksView);

	exports['default'] = {
	    create: _xblocksBlock.create,
	    dom: _xblocksDom2['default'],
	    event: _xblocksEvent2['default'],
	    utils: _xblocksUtils2['default'],
	    view: _xblocksView2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _element = __webpack_require__(11);

	var _element2 = _interopRequireDefault(_element);

	var _xtag = __webpack_require__(66);

	var _xtag2 = _interopRequireDefault(_xtag);

	var _utilsLazy = __webpack_require__(52);

	var _utilsLazy2 = _interopRequireDefault(_utilsLazy);

	var _utilsPropTypes = __webpack_require__(67);

	var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

	var _langIsPlainObject = __webpack_require__(36);

	var _langIsPlainObject2 = _interopRequireDefault(_langIsPlainObject);

	var _objectMerge = __webpack_require__(21);

	var _objectMerge2 = _interopRequireDefault(_objectMerge);

	var _utilityUniqueId = __webpack_require__(68);

	var _utilityUniqueId2 = _interopRequireDefault(_utilityUniqueId);

	var _langIsArray = __webpack_require__(34);

	var _langIsArray2 = _interopRequireDefault(_langIsArray);

	var blockCommon = {
	    lifecycle: {
	        created: function created() {
	            blockInit(this);
	        },

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
	                (0, _utilsLazy2['default'])(blockCreateLazy, this);
	            } else {
	                blockCreate(this);
	            }
	        },

	        removed: function removed() {
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
	            get: function get() {
	                return Boolean(this.xblock && this.xblock.isMounted());
	            }
	        },

	        content: {
	            get: function get() {
	                if (this.mounted) {
	                    return this.xblock.getMountedContent();
	                }

	                return _dom2['default'].contentNode(this).innerHTML;
	            },

	            set: function set(content) {
	                if (this.mounted) {
	                    this.xblock.setMountedContent(content);
	                } else {
	                    _dom2['default'].contentNode(this).innerHTML = content;
	                    this.upgrade();
	                }
	            }
	        },

	        // getting object attributes
	        attrs: {
	            get: function get() {
	                return _dom2['default'].attrs.toObject(this);
	            }
	        },

	        props: {
	            get: function get() {
	                var prop;
	                var props = _dom2['default'].attrs.toObject(this);
	                var xprops = this.xprops;
	                var eprops = _xtag2['default'].tags[this.xtagName].accessors;
	                var common = blockCommon.accessors;

	                for (prop in eprops) {
	                    if (xprops.hasOwnProperty(prop) && eprops.hasOwnProperty(prop) && !common.hasOwnProperty(prop)) {

	                        props[prop] = this[prop];
	                    }
	                }

	                _dom2['default'].attrs.typeConversion(props, xprops);
	                return props;
	            }
	        },

	        xprops: {
	            get: function get() {
	                return (0, _utilsPropTypes2['default'])(this.xtagName);
	            }
	        },

	        outerHTML: _dom2['default'].outerHTML
	    },

	    methods: {
	        upgrade: function upgrade() {
	            _dom2['default'].upgradeAll(this);
	        },

	        cloneNode: function cloneNode(deep) {
	            // not to clone the contents
	            var node = _dom2['default'].cloneNode(this, false);
	            _dom2['default'].upgrade(node);

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

	exports['default'] = {
	    create: create
	};

	/**
	 * Creating a new tag
	 *
	 * @see http://x-tags.org/docs
	 * @param {string} blockName the name of the new node
	 * @param {?object|array} options settings tag creation
	 * @returns {HTMLElement}
	 */
	function create(blockName, options) {
	    options = (0, _langIsArray2['default'])(options) ? options : [options];
	    options.unshift({});
	    options.push(blockCommon);

	    // error when merging prototype in FireFox <=19
	    var proto;
	    var o;
	    var i = 1;
	    var l = options.length;

	    for (; i < l; i++) {
	        o = options[i];

	        if ((0, _langIsPlainObject2['default'])(o)) {
	            if (!proto && o.prototype) {
	                proto = o.prototype;
	            }

	            delete o.prototype;
	        }
	    }

	    options = _objectMerge2['default'].apply({}, options);

	    if (proto) {
	        options.prototype = proto;
	    }

	    return _xtag2['default'].register(blockName, options);
	}

	function blockInit(node) {
	    if (!node.xtagName) {
	        node.xtagName = node.tagName.toLowerCase();
	        node.xtmpl = {};
	        node.xuid = (0, _utilityUniqueId2['default'])();
	        node.xinserted = false;
	        return true;
	    }

	    return false;
	}

	function blockCreate(node) {
	    if (node.hasChildNodes()) {
	        Array.prototype.forEach.call(node.querySelectorAll('script[type="text/x-template"][ref],template[ref]'), tmplCompileIterator, node);
	    }

	    node.xblock = new _element2['default'](node);
	}

	function blockCreateLazy(nodes) {
	    nodes.forEach(blockCreate);
	}

	function tmplCompileIterator(tmplNode) {
	    this.xtmpl[tmplNode.getAttribute('ref')] = tmplNode.innerHTML;
	}
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _domAttrs = __webpack_require__(3);

	var _domAttrs2 = _interopRequireDefault(_domAttrs);

	var _domCloneNode = __webpack_require__(5);

	var _domCloneNode2 = _interopRequireDefault(_domCloneNode);

	var _domContentNode = __webpack_require__(7);

	var _domContentNode2 = _interopRequireDefault(_domContentNode);

	var _domOuterHTML = __webpack_require__(8);

	var _domOuterHTML2 = _interopRequireDefault(_domOuterHTML);

	var _domUpgrade = __webpack_require__(9);

	var _domUpgrade2 = _interopRequireDefault(_domUpgrade);

	var _domUpgradeAll = __webpack_require__(10);

	var _domUpgradeAll2 = _interopRequireDefault(_domUpgradeAll);

	exports['default'] = {
	    attrs: _domAttrs2['default'],
	    cloneNode: _domCloneNode2['default'],
	    contentNode: _domContentNode2['default'],
	    outerHTML: _domOuterHTML2['default'],
	    upgrade: _domUpgrade2['default'],
	    upgradeAll: _domUpgradeAll2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _react = __webpack_require__(4);

	/**
	 * A set of boolean attributes
	 * @type {string[]}
	 */
	var attrsBoolean = ['active', 'autofocus', 'checked', 'defer', 'disabled', 'ismap', 'multiple', 'readonly', 'required', 'selected'];

	exports['default'] = {
	    get: get,
	    toObject: toObject,
	    typeConversion: typeConversion,
	    valueConversion: valueConversion
	};

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
	function get(element, attrs) {
	    if (element.nodeType !== 1 || !element.hasAttributes()) {
	        return attrs;
	    }

	    var attrName;
	    for (attrName in attrs) {
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
	function toObject(element) {
	    var attrs = {};

	    if (element.nodeType === 1 && element.hasAttributes()) {
	        Array.prototype.forEach.call(element.attributes, toObjectIterator, attrs);
	    }

	    return attrs;
	}

	/**
	 * Collective conversion of attribute types
	 *
	 * @example
	 * xblocks.dom.attrs.typeConversion({
	 *     'attr1': '123',
	 *     'attr2': ''
	 * }, {
	 *     'attr1': PropTypes.number,
	 *     'attr2': PropTypes.bool
	 * });
	 * // { 'attr1': 123, 'attr2': true }
	 *
	 * @function xblocks.dom.attrs.typeConversion
	 * @param {object} props the set of attributes
	 * @param {object} [propTypes] the set of attribute types
	 * @returns {object}
	 */
	function typeConversion(props, propTypes) {
	    propTypes = propTypes || {};

	    var prop;
	    for (prop in props) {
	        if (props.hasOwnProperty(prop)) {
	            props[prop] = valueConversion(prop, props[prop], propTypes[prop]);
	        }
	    }

	    return props;
	}

	/**
	 * Convert the attribute value to the specified type
	 *
	 * @example
	 * xblocks.dom.attrs.valueConversion('attr1', 'true');
	 * // true
	 * xblocks.dom.attrs.valueConversion('attr1', 'true', PropTypes.string);
	 * // 'true'
	 * xblocks.dom.attrs.valueConversion('attr1', '123', PropTypes.number);
	 * // 123
	 *
	 * @function xblocks.dom.attrs.valueConversion
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
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _context = __webpack_require__(6);

	var _context2 = _interopRequireDefault(_context);

	var elementProto = (_context2['default'].HTMLElement || _context2['default'].Element).prototype;

	/**
	 * Cloning node
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node.cloneNode
	 * @function xblocks.dom.cloneNode
	 * @param {HTMLElement} node the node to be cloned
	 * @param {boolean} deep true if the children of the node should also be cloned,
	 * or false to clone only the specified node.
	 * @returns {HTMLElement} The new node that will be a clone of node
	 */

	exports['default'] = function (node, deep) {
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

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var context = (function () {
	    return this || (1, eval)('this');
	})();

	exports['default'] = context;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * @function xblocks.dom.contentNode
	 * @param {HTMLElement} node
	 * @returns {HTMLElement}
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (node) {
	    var element;

	    if (node.xuid && node.nodeType === 1 && node.hasChildNodes()) {
	        element = node.querySelector('[data-xb-content="' + node.xuid + '"]');

	        if (!element) {
	            element = node.querySelector('script[type="text/x-template"]:not([ref]),template:not([ref])');
	        }
	    }

	    return element || node;
	};

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _context = __webpack_require__(6);

	var _context2 = _interopRequireDefault(_context);

	/**
	 * @function xblocks.dom.outerHTML
	 * @prop {object} xblocks.dom.outerHTML
	 * @prop {function} xblocks.dom.outerHTML.get
	 * @prop {function} xblocks.dom.outerHTML.set
	 */

	exports['default'] = (function () {

	    var container = _context2['default'].document.createElementNS('http://www.w3.org/1999/xhtml', '_');
	    var getter;
	    var setter;

	    if (container.hasOwnProperty('outerHTML')) {
	        getter = function () {
	            return this.outerHTML;
	        };

	        setter = function (html) {
	            this.outerHTML = html;
	        };
	    } else {
	        var serializer = _context2['default'].XMLSerializer && new _context2['default'].XMLSerializer();
	        var xmlns = /\sxmlns=\"[^\"]+\"/;

	        if (serializer) {
	            getter = function () {
	                return serializer.serializeToString(this).replace(xmlns, '');
	            };
	        } else {
	            getter = function () {
	                container.appendChild(this.cloneNode(false));
	                var html = container.innerHTML.replace('><', '>' + this.innerHTML + '<');
	                container.innerHTML = '';
	                return html;
	            };
	        }

	        setter = function (html) {
	            var node = this;
	            var parent = node.parentNode;
	            var child;

	            if (!parent) {
	                _context2['default'].DOMException.code = _context2['default'].DOMException.NOT_FOUND_ERR;
	                throw _context2['default'].DOMException;
	            }

	            container.innerHTML = html;

	            while (child = container.firstChild) {
	                parent.insertBefore(child, node);
	            }

	            parent.removeChild(node);
	        };
	    }

	    return {
	        'get': getter,
	        'set': setter
	    };
	})();

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _context = __webpack_require__(6);

	var _context2 = _interopRequireDefault(_context);

	/**
	 * @function xblocks.dom.upgrade
	 */

	exports['default'] = (function () {
	    if (_context2['default'].CustomElements && typeof _context2['default'].CustomElements.upgrade === 'function') {
	        return _context2['default'].CustomElements.upgrade;
	    } else {
	        return function () {};
	    }
	})();

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _context = __webpack_require__(6);

	var _context2 = _interopRequireDefault(_context);

	/**
	 * @function xblocks.dom.upgradeAll
	 */

	exports['default'] = (function () {
	    if (_context2['default'].CustomElements && typeof _context2['default'].CustomElements.upgradeAll === 'function') {
	        return _context2['default'].CustomElements.upgradeAll;
	    } else {
	        return function () {};
	    }
	})();

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = XBElement;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reactDom = __webpack_require__(12);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _context = __webpack_require__(6);

	var _context2 = _interopRequireDefault(_context);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _event = __webpack_require__(13);

	var _event2 = _interopRequireDefault(_event);

	var _view = __webpack_require__(20);

	var _view2 = _interopRequireDefault(_view);

	var _utilsLazy = __webpack_require__(52);

	var _utilsLazy2 = _interopRequireDefault(_utilsLazy);

	var _objectAssign = __webpack_require__(63);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _objectMerge = __webpack_require__(21);

	var _objectMerge2 = _interopRequireDefault(_objectMerge);

	var _objectKeys = __webpack_require__(45);

	var _objectKeys2 = _interopRequireDefault(_objectKeys);

	var _langIsArray = __webpack_require__(34);

	var _langIsArray2 = _interopRequireDefault(_langIsArray);

	/**
	 * Xblock element constructor
	 * @param {HTMLElement} node the node of a custom element
	 * @constructor
	 */

	function XBElement(node) {
	    node.xblock = this;

	    this._callbackMutation = this._callbackMutation.bind(this);

	    this._observerOptions = {
	        'attributeFilter': (0, _objectKeys2['default'])(node.xprops),
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
	XBElement.prototype._node = null;

	/**
	 * React component
	 * @type {Constructor}
	 * @protected
	 */
	XBElement.prototype._component = null;

	/**
	 * Instance MutationObserver
	 * @type {MutationObserver}
	 * @protected
	 */
	XBElement.prototype._observer = null;

	/**
	 * Unmounts a component and removes it from the DOM
	 * @fires xblocks.Element~event:xb-destroy
	 */
	XBElement.prototype.destroy = function () {
	    var node = this._node;
	    var content = node.content;

	    this._observer.disconnect();
	    this._observer = null;
	    this._component = null;
	    this._node = null;

	    _reactDom2['default'].unmountComponentAtNode(node);

	    // replace initial content after destroy react component
	    // fix:
	    // element.parentNode.removeChild(element);
	    // document.body.appendChild(element);
	    node.content = content;
	    node.xblock = undefined;

	    _event2['default'].dispatch(node, 'xb-destroy', { 'bubbles': false, 'cancelable': false });
	};

	/**
	 * Update react view
	 * @param {object} [props] added attributes
	 * @param {array} [removeProps] remote attributes
	 * @param {function} [callback] the callback function
	 */
	XBElement.prototype.update = function (props, removeProps, callback) {
	    var nextProps = (0, _objectMerge2['default'])({}, this.getMountedProps(), this._node.props, props);

	    // merge of new and current properties
	    // and the exclusion of remote properties
	    if ((0, _langIsArray2['default'])(removeProps) && removeProps.length) {
	        var l = removeProps.length;
	        while (l--) {
	            if (nextProps.hasOwnProperty(removeProps[l])) {
	                delete nextProps[removeProps[l]];
	            }
	        }
	    }

	    _dom2['default'].attrs.typeConversion(nextProps, this._node.xprops);

	    var proxyConstructor = _view2['default'].getFactory(this._node.xtagName)(nextProps);
	    var that = this;
	    var renderCallback = function renderCallback() {
	        that._component = this;
	        that._callbackUpdate(callback);
	    };

	    this._observer.disconnect();
	    this._component = _reactDom2['default'].render(proxyConstructor, this._node, renderCallback);
	};

	/**
	 * Returns true if the component is rendered into the DOM, false otherwise
	 * @see http://facebook.github.io/react/docs/component-api.html#ismounted
	 * @returns {boolean}
	 */
	XBElement.prototype.isMounted = function () {
	    return Boolean(this._component && this._component.isMounted());
	};

	/**
	 * Installing a new content react component
	 * @param {string} content
	 */
	XBElement.prototype.setMountedContent = function (content) {
	    if (this.isMounted()) {
	        this.update({ 'children': content });
	    }
	};

	/**
	 * Receiving the content components react
	 * @returns {?string}
	 */
	XBElement.prototype.getMountedContent = function () {
	    if (this.isMounted()) {
	        return this._component.props.children;
	    }
	};

	/**
	 * Get components react
	 * @returns {?ReactCompositeComponent.createClass.Constructor}
	 */
	XBElement.prototype.getMountedComponent = function () {
	    if (this.isMounted()) {
	        return this._component;
	    }
	};

	/**
	 * Gets the attributes of the components
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
	    var props = (0, _objectAssign2['default'])({}, this._node.props, {
	        '_uid': this._node.xuid,
	        '_container': this._node
	    });

	    _dom2['default'].attrs.typeConversion(props, this._node.xprops);

	    var proxyConstructor = _view2['default'].getFactory(this._node.xtagName)(props, children);
	    var that = this;
	    var renderCallback = function renderCallback() {
	        that._component = this;
	        that._callbackInit();
	    };

	    this._component = _reactDom2['default'].render(proxyConstructor, this._node, renderCallback);
	};

	/**
	 * @protected
	 * @fires xblocks.Element~event:xb-created
	 */
	XBElement.prototype._callbackInit = function () {
	    this._node.upgrade();
	    this._observer = new _context2['default'].MutationObserver(this._callbackMutation);
	    this._observer.observe(this._node, this._observerOptions);

	    _event2['default'].dispatch(this._node, 'xb-created');
	    (0, _utilsLazy2['default'])(globalInitEvent, this._node);
	};

	/**
	 * @param {function} [callback] the callback function
	 * @protected
	 * @fires xblocks.Element~event:xb-update
	 */
	XBElement.prototype._callbackUpdate = function (callback) {
	    this._node.upgrade();
	    this._observer.observe(this._node, this._observerOptions);

	    _event2['default'].dispatch(this._node, 'xb-update');
	    (0, _utilsLazy2['default'])(globalUpdateEvent, this._node);

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
	    _event2['default'].dispatch(_context2['default'], 'xb-created', { 'detail': { 'records': records } });
	}

	/**
	 * @param {array} records
	 * @protected
	 */
	function globalUpdateEvent(records) {
	    _event2['default'].dispatch(_context2['default'], 'xb-update', { 'detail': { 'records': records } });
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
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _context = __webpack_require__(6);

	var _context2 = _interopRequireDefault(_context);

	var _langIsNative = __webpack_require__(14);

	var _langIsNative2 = _interopRequireDefault(_langIsNative);

	var _polyfillsCustomEventCommon = __webpack_require__(19);

	var _polyfillsCustomEventCommon2 = _interopRequireDefault(_polyfillsCustomEventCommon);

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
	var Custom = (function () {
	    if ((0, _langIsNative2['default'])('CustomEvent')) {
	        return _context2['default'].CustomEvent;
	    }

	    return _polyfillsCustomEventCommon2['default'];
	})();

	exports['default'] = {
	    Custom: Custom,
	    dispatch: dispatch
	};

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
	function dispatch(element, name, params) {
	    element.dispatchEvent(new Custom(name, params || {}));
	}
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash exports="umd" include="assign,merge,isPlainObject,clone,cloneDeep,uniqueId,isNative,keys" modularize -o lodash`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isFunction = __webpack_require__(15),
	    isHostObject = __webpack_require__(17),
	    isObjectLike = __webpack_require__(18);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	module.exports = isNative;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
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
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	var isHostObject = (function() {
	  try {
	    Object({ 'toString': 0 } + '');
	  } catch(e) {
	    return function() { return false; };
	  }
	  return function(value) {
	    // IE < 9 presents many host objects as `Object` objects that can coerce
	    // to strings despite having improperly defined `toString` methods.
	    return typeof value.toString != 'function' && typeof (value + '') == 'string';
	  };
	}());

	module.exports = isHostObject;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _context = __webpack_require__(6);

	var _context2 = _interopRequireDefault(_context);

	var CustomEventCommon;
	var issetCustomEvent = false;

	try {
	    issetCustomEvent = Boolean(_context2['default'].document.createEvent('CustomEvent'));
	} catch (e) {
	    // do nothing
	}

	if (issetCustomEvent) {
	    CustomEventCommon = function (eventName, params) {
	        params = params || {};

	        var bubbles = Boolean(params.bubbles);
	        var cancelable = Boolean(params.cancelable);
	        var evt = _context2['default'].document.createEvent('CustomEvent');

	        evt.initCustomEvent(eventName, bubbles, cancelable, params.detail);

	        return evt;
	    };
	} else {
	    CustomEventCommon = function (eventName, params) {
	        params = params || {};

	        var bubbles = Boolean(params.bubbles);
	        var cancelable = Boolean(params.cancelable);
	        var evt = _context2['default'].document.createEvent('Event');

	        evt.initEvent(eventName, bubbles, cancelable);
	        evt.detail = params.detail;

	        return evt;
	    };
	}

	CustomEventCommon.prototype = _context2['default'].Event.prototype;

	exports['default'] = CustomEventCommon;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _objectMerge = __webpack_require__(21);

	var _objectMerge2 = _interopRequireDefault(_objectMerge);

	var _langIsArray = __webpack_require__(34);

	var _langIsArray2 = _interopRequireDefault(_langIsArray);

	var viewComponentsClass = {};
	var viewCommon = {

	    /**
	     * Required attributes
	     * @memberOf ReactElement.prototype
	     * @type {object}
	     */
	    propTypes: {
	        '_uid': _react2['default'].PropTypes.node,
	        '_container': _react2['default'].PropTypes.any, // Bad way ;(
	        'children': _react2['default'].PropTypes.node
	    },

	    /**
	     * Create node by template
	     * @memberOf ReactElement.prototype
	     * @param {string} ref template name
	     * @param {object} [props] the attributes of a node
	     * @returns {?ReactElement}
	     */
	    template: function template(ref, props) {
	        var xtmpl = this.props._container && this.props._container.xtmpl;

	        if (typeof xtmpl === 'object' && xtmpl !== null && xtmpl.hasOwnProperty(ref)) {
	            return _react2['default'].createElement('div', _extends({}, props, { dangerouslySetInnerHTML: { '__html': this.templatePrepare(xtmpl[ref]) } }));
	        }

	        return null;
	    },

	    /**
	     * Get the node associated with the view
	     * @returns {HTMLElement}
	     */
	    container: function container() {
	        return this.props._container;
	    }
	};

	var viewCommonUser = {
	    templatePrepare: function templatePrepare(tmplString) {
	        return tmplString;
	    }
	};

	exports['default'] = {
	    create: create,
	    register: register,
	    getClass: getClass,
	    getFactory: getFactory
	};

	/**
	 * Create class view node
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
	 * @param {object|array} component settings view creation
	 * @returns {function}
	 */
	function create(component) {
	    component = (0, _langIsArray2['default'])(component) ? component : [component];
	    component.unshift({}, viewCommonUser);
	    component.push(viewCommon);

	    return _react2['default'].createClass(_objectMerge2['default'].apply({}, component));
	}

	/**
	 * Registration of a new node
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
	 * @param {object|array} component settings view creation
	 * @returns {function}
	 */
	function register(blockName, component) {
	    if (_react2['default'].DOM.hasOwnProperty(blockName)) {
	        /* eslint no-throw-literal:0 */
	        throw 'Specified item "' + blockName + '" is already defined';
	    }

	    var componentClass = create(component);
	    viewComponentsClass[blockName] = componentClass;

	    _react2['default'].DOM[blockName] = _react2['default'].createFactory(componentClass);

	    return componentClass;
	}

	/**
	 * Get factory view node
	 * @param {string} blockName the name of the new node
	 * @returns {function}
	 */
	function getFactory(blockName) {
	    return _react2['default'].DOM[blockName];
	}

	/**
	 * Get class view node
	 * @param {string} blockName the name of the new node
	 * @returns {function}
	 */
	function getClass(blockName) {
	    return viewComponentsClass[blockName];
	}
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash exports="umd" include="assign,merge,isPlainObject,clone,cloneDeep,uniqueId,isNative,keys" modularize -o lodash`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseMerge = __webpack_require__(22),
	    createAssigner = __webpack_require__(47);

	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
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
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);

	module.exports = merge;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(23),
	    baseMergeDeep = __webpack_require__(24),
	    isArray = __webpack_require__(34),
	    isArrayLike = __webpack_require__(27),
	    isObject = __webpack_require__(16),
	    isObjectLike = __webpack_require__(18),
	    isTypedArray = __webpack_require__(42),
	    keys = __webpack_require__(45);

	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);

	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || (isSrcArr && !(key in object))) &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}

	module.exports = baseMerge;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(25),
	    isArguments = __webpack_require__(26),
	    isArray = __webpack_require__(34),
	    isArrayLike = __webpack_require__(27),
	    isPlainObject = __webpack_require__(36),
	    isTypedArray = __webpack_require__(42),
	    toPlainObject = __webpack_require__(43);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];

	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;

	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (isArrayLike(value) ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}

	module.exports = baseMergeDeep;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(27),
	    isObjectLike = __webpack_require__(18);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(28),
	    isLength = __webpack_require__(33);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(29);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(30);

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : toObject(object)[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16),
	    isString = __webpack_require__(31),
	    support = __webpack_require__(32);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  if (support.unindexedChars && isString(value)) {
	    var index = -1,
	        length = value.length,
	        result = Object(value);

	    while (++index < length) {
	      result[index] = value.charAt(index);
	    }
	    return result;
	  }
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(18);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/** Used for native method references. */
	var arrayProto = Array.prototype,
	    errorProto = Error.prototype,
	    objectProto = Object.prototype;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;

	/**
	 * An object environment feature flags.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var support = {};

	(function(x) {
	  var Ctor = function() { this.x = x; },
	      object = { '0': x, 'length': x },
	      props = [];

	  Ctor.prototype = { 'valueOf': x, 'y': x };
	  for (var key in new Ctor) { props.push(key); }

	  /**
	   * Detect if `name` or `message` properties of `Error.prototype` are
	   * enumerable by default (IE < 9, Safari < 5.1).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') ||
	    propertyIsEnumerable.call(errorProto, 'name');

	  /**
	   * Detect if `prototype` properties are enumerable by default.
	   *
	   * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
	   * (if the prototype or a property on the prototype has been set)
	   * incorrectly set the `[[Enumerable]]` value of a function's `prototype`
	   * property to `true`.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');

	  /**
	   * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
	   *
	   * In IE < 9 an object's own properties, shadowing non-enumerable ones,
	   * are made non-enumerable as well (a.k.a the JScript `[[DontEnum]]` bug).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.nonEnumShadows = !/valueOf/.test(props);

	  /**
	   * Detect if own properties are iterated after inherited properties (IE < 9).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.ownLast = props[0] != 'x';

	  /**
	   * Detect if `Array#shift` and `Array#splice` augment array-like objects
	   * correctly.
	   *
	   * Firefox < 10, compatibility modes of IE 8, and IE < 9 have buggy Array
	   * `shift()` and `splice()` functions that fail to remove the last element,
	   * `value[0]`, of array-like objects even though the "length" property is
	   * set to `0`. The `shift()` method is buggy in compatibility modes of IE 8,
	   * while `splice()` is buggy regardless of mode in IE < 9.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.spliceObjects = (splice.call(object, 0, 1), !object[0]);

	  /**
	   * Detect lack of support for accessing string characters by index.
	   *
	   * IE < 8 can't access characters by index. IE 8 can only access characters
	   * by index on string literals, not string objects.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';
	}(1, 0));

	module.exports = support;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(35),
	    isLength = __webpack_require__(33),
	    isObjectLike = __webpack_require__(18);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(14);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash exports="umd" include="assign,merge,isPlainObject,clone,cloneDeep,uniqueId,isNative,keys" modularize -o lodash`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseForIn = __webpack_require__(37),
	    isArguments = __webpack_require__(26),
	    isHostObject = __webpack_require__(17),
	    isObjectLike = __webpack_require__(18),
	    support = __webpack_require__(32);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
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
	  var Ctor;

	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isHostObject(value) && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  if (support.ownLast) {
	    baseForIn(value, function(subValue, key, object) {
	      result = hasOwnProperty.call(object, key);
	      return false;
	    });
	    return result !== false;
	  }
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}

	module.exports = isPlainObject;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(38),
	    keysIn = __webpack_require__(40);

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	module.exports = baseForIn;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(39);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(30);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(23),
	    isArguments = __webpack_require__(26),
	    isArray = __webpack_require__(34),
	    isFunction = __webpack_require__(15),
	    isIndex = __webpack_require__(41),
	    isLength = __webpack_require__(33),
	    isObject = __webpack_require__(16),
	    isString = __webpack_require__(31),
	    support = __webpack_require__(32);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/** Used to fix the JScript `[[DontEnum]]` bug. */
	var shadowProps = [
	  'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
	  'toLocaleString', 'toString', 'valueOf'
	];

	/** Used for native method references. */
	var errorProto = Error.prototype,
	    objectProto = Object.prototype,
	    stringProto = String.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to avoid iterating over non-enumerable properties in IE < 9. */
	var nonEnumProps = {};
	nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
	nonEnumProps[boolTag] = nonEnumProps[stringTag] = { 'constructor': true, 'toString': true, 'valueOf': true };
	nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = { 'constructor': true, 'toString': true };
	nonEnumProps[objectTag] = { 'constructor': true };

	arrayEach(shadowProps, function(key) {
	  for (var tag in nonEnumProps) {
	    if (hasOwnProperty.call(nonEnumProps, tag)) {
	      var props = nonEnumProps[tag];
	      props[key] = hasOwnProperty.call(props, key);
	    }
	  }
	});

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;

	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object) || isString(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      proto = (isFunction(Ctor) && Ctor.prototype) || objectProto,
	      isProto = proto === object,
	      result = Array(length),
	      skipIndexes = length > 0,
	      skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
	      skipProto = support.enumPrototypes && isFunction(object);

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  // lodash skips the `constructor` property when it infers it's iterating
	  // over a `prototype` object because IE < 9 can't set the `[[Enumerable]]`
	  // attribute of an existing property and the `constructor` property of a
	  // prototype defaults to non-enumerable.
	  for (var key in object) {
	    if (!(skipProto && key == 'prototype') &&
	        !(skipErrorProps && (key == 'message' || key == 'name')) &&
	        !(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  if (support.nonEnumShadows && object !== objectProto) {
	    var tag = object === stringProto ? stringTag : (object === errorProto ? errorTag : objToString.call(object)),
	        nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];

	    if (tag == objectTag) {
	      proto = objectProto;
	    }
	    length = shadowProps.length;
	    while (length--) {
	      key = shadowProps[length];
	      var nonEnum = nonEnums[key];
	      if (!(isProto && nonEnum) &&
	          (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
	        result.push(key);
	      }
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(33),
	    isObjectLike = __webpack_require__(18);

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
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(44),
	    keysIn = __webpack_require__(40);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
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
	  return baseCopy(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash exports="umd" include="assign,merge,isPlainObject,clone,cloneDeep,uniqueId,isNative,keys" modularize -o lodash`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(35),
	    isArrayLike = __webpack_require__(27),
	    isObject = __webpack_require__(16),
	    shimKeys = __webpack_require__(46),
	    support = __webpack_require__(32);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
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
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object == 'function' ? support.enumPrototypes : isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(26),
	    isArray = __webpack_require__(34),
	    isIndex = __webpack_require__(41),
	    isLength = __webpack_require__(33),
	    isString = __webpack_require__(31),
	    keysIn = __webpack_require__(40);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object) || isString(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(48),
	    isIterateeCall = __webpack_require__(50),
	    restParam = __webpack_require__(51);

	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(49);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(27),
	    isIndex = __webpack_require__(41),
	    isObject = __webpack_require__(16);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _setimmediate2Src = __webpack_require__(53);

	var _setimmediate2Src2 = _interopRequireDefault(_setimmediate2Src);

	/**
	 * Deferred execution
	 *
	 * @example
	 * var lazyCallback = function () {
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

	exports['default'] = function (callback, args) {
	    if (!callback._args) {
	        callback._args = [];
	    }

	    callback._args.push(args);

	    if (!callback._timer) {
	        callback._timer = _setimmediate2Src2['default'].setImmediate(function () {
	            callback._timer = 0;

	            var saveArgs = callback._args;
	            callback._args = [];

	            callback(saveArgs);
	        });
	    }

	    return callback;
	};

	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(54);
	var useNative = __webpack_require__(55);
	var Timer = __webpack_require__(56);
	var setTimeoutPolifill = __webpack_require__(57);
	var polifills = [
	    __webpack_require__(58),
	    __webpack_require__(59),
	    __webpack_require__(60),
	    __webpack_require__(61),
	    __webpack_require__(62)
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
/* 54 */
/***/ function(module, exports) {

	/*jshint -W067*/
	'use strict';

	module.exports = (function() {
	    return this || (1, eval)('this');
	})();


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var context = __webpack_require__(54);

	// @see http://codeforhire.com/2013/09/21/setimmediate-and-messagechannel-broken-on-internet-explorer-10/
	module.exports = function() {
	    return !(context.navigator && /Trident|Edge/.test(context.navigator.userAgent));
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(54);

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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(54);
	var Timer = __webpack_require__(56);

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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(54);
	var Timer = __webpack_require__(56);

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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(54);
	var Timer = __webpack_require__(56);

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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(54);
	var Timer = __webpack_require__(56);

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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(54);
	var Timer = __webpack_require__(56);

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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(54);
	var Timer = __webpack_require__(56);

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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash exports="umd" include="assign,merge,isPlainObject,clone,cloneDeep,uniqueId,isNative,keys" modularize -o lodash`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var assignWith = __webpack_require__(64),
	    baseAssign = __webpack_require__(65),
	    createAssigner = __webpack_require__(47);

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object. Subsequent sources overwrite property assignments of previous sources.
	 * If `customizer` is provided it's invoked to produce the assigned values.
	 * The `customizer` is bound to `thisArg` and invoked with five arguments:
	 * (objectValue, sourceValue, key, object, source).
	 *
	 * **Note:** This method mutates `object` and is based on
	 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using a customizer callback
	 * var defaults = _.partialRight(_.assign, function(value, other) {
	 *   return _.isUndefined(value) ? other : value;
	 * });
	 *
	 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var assign = createAssigner(function(object, source, customizer) {
	  return customizer
	    ? assignWith(object, source, customizer)
	    : baseAssign(object, source);
	});

	module.exports = assign;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(45);

	/**
	 * A specialized version of `_.assign` for customizing assigned values without
	 * support for argument juggling, multiple sources, and `this` binding `customizer`
	 * functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 */
	function assignWith(object, source, customizer) {
	  var index = -1,
	      props = keys(source),
	      length = props.length;

	  while (++index < length) {
	    var key = props[index],
	        value = object[key],
	        result = customizer(value, source[key], key, object, source);

	    if ((result === result ? (result !== value) : (value === value)) ||
	        (value === undefined && !(key in object))) {
	      object[key] = result;
	    }
	  }
	  return object;
	}

	module.exports = assignWith;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(44),
	    keys = __webpack_require__(45);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_66__;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _view = __webpack_require__(20);

	var _view2 = _interopRequireDefault(_view);

	exports['default'] = function (tagName) {
	    var viewClass = tagName && _view2['default'].getClass(tagName);

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

	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash exports="umd" include="assign,merge,isPlainObject,clone,cloneDeep,uniqueId,isNative,keys" modularize -o lodash`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseToString = __webpack_require__(69);

	/** Used to generate unique IDs. */
	var idCounter = 0;

	/**
	 * Generates a unique ID. If `prefix` is provided the ID is appended to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {string} [prefix] The value to prefix the ID with.
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
	  return baseToString(prefix) + id;
	}

	module.exports = uniqueId;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsLazy = __webpack_require__(52);

	var _utilsLazy2 = _interopRequireDefault(_utilsLazy);

	var _utilsLog = __webpack_require__(71);

	var _utilsLog2 = _interopRequireDefault(_utilsLog);

	var _utilsPropTypes = __webpack_require__(67);

	var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

	exports['default'] = {
	    lazy: _utilsLazy2['default'],
	    log: _utilsLog2['default'],
	    propTypes: _utilsPropTypes2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _context = __webpack_require__(6);

	var _context2 = _interopRequireDefault(_context);

	exports['default'] = {
	    time: time,
	    info: info
	};

	function time(element, name) {
	    if (!element._xtimers) {
	        element._xtimers = {};
	    }

	    if (!Array.isArray(element._xtimers[name])) {
	        element._xtimers[name] = [];
	    }

	    element._xtimers[name].push(_context2['default'].performance.now());
	}

	function info() {
	    _context2['default'].console.info.apply(_context2['default'].console, arguments);
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;