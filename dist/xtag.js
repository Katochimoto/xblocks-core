(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["xtag"] = factory();
	else
		root["xtag"] = factory();
})(this, function() {
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _context = __webpack_require__(207);

	var _context2 = _interopRequireDefault(_context);

	__webpack_require__(276);

	__webpack_require__(277);

	__webpack_require__(278);

	__webpack_require__(279);

	__webpack_require__(280);

	__webpack_require__(281);

	__webpack_require__(282);

	__webpack_require__(283);

	__webpack_require__(284);

	__webpack_require__(285);

	__webpack_require__(286);

	__webpack_require__(287);

	__webpack_require__(288);

	__webpack_require__(289);

	__webpack_require__(290);

	__webpack_require__(291);

	__webpack_require__(292);

	__webpack_require__(293);

	__webpack_require__(294);

	__webpack_require__(295);

	__webpack_require__(296);

	__webpack_require__(297);

	__webpack_require__(298);

	__webpack_require__(299);

	var _core = __webpack_require__(300);

	var _core2 = _interopRequireDefault(_core);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_context2.default.Platform = {};

	/* eslint no-unused-vars:0 */
	var logFlags = {
	    // dom: true
	    // data: true
	};

	module.exports = _core2.default;

/***/ },

/***/ 207:
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

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _context = __webpack_require__(207);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @constant {Document}
	 * @private
	 */
	var doc = _context2.default.document;

	/**
	 * @constant {Object}
	 * @private
	 */
	var protoEvent = _context2.default.Event.prototype;

	var issetCustomEvent = false;

	try {
	    issetCustomEvent = Boolean(doc.createEvent('CustomEvent'));
	} catch (e) {}
	// do nothing


	/**
	 * The original function "stopImmediatePropagation"
	 * @constant {function}
	 * @private
	 */
	var stopImmediatePropagation = protoEvent.stopImmediatePropagation;

	/**
	 * Override function to set properties "immediatePropagationStopped"
	 */
	protoEvent.stopImmediatePropagation = function () {
	    this.immediatePropagationStopped = true;

	    if (stopImmediatePropagation) {
	        stopImmediatePropagation.call(this);
	    } else {
	        this.stopPropagation();
	    }
	};

	var CustomEventCommon = function () {
	    if (issetCustomEvent) {
	        return function (eventName, params) {
	            params = params || {};

	            var bubbles = Boolean(params.bubbles);
	            var cancelable = Boolean(params.cancelable);
	            var evt = doc.createEvent('CustomEvent');

	            evt.initCustomEvent(eventName, bubbles, cancelable, params.detail);

	            return evt;
	        };
	    }

	    return function (eventName, params) {
	        params = params || {};

	        var bubbles = Boolean(params.bubbles);
	        var cancelable = Boolean(params.cancelable);
	        var evt = doc.createEvent('Event');

	        evt.initEvent(eventName, bubbles, cancelable);
	        evt.detail = params.detail;

	        return evt;
	    };
	}();

	CustomEventCommon.prototype = protoEvent;

	exports.default = CustomEventCommon;

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _context = __webpack_require__(207);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (typeof _context2.default.performance === 'undefined') {
	    _context2.default.performance = {};
	}

	/**
	 * Method Performance.now() returns timestamp DOMHighResTimeStamp,
	 * measured in milliseconds, accurate to one thousandth of a millisecond.
	 * @returns {number}
	 */
	_context2.default.performance.now = _context2.default.performance.now || function () {
	    var nowOffset = void 0;

	    if (_context2.default.performance.timing && _context2.default.performance.timing.navigationStart) {
	        nowOffset = _context2.default.performance.timing.navigationStar;
	    } else {
	        nowOffset = Date.now();
	    }

	    return function () {
	        return Date.now() - nowOffset;
	    };
	}();

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _context = __webpack_require__(207);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var indexOf = Array.prototype.indexOf;
	var proto = _context2.default.Element.prototype;

	proto.matches = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || function (selector) {
	    return indexOf.call((this.parentNode || this.ownerDocument).querySelectorAll(selector), this) !== -1;
	};

	exports.default = proto.matches;

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _context = __webpack_require__(207);

	var _context2 = _interopRequireDefault(_context);

	var _CustomEventCommon = __webpack_require__(254);

	var _CustomEventCommon2 = _interopRequireDefault(_CustomEventCommon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * {@link https://github.com/webcomponents/webcomponentsjs/commit/8d6a38aa6e3d03ff54a41db9e9725401bbc1446c Strange commit, checks CustomEvent only in IE}
	 * @constructor CustomEvent
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
	 */

	if (typeof _context2.default.CustomEvent !== 'function') {
	  _context2.default.CustomEvent = _CustomEventCommon2.default;
	}

/***/ },

/***/ 279:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _context = __webpack_require__(207);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * The sign of the change events of an attribute.
	 * @type {boolean}
	 * @private
	 */
	var attrModifiedWorks = false;

	/**
	 * Helper function.
	 * @private
	 */
	/**
	 * @see http://engineering.silk.co/post/31921750832/mutation-events-what-happens
	 */

	var listener = function listener() {
	    attrModifiedWorks = true;
	};

	var htmlElement = _context2.default.document.documentElement;
	htmlElement.addEventListener('DOMAttrModified', listener, false);
	htmlElement.setAttribute('___TEST___', true);
	htmlElement.removeEventListener('DOMAttrModified', listener, false);
	htmlElement.removeAttribute('___TEST___', true);

	if (!attrModifiedWorks) {
	    var proto = _context2.default.Element.prototype;

	    proto.__setAttribute = proto.setAttribute;

	    /**
	     * Set attribute.
	     * @param {string} attrName
	     * @param {string} newVal
	     */
	    proto.setAttribute = function (attrName, newVal) {
	        var prevVal = this.getAttribute(attrName);
	        this.__setAttribute(attrName, newVal);
	        newVal = this.getAttribute(attrName);
	        if (newVal !== prevVal) {
	            var evt = _context2.default.document.createEvent('MutationEvent');
	            evt.initMutationEvent('DOMAttrModified', true, false, this, prevVal || '', newVal || '', attrName, prevVal === null ? evt.ADDITION : evt.MODIFICATION);
	            this.dispatchEvent(evt);
	        }
	    };

	    proto.__removeAttribute = proto.removeAttribute;

	    /**
	     * Remote attribute.
	     * @example
	     * node.removeAttribute('attr');
	     * @param {string} attrName
	     */
	    proto.removeAttribute = function (attrName) {
	        var prevVal = this.getAttribute(attrName);
	        this.__removeAttribute(attrName);
	        var evt = _context2.default.document.createEvent('MutationEvent');
	        evt.initMutationEvent('DOMAttrModified', true, false, this, prevVal, '', attrName, evt.REMOVAL);
	        this.dispatchEvent(evt);
	    };
	}

/***/ },

/***/ 280:
/***/ function(module, exports) {

	// DOMTokenList polyfill for IE9
	(function () {

	if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

	var prototype = Array.prototype,
	    indexOf = prototype.indexOf,
	    slice = prototype.slice,
	    push = prototype.push,
	    splice = prototype.splice,
	    join = prototype.join;

	function DOMTokenList(el) {
	  this._element = el;
	  if (el.className != this._classCache) {
	    this._classCache = el.className;

	    if (!this._classCache) return;

	      // The className needs to be trimmed and split on whitespace
	      // to retrieve a list of classes.
	      var classes = this._classCache.replace(/^\s+|\s+$/g,'').split(/\s+/),
	        i;
	    for (i = 0; i < classes.length; i++) {
	      push.call(this, classes[i]);
	    }
	  }
	};

	function setToClassName(el, classes) {
	  el.className = classes.join(' ');
	}

	DOMTokenList.prototype = {
	  add: function(token) {
	    if(this.contains(token)) return;
	    push.call(this, token);
	    setToClassName(this._element, slice.call(this, 0));
	  },
	  contains: function(token) {
	    return indexOf.call(this, token) !== -1;
	  },
	  item: function(index) {
	    return this[index] || null;
	  },
	  remove: function(token) {
	    var i = indexOf.call(this, token);
	     if (i === -1) {
	       return;
	     }
	    splice.call(this, i, 1);
	    setToClassName(this._element, slice.call(this, 0));
	  },
	  toString: function() {
	    return join.call(this, ' ');
	  },
	  toggle: function(token) {
	    if (indexOf.call(this, token) === -1) {
	      this.add(token);
	    } else {
	      this.remove(token);
	    }
	  }
	};

	window.DOMTokenList = DOMTokenList;

	function defineElementGetter (obj, prop, getter) {
	  if (Object.defineProperty) {
	    Object.defineProperty(obj, prop,{
	      get : getter
	    })
	  } else {
	    obj.__defineGetter__(prop, getter);
	  }
	}

	defineElementGetter(Element.prototype, 'classList', function () {
	  return new DOMTokenList(this);
	});

	})();



/***/ },

/***/ 281:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	if (typeof WeakMap === 'undefined') {
	  (function() {
	    var defineProperty = Object.defineProperty;
	    var counter = Date.now() % 1e9;

	    var WeakMap = function() {
	      this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
	    };

	    WeakMap.prototype = {
	      set: function(key, value) {
	        var entry = key[this.name];
	        if (entry && entry[0] === key)
	          entry[1] = value;
	        else
	          defineProperty(key, this.name, {value: [key, value], writable: true});
	        return this;
	      },
	      get: function(key) {
	        var entry;
	        return (entry = key[this.name]) && entry[0] === key ?
	            entry[1] : undefined;
	      },
	      delete: function(key) {
	        var entry = key[this.name];
	        if (!entry || entry[0] !== key) return false;
	        entry[0] = entry[1] = undefined;
	        return true;
	      },
	      has: function(key) {
	        var entry = key[this.name];
	        if (!entry) return false;
	        return entry[0] === key;
	      }
	    };

	    window.WeakMap = WeakMap;
	  })();
	}


/***/ },

/***/ 282:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	(function(global) {

	  // Don't allow this object to be redefined.
	  if (global.JsMutationObserver) {
	    return;
	  }

	  var registrationsTable = new WeakMap();

	  var setImmediate;

	  // As much as we would like to use the native implementation, IE
	  // (all versions) suffers a rather annoying bug where it will drop or defer
	  // callbacks when heavy DOM operations are being performed concurrently.
	  //
	  // For a thorough discussion on this, see:
	  // http://codeforhire.com/2013/09/21/setimmediate-and-messagechannel-broken-on-internet-explorer-10/
	  if (/Trident|Edge/.test(navigator.userAgent)) {
	    // Sadly, this bug also affects postMessage and MessageQueues.
	    //
	    // We would like to use the onreadystatechange hack for IE <= 10, but it is
	    // dangerous in the polyfilled environment due to requiring that the
	    // observed script element be in the document.
	    setImmediate = setTimeout;

	  // If some other browser ever implements it, let's prefer their native
	  // implementation:
	  } else if (window.setImmediate) {
	    setImmediate = window.setImmediate;

	  // Otherwise, we fall back to postMessage as a means of emulating the next
	  // task semantics of setImmediate.
	  } else {
	    var setImmediateQueue = [];
	    var sentinel = String(Math.random());
	    window.addEventListener('message', function(e) {
	      if (e.data === sentinel) {
	        var queue = setImmediateQueue;
	        setImmediateQueue = [];
	        queue.forEach(function(func) {
	          func();
	        });
	      }
	    });
	    setImmediate = function(func) {
	      setImmediateQueue.push(func);
	      window.postMessage(sentinel, '*');
	    };
	  }

	  // This is used to ensure that we never schedule 2 callas to setImmediate
	  var isScheduled = false;

	  // Keep track of observers that needs to be notified next time.
	  var scheduledObservers = [];

	  /**
	   * Schedules |dispatchCallback| to be called in the future.
	   * @param {MutationObserver} observer
	   */
	  function scheduleCallback(observer) {
	    scheduledObservers.push(observer);
	    if (!isScheduled) {
	      isScheduled = true;
	      setImmediate(dispatchCallbacks);
	    }
	  }

	  function wrapIfNeeded(node) {
	    return window.ShadowDOMPolyfill &&
	        window.ShadowDOMPolyfill.wrapIfNeeded(node) ||
	        node;
	  }

	  function dispatchCallbacks() {
	    // http://dom.spec.whatwg.org/#mutation-observers

	    isScheduled = false; // Used to allow a new setImmediate call above.

	    var observers = scheduledObservers;
	    scheduledObservers = [];
	    // Sort observers based on their creation UID (incremental).
	    observers.sort(function(o1, o2) {
	      return o1.uid_ - o2.uid_;
	    });

	    var anyNonEmpty = false;
	    observers.forEach(function(observer) {

	      // 2.1, 2.2
	      var queue = observer.takeRecords();
	      // 2.3. Remove all transient registered observers whose observer is mo.
	      removeTransientObserversFor(observer);

	      // 2.4
	      if (queue.length) {
	        observer.callback_(queue, observer);
	        anyNonEmpty = true;
	      }
	    });

	    // 3.
	    if (anyNonEmpty)
	      dispatchCallbacks();
	  }

	  function removeTransientObserversFor(observer) {
	    observer.nodes_.forEach(function(node) {
	      var registrations = registrationsTable.get(node);
	      if (!registrations)
	        return;
	      registrations.forEach(function(registration) {
	        if (registration.observer === observer)
	          registration.removeTransientObservers();
	      });
	    });
	  }

	  /**
	   * This function is used for the "For each registered observer observer (with
	   * observer's options as options) in target's list of registered observers,
	   * run these substeps:" and the "For each ancestor ancestor of target, and for
	   * each registered observer observer (with options options) in ancestor's list
	   * of registered observers, run these substeps:" part of the algorithms. The
	   * |options.subtree| is checked to ensure that the callback is called
	   * correctly.
	   *
	   * @param {Node} target
	   * @param {function(MutationObserverInit):MutationRecord} callback
	   */
	  function forEachAncestorAndObserverEnqueueRecord(target, callback) {
	    for (var node = target; node; node = node.parentNode) {
	      var registrations = registrationsTable.get(node);

	      if (registrations) {
	        for (var j = 0; j < registrations.length; j++) {
	          var registration = registrations[j];
	          var options = registration.options;

	          // Only target ignores subtree.
	          if (node !== target && !options.subtree)
	            continue;

	          var record = callback(options);
	          if (record)
	            registration.enqueue(record);
	        }
	      }
	    }
	  }

	  var uidCounter = 0;

	  /**
	   * The class that maps to the DOM MutationObserver interface.
	   * @param {Function} callback.
	   * @constructor
	   */
	  function JsMutationObserver(callback) {
	    this.callback_ = callback;
	    this.nodes_ = [];
	    this.records_ = [];
	    this.uid_ = ++uidCounter;
	  }

	  JsMutationObserver.prototype = {
	    observe: function(target, options) {
	      target = wrapIfNeeded(target);

	      // 1.1
	      if (!options.childList && !options.attributes && !options.characterData ||

	          // 1.2
	          options.attributeOldValue && !options.attributes ||

	          // 1.3
	          options.attributeFilter && options.attributeFilter.length &&
	              !options.attributes ||

	          // 1.4
	          options.characterDataOldValue && !options.characterData) {

	        throw new SyntaxError();
	      }

	      var registrations = registrationsTable.get(target);
	      if (!registrations)
	        registrationsTable.set(target, registrations = []);

	      // 2
	      // If target's list of registered observers already includes a registered
	      // observer associated with the context object, replace that registered
	      // observer's options with options.
	      var registration;
	      for (var i = 0; i < registrations.length; i++) {
	        if (registrations[i].observer === this) {
	          registration = registrations[i];
	          registration.removeListeners();
	          registration.options = options;
	          break;
	        }
	      }

	      // 3.
	      // Otherwise, add a new registered observer to target's list of registered
	      // observers with the context object as the observer and options as the
	      // options, and add target to context object's list of nodes on which it
	      // is registered.
	      if (!registration) {
	        registration = new Registration(this, target, options);
	        registrations.push(registration);
	        this.nodes_.push(target);
	      }

	      registration.addListeners();
	    },

	    disconnect: function() {
	      this.nodes_.forEach(function(node) {
	        var registrations = registrationsTable.get(node);
	        for (var i = 0; i < registrations.length; i++) {
	          var registration = registrations[i];
	          if (registration.observer === this) {
	            registration.removeListeners();
	            registrations.splice(i, 1);
	            // Each node can only have one registered observer associated with
	            // this observer.
	            break;
	          }
	        }
	      }, this);
	      this.records_ = [];
	    },

	    takeRecords: function() {
	      var copyOfRecords = this.records_;
	      this.records_ = [];
	      return copyOfRecords;
	    }
	  };

	  /**
	   * @param {string} type
	   * @param {Node} target
	   * @constructor
	   */
	  function MutationRecord(type, target) {
	    this.type = type;
	    this.target = target;
	    this.addedNodes = [];
	    this.removedNodes = [];
	    this.previousSibling = null;
	    this.nextSibling = null;
	    this.attributeName = null;
	    this.attributeNamespace = null;
	    this.oldValue = null;
	  }

	  function copyMutationRecord(original) {
	    var record = new MutationRecord(original.type, original.target);
	    record.addedNodes = original.addedNodes.slice();
	    record.removedNodes = original.removedNodes.slice();
	    record.previousSibling = original.previousSibling;
	    record.nextSibling = original.nextSibling;
	    record.attributeName = original.attributeName;
	    record.attributeNamespace = original.attributeNamespace;
	    record.oldValue = original.oldValue;
	    return record;
	  };

	  // We keep track of the two (possibly one) records used in a single mutation.
	  var currentRecord, recordWithOldValue;

	  /**
	   * Creates a record without |oldValue| and caches it as |currentRecord| for
	   * later use.
	   * @param {string} oldValue
	   * @return {MutationRecord}
	   */
	  function getRecord(type, target) {
	    return currentRecord = new MutationRecord(type, target);
	  }

	  /**
	   * Gets or creates a record with |oldValue| based in the |currentRecord|
	   * @param {string} oldValue
	   * @return {MutationRecord}
	   */
	  function getRecordWithOldValue(oldValue) {
	    if (recordWithOldValue)
	      return recordWithOldValue;
	    recordWithOldValue = copyMutationRecord(currentRecord);
	    recordWithOldValue.oldValue = oldValue;
	    return recordWithOldValue;
	  }

	  function clearRecords() {
	    currentRecord = recordWithOldValue = undefined;
	  }

	  /**
	   * @param {MutationRecord} record
	   * @return {boolean} Whether the record represents a record from the current
	   * mutation event.
	   */
	  function recordRepresentsCurrentMutation(record) {
	    return record === recordWithOldValue || record === currentRecord;
	  }

	  /**
	   * Selects which record, if any, to replace the last record in the queue.
	   * This returns |null| if no record should be replaced.
	   *
	   * @param {MutationRecord} lastRecord
	   * @param {MutationRecord} newRecord
	   * @param {MutationRecord}
	   */
	  function selectRecord(lastRecord, newRecord) {
	    if (lastRecord === newRecord)
	      return lastRecord;

	    // Check if the the record we are adding represents the same record. If
	    // so, we keep the one with the oldValue in it.
	    if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord))
	      return recordWithOldValue;

	    return null;
	  }

	  /**
	   * Class used to represent a registered observer.
	   * @param {MutationObserver} observer
	   * @param {Node} target
	   * @param {MutationObserverInit} options
	   * @constructor
	   */
	  function Registration(observer, target, options) {
	    this.observer = observer;
	    this.target = target;
	    this.options = options;
	    this.transientObservedNodes = [];
	  }

	  Registration.prototype = {
	    enqueue: function(record) {
	      var records = this.observer.records_;
	      var length = records.length;

	      // There are cases where we replace the last record with the new record.
	      // For example if the record represents the same mutation we need to use
	      // the one with the oldValue. If we get same record (this can happen as we
	      // walk up the tree) we ignore the new record.
	      if (records.length > 0) {
	        var lastRecord = records[length - 1];
	        var recordToReplaceLast = selectRecord(lastRecord, record);
	        if (recordToReplaceLast) {
	          records[length - 1] = recordToReplaceLast;
	          return;
	        }
	      } else {
	        scheduleCallback(this.observer);
	      }

	      records[length] = record;
	    },

	    addListeners: function() {
	      this.addListeners_(this.target);
	    },

	    addListeners_: function(node) {
	      var options = this.options;
	      if (options.attributes)
	        node.addEventListener('DOMAttrModified', this, true);

	      if (options.characterData)
	        node.addEventListener('DOMCharacterDataModified', this, true);

	      if (options.childList)
	        node.addEventListener('DOMNodeInserted', this, true);

	      if (options.childList || options.subtree)
	        node.addEventListener('DOMNodeRemoved', this, true);
	    },

	    removeListeners: function() {
	      this.removeListeners_(this.target);
	    },

	    removeListeners_: function(node) {
	      var options = this.options;
	      if (options.attributes)
	        node.removeEventListener('DOMAttrModified', this, true);

	      if (options.characterData)
	        node.removeEventListener('DOMCharacterDataModified', this, true);

	      if (options.childList)
	        node.removeEventListener('DOMNodeInserted', this, true);

	      if (options.childList || options.subtree)
	        node.removeEventListener('DOMNodeRemoved', this, true);
	    },

	    /**
	     * Adds a transient observer on node. The transient observer gets removed
	     * next time we deliver the change records.
	     * @param {Node} node
	     */
	    addTransientObserver: function(node) {
	      // Don't add transient observers on the target itself. We already have all
	      // the required listeners set up on the target.
	      if (node === this.target)
	        return;

	      this.addListeners_(node);
	      this.transientObservedNodes.push(node);
	      var registrations = registrationsTable.get(node);
	      if (!registrations)
	        registrationsTable.set(node, registrations = []);

	      // We know that registrations does not contain this because we already
	      // checked if node === this.target.
	      registrations.push(this);
	    },

	    removeTransientObservers: function() {
	      var transientObservedNodes = this.transientObservedNodes;
	      this.transientObservedNodes = [];

	      transientObservedNodes.forEach(function(node) {
	        // Transient observers are never added to the target.
	        this.removeListeners_(node);

	        var registrations = registrationsTable.get(node);
	        for (var i = 0; i < registrations.length; i++) {
	          if (registrations[i] === this) {
	            registrations.splice(i, 1);
	            // Each node can only have one registered observer associated with
	            // this observer.
	            break;
	          }
	        }
	      }, this);
	    },

	    handleEvent: function(e) {
	      // Stop propagation since we are managing the propagation manually.
	      // This means that other mutation events on the page will not work
	      // correctly but that is by design.
	      e.stopImmediatePropagation();

	      switch (e.type) {
	        case 'DOMAttrModified':
	          // http://dom.spec.whatwg.org/#concept-mo-queue-attributes

	          var name = e.attrName;
	          var namespace = e.relatedNode.namespaceURI;
	          var target = e.target;

	          // 1.
	          var record = new getRecord('attributes', target);
	          record.attributeName = name;
	          record.attributeNamespace = namespace;

	          // 2.
	          var oldValue =
	              e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;

	          forEachAncestorAndObserverEnqueueRecord(target, function(options) {
	            // 3.1, 4.2
	            if (!options.attributes)
	              return;

	            // 3.2, 4.3
	            if (options.attributeFilter && options.attributeFilter.length &&
	                options.attributeFilter.indexOf(name) === -1 &&
	                options.attributeFilter.indexOf(namespace) === -1) {
	              return;
	            }
	            // 3.3, 4.4
	            if (options.attributeOldValue)
	              return getRecordWithOldValue(oldValue);

	            // 3.4, 4.5
	            return record;
	          });

	          break;

	        case 'DOMCharacterDataModified':
	          // http://dom.spec.whatwg.org/#concept-mo-queue-characterdata
	          var target = e.target;

	          // 1.
	          var record = getRecord('characterData', target);

	          // 2.
	          var oldValue = e.prevValue;


	          forEachAncestorAndObserverEnqueueRecord(target, function(options) {
	            // 3.1, 4.2
	            if (!options.characterData)
	              return;

	            // 3.2, 4.3
	            if (options.characterDataOldValue)
	              return getRecordWithOldValue(oldValue);

	            // 3.3, 4.4
	            return record;
	          });

	          break;

	        case 'DOMNodeRemoved':
	          this.addTransientObserver(e.target);
	          // Fall through.
	        case 'DOMNodeInserted':
	          // http://dom.spec.whatwg.org/#concept-mo-queue-childlist
	          var changedNode = e.target;
	          var addedNodes, removedNodes;
	          if (e.type === 'DOMNodeInserted') {
	            addedNodes = [changedNode];
	            removedNodes = [];
	          } else {

	            addedNodes = [];
	            removedNodes = [changedNode];
	          }
	          var previousSibling = changedNode.previousSibling;
	          var nextSibling = changedNode.nextSibling;

	          // 1.
	          var record = getRecord('childList', e.target.parentNode);
	          record.addedNodes = addedNodes;
	          record.removedNodes = removedNodes;
	          record.previousSibling = previousSibling;
	          record.nextSibling = nextSibling;

	          forEachAncestorAndObserverEnqueueRecord(e.relatedNode, function(options) {
	            // 2.1, 3.2
	            if (!options.childList)
	              return;

	            // 2.2, 3.3
	            return record;
	          });

	      }

	      clearRecords();
	    }
	  };

	  global.JsMutationObserver = JsMutationObserver;

	  if (!global.MutationObserver) {
	    global.MutationObserver = JsMutationObserver;
	    // Explicltly mark MO as polyfilled for user reference.
	    JsMutationObserver._isPolyfilled = true;
	  }

	})(self);


/***/ },

/***/ 283:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	window.CustomElements = window.CustomElements || {flags:{}};

	(function(scope) {

	// imports
	var flags = scope.flags;

	// world's simplest module initializer
	var modules = [];
	var addModule = function(module) {
		modules.push(module);
	};

	var initializeModules = function() {
		modules.forEach(function(module) {
			module(scope);
		});
	};

	// exports
	scope.addModule = addModule;
	scope.initializeModules = initializeModules;
	scope.hasNative = Boolean(document.registerElement);
	scope.isIE = /Trident/.test(navigator.userAgent);

	// NOTE: For consistent timing, use native custom elements only when not
	// polyfilling other key related web components features.
	scope.useNative = !flags.register && scope.hasNative &&
			!window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative);

	})(window.CustomElements);


/***/ },

/***/ 284:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	// helper methods for traversing through element trees
	window.CustomElements.addModule(function(scope){

	// imports
	var IMPORT_LINK_TYPE = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : 'none';

	// walk the subtree rooted at node, including descent into shadow-roots,
	// applying 'cb' to each element
	function forSubtree(node, cb) {
	  //flags.dom && node.childNodes && node.childNodes.length && console.group('subTree: ', node);
	  findAllElements(node, function(e) {
	    if (cb(e)) {
	      return true;
	    }
	    forRoots(e, cb);
	  });
	  forRoots(node, cb);
	  //flags.dom && node.childNodes && node.childNodes.length && console.groupEnd();
	}


	// walk the subtree rooted at node, applying 'find(element, data)' function
	// to each element
	// if 'find' returns true for 'element', do not search element's subtree
	function findAllElements(node, find, data) {
	  var e = node.firstElementChild;
	  if (!e) {
	    e = node.firstChild;
	    while (e && e.nodeType !== Node.ELEMENT_NODE) {
	      e = e.nextSibling;
	    }
	  }
	  while (e) {
	    if (find(e, data) !== true) {
	      findAllElements(e, find, data);
	    }
	    e = e.nextElementSibling;
	  }
	  return null;
	}

	// walk all shadowRoots on a given node.
	function forRoots(node, cb) {
	  var root = node.shadowRoot;
	  while(root) {
	    forSubtree(root, cb);
	    root = root.olderShadowRoot;
	  }
	}

	function forDocumentTree(doc, cb) {
	  _forDocumentTree(doc, cb, []);
	}


	function _forDocumentTree(doc, cb, processingDocuments) {
	  doc = window.wrap(doc);
	  if (processingDocuments.indexOf(doc) >= 0) {
	    return;
	  }
	  processingDocuments.push(doc);
	  var imports = doc.querySelectorAll('link[rel=' + IMPORT_LINK_TYPE + ']');
	  for (var i=0, l=imports.length, n; (i<l) && (n=imports[i]); i++) {
	    if (n.import) {
	      _forDocumentTree(n.import, cb, processingDocuments);
	    }
	  }
	  cb(doc);
	}

	// exports
	scope.forDocumentTree = forDocumentTree;
	scope.forSubtree = forSubtree;


	});


/***/ },

/***/ 285:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	/**
	 * Implements custom element observation and attached/detached callbacks
	 * @module observe
	*/

	window.CustomElements.addModule(function(scope){

	// imports
	var flags = scope.flags;
	var forSubtree = scope.forSubtree;
	var forDocumentTree = scope.forDocumentTree;

	/*
	  Manage nodes attached to document trees
	*/

	// manage lifecycle on added node and it's subtree; upgrade the node and
	// entire subtree if necessary and process attached for the node and entire
	// subtree
	function addedNode(node, isAttached) {
	  return added(node, isAttached) || addedSubtree(node, isAttached);
	}

	// manage lifecycle on added node; upgrade if necessary and process attached
	function added(node, isAttached) {
	  if (scope.upgrade(node, isAttached)) {
	    // Return true to indicate
	    return true;
	  }
	  if (isAttached) {
	    attached(node);
	  }
	}

	// manage lifecycle on added node's subtree only; allows the entire subtree
	// to upgrade if necessary and process attached
	function addedSubtree(node, isAttached) {
	  forSubtree(node, function(e) {
	    if (added(e, isAttached)) {
	      return true;
	    }
	  });
	}

	// On platforms without MutationObserver, mutations may not be
	// reliable and therefore attached/detached are not reliable. We think this
	// occurs sometimes under heavy DOM operation load, but it is not easy to
	// reproduce.
	// To make these callbacks less likely to fail in this scenario,
	// we *optionally* defer all inserts and removes
	// to give a chance for elements to be attached into dom.
	// This helps ensure attachedCallback fires for elements that are created and
	// immediately added to dom.
	// This change can significantly alter the performance characteristics
	// of attaching elements and therefore we only enable it if the user has
	// explicitly provided the `throttle-attached` flag.
	var hasThrottledAttached = (window.MutationObserver._isPolyfilled &&
	    flags['throttle-attached']);
	// bc
	scope.hasPolyfillMutations = hasThrottledAttached;
	// exposed for testing
	scope.hasThrottledAttached = hasThrottledAttached;

	var isPendingMutations = false;
	var pendingMutations = [];
	function deferMutation(fn) {
	  pendingMutations.push(fn);
	  if (!isPendingMutations) {
	    isPendingMutations = true;
	    setTimeout(takeMutations);
	  }
	}

	function takeMutations() {
	  isPendingMutations = false;
	  var $p = pendingMutations;
	  for (var i=0, l=$p.length, p; (i<l) && (p=$p[i]); i++) {
	    p();
	  }
	  pendingMutations = [];
	}

	function attached(element) {
	  if (hasThrottledAttached) {
	    deferMutation(function() {
	      _attached(element);
	    });
	  } else {
	    _attached(element);
	  }
	}

	// NOTE: due to how MO works (see comments below), an element may be attached
	// multiple times so we protect against extra processing here.
	function _attached(element) {
	  // track element for insertion if it's upgraded and cares about insertion
	  // bail if the element is already marked as attached
	  if (element.__upgraded__ && !element.__attached) {
	    element.__attached = true;
	    if (element.attachedCallback) {
	      element.attachedCallback();
	    }
	  }
	}

	/*
	  Manage nodes detached from document trees
	*/

	// manage lifecycle on detached node and it's subtree; process detached
	// for the node and entire subtree
	function detachedNode(node) {
	  detached(node);
	  forSubtree(node, function(e) {
	    detached(e);
	  });
	}

	function detached(element) {
	  if (hasThrottledAttached) {
	    deferMutation(function() {
	      _detached(element);
	    });
	  } else {
	    _detached(element);
	  }
	}

	// NOTE: due to how MO works (see comments below), an element may be detached
	// multiple times so we protect against extra processing here.
	function _detached(element) {
	  // track element for removal if it's upgraded and cares about removal
	  // bail if the element is already marked as not attached
	  if (element.__upgraded__ && element.__attached) {
	    element.__attached = false;
	    if (element.detachedCallback) {
	      element.detachedCallback();
	    }
	  }
	}

	// recurse up the tree to check if an element is actually in the main document.
	function inDocument(element) {
	  var p = element;
	  var doc = window.wrap(document);
	  while (p) {
	    if (p == doc) {
	      return true;
	    }
	    p = p.parentNode || ((p.nodeType === Node.DOCUMENT_FRAGMENT_NODE) && p.host);
	  }
	}

	//  Install an element observer on all shadowRoots owned by node.
	function watchShadow(node) {
	  if (node.shadowRoot && !node.shadowRoot.__watched) {
	    flags.dom && console.log('watching shadow-root for: ', node.localName);
	    // watch all unwatched roots...
	    var root = node.shadowRoot;
	    while (root) {
	      observe(root);
	      root = root.olderShadowRoot;
	    }
	  }
	}

	/*
	  NOTE: In order to process all mutations, it's necessary to recurse into
	  any added nodes. However, it's not possible to determine a priori if a node
	  will get its own mutation record. This means
	  *nodes can be seen multiple times*.

	  Here's an example:

	  (1) In this case, recursion is required to see `child`:

	      node.innerHTML = '<div><child></child></div>'

	  (2) In this case, child will get its own mutation record:

	      node.appendChild(div).appendChild(child);

	  We cannot know ahead of time if we need to walk into the node in (1) so we
	  do and see child; however, if it was added via case (2) then it will have its
	  own record and therefore be seen 2x.
	*/
	function handler(root, mutations) {
	  // for logging only
	  if (flags.dom) {
	    var mx = mutations[0];
	    if (mx && mx.type === 'childList' && mx.addedNodes) {
	        if (mx.addedNodes) {
	          var d = mx.addedNodes[0];
	          while (d && d !== document && !d.host) {
	            d = d.parentNode;
	          }
	          var u = d && (d.URL || d._URL || (d.host && d.host.localName)) || '';
	          u = u.split('/?').shift().split('/').pop();
	        }
	    }
	    console.group('mutations (%d) [%s]', mutations.length, u || '');
	  }
	  // handle mutations
	  // NOTE: do an `inDocument` check dynamically here. It's possible that `root`
	  // is a document in which case the answer here can never change; however
	  // `root` may be an element like a shadowRoot that can be added/removed
	  // from the main document.
	  var isAttached = inDocument(root);
	  mutations.forEach(function(mx) {
	    if (mx.type === 'childList') {
	      forEach(mx.addedNodes, function(n) {
	        if (!n.localName) {
	          return;
	        }
	        addedNode(n, isAttached);
	      });
	      forEach(mx.removedNodes, function(n) {
	        if (!n.localName) {
	          return;
	        }
	        detachedNode(n);
	      });
	    }
	  });
	  flags.dom && console.groupEnd();
	};


	/*
	  When elements are added to the dom, upgrade and attached/detached may be
	  asynchronous. `CustomElements.takeRecords` can be called to process any
	  pending upgrades and attached/detached callbacks synchronously.
	*/
	function takeRecords(node) {
	  node = window.wrap(node);
	  // If the optional node is not supplied, assume we mean the whole document.
	  if (!node) {
	    node = window.wrap(document);
	  }
	  // Find the root of the tree, which will be an Document or ShadowRoot.
	  while (node.parentNode) {
	    node = node.parentNode;
	  }
	  var observer = node.__observer;
	  if (observer) {
	    handler(node, observer.takeRecords());
	    takeMutations();
	  }
	}

	var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);


	// observe a node tree; bail if it's already being observed.
	function observe(inRoot) {
	  if (inRoot.__observer) {
	    return;
	  }
	  // For each ShadowRoot, we create a new MutationObserver, so the root can be
	  // garbage collected once all references to the `inRoot` node are gone.
	  // Give the handler access to the root so that an 'in document' check can
	  // be done.
	  var observer = new MutationObserver(handler.bind(this, inRoot));
	  observer.observe(inRoot, {childList: true, subtree: true});
	  inRoot.__observer = observer;
	}

	// upgrade an entire document and observe it for elements changes.
	function upgradeDocument(doc) {
	  doc = window.wrap(doc);
	  flags.dom && console.group('upgradeDocument: ', (doc.baseURI).split('/').pop());
	  var isMainDocument = (doc === window.wrap(document));
	  addedNode(doc, isMainDocument);
	  observe(doc);
	  flags.dom && console.groupEnd();
	}

	/*
	This method is intended to be called when the document tree (including imports)
	has pending custom elements to upgrade. It can be called multiple times and
	should do nothing if no elements are in need of upgrade.
	*/
	function upgradeDocumentTree(doc) {
	  forDocumentTree(doc, upgradeDocument);
	}


	// Patch `createShadowRoot()` if Shadow DOM is available, otherwise leave
	// undefined to aid feature detection of Shadow DOM.
	var originalCreateShadowRoot = Element.prototype.createShadowRoot;
	if (originalCreateShadowRoot) {
	  Element.prototype.createShadowRoot = function() {
	    var root = originalCreateShadowRoot.call(this);
	    window.CustomElements.watchShadow(this);
	    return root;
	  };
	}

	// exports
	scope.watchShadow = watchShadow;
	scope.upgradeDocumentTree = upgradeDocumentTree;
	scope.upgradeDocument = upgradeDocument;
	scope.upgradeSubtree = addedSubtree;
	scope.upgradeAll = addedNode;
	scope.attached = attached;
	scope.takeRecords = takeRecords;

	});


/***/ },

/***/ 286:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	/**
	 * Implements custom element upgrading
	 * @module upgrade
	*/

	window.CustomElements.addModule(function(scope) {

	// imports
	var flags = scope.flags;

	/**
	 * Upgrade an element to a custom element. Upgrading an element
	 * causes the custom prototype to be applied, an `is` attribute
	 * to be attached (as needed), and invocation of the `readyCallback`.
	 * If the element is in the main document, the `attachedkCallback` method
	 * will be invoked.
	 * `upgrade` does nothing if the element is already upgraded, or
	 * if it matches no registered custom tag name.
	 *
	 * @method ugprade
	 * @param {Element} element The element to upgrade.
	 * @return {Element} The upgraded element.
	 */
	// Upgrade a node if it can be upgraded and is not already.
	function upgrade(node, isAttached) {
	  // upgrade template elements before custom elements
	  if (node.localName === 'template') {
	    if (window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
	      HTMLTemplateElement.decorate(node);
	    }
	  }
	  if (!node.__upgraded__ && (node.nodeType === Node.ELEMENT_NODE)) {
	    var is = node.getAttribute('is');
	    // find definition first by localName and secondarily by is attribute
	    var definition = scope.getRegisteredDefinition(node.localName) ||
	      scope.getRegisteredDefinition(is);
	    if (definition) {
	      // upgrade with is iff the definition tag matches the element tag
	      // and don't upgrade if there's an is and the definition does not extend
	      // a native element
	      if ((is && definition.tag == node.localName) ||
	        (!is && !definition.extends)) {
	        return upgradeWithDefinition(node, definition, isAttached);
	      }
	    }
	  }
	}

	function upgradeWithDefinition(element, definition, isAttached) {
	  flags.upgrade && console.group('upgrade:', element.localName);
	  // some definitions specify an 'is' attribute
	  if (definition.is) {
	    element.setAttribute('is', definition.is);
	  }
	  // make 'element' implement definition.prototype
	  implementPrototype(element, definition);
	  // flag as upgraded
	  element.__upgraded__ = true;
	  // lifecycle management
	  created(element);
	  // attachedCallback fires in tree order, call before recursing
	  if (isAttached) {
	    scope.attached(element);
	  }
	  // there should never be a shadow root on element at this point
	  scope.upgradeSubtree(element, isAttached);
	  flags.upgrade && console.groupEnd();
	  // OUTPUT
	  return element;
	}

	//  Set __proto__ on supported platforms and use a mixin strategy when
	//  this is not supported; e.g. on IE10.
	function implementPrototype(element, definition) {
	  // prototype swizzling is best
	  if (Object.__proto__) {
	    element.__proto__ = definition.prototype;
	  } else {
	    // where above we can re-acquire inPrototype via
	    // getPrototypeOf(Element), we cannot do so when
	    // we use mixin, so we install a magic reference
	    customMixin(element, definition.prototype, definition.native);
	    element.__proto__ = definition.prototype;
	  }
	}

	function customMixin(inTarget, inSrc, inNative) {
	  // TODO(sjmiles): 'used' allows us to only copy the 'youngest' version of
	  // any property. This set should be precalculated. We also need to
	  // consider this for supporting 'super'.
	  var used = {};
	  // start with inSrc
	  var p = inSrc;
	  // The default is HTMLElement.prototype, so we add a test to avoid mixing in
	  // native prototypes
	  while (p !== inNative && p !== HTMLElement.prototype) {
	    var keys = Object.getOwnPropertyNames(p);
	    for (var i=0, k; k=keys[i]; i++) {
	      if (!used[k]) {
	        Object.defineProperty(inTarget, k,
	            Object.getOwnPropertyDescriptor(p, k));
	        used[k] = 1;
	      }
	    }
	    p = Object.getPrototypeOf(p);
	  }
	}

	function created(element) {
	  // invoke createdCallback
	  if (element.createdCallback) {
	    element.createdCallback();
	  }
	}

	scope.upgrade = upgrade;
	scope.upgradeWithDefinition = upgradeWithDefinition;
	scope.implementPrototype = implementPrototype;

	});


/***/ },

/***/ 287:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	/**
	 * Implements `document.registerElement`
	 * @module register
	*/

	/**
	 * Polyfilled extensions to the `document` object.
	 * @class Document
	*/

	window.CustomElements.addModule(function(scope) {

	// imports
	var isIE = scope.isIE;
	var upgradeDocumentTree = scope.upgradeDocumentTree;
	var upgradeAll = scope.upgradeAll;
	var upgradeWithDefinition = scope.upgradeWithDefinition;
	var implementPrototype = scope.implementPrototype;
	var useNative = scope.useNative;

	/**
	 * Registers a custom tag name with the document.
	 *
	 * When a registered element is created, a `readyCallback` method is called
	 * in the scope of the element. The `readyCallback` method can be specified on
	 * either `options.prototype` or `options.lifecycle` with the latter taking
	 * precedence.
	 *
	 * @method register
	 * @param {String} name The tag name to register. Must include a dash ('-'),
	 *    for example 'x-component'.
	 * @param {Object} options
	 *    @param {String} [options.extends]
	 *      (_off spec_) Tag name of an element to extend (or blank for a new
	 *      element). This parameter is not part of the specification, but instead
	 *      is a hint for the polyfill because the extendee is difficult to infer.
	 *      Remember that the input prototype must chain to the extended element's
	 *      prototype (or HTMLElement.prototype) regardless of the value of
	 *      `extends`.
	 *    @param {Object} options.prototype The prototype to use for the new
	 *      element. The prototype must inherit from HTMLElement.
	 *    @param {Object} [options.lifecycle]
	 *      Callbacks that fire at important phases in the life of the custom
	 *      element.
	 *
	 * @example
	 *      FancyButton = document.registerElement("fancy-button", {
	 *        extends: 'button',
	 *        prototype: Object.create(HTMLButtonElement.prototype, {
	 *          readyCallback: {
	 *            value: function() {
	 *              console.log("a fancy-button was created",
	 *            }
	 *          }
	 *        })
	 *      });
	 * @return {Function} Constructor for the newly registered type.
	 */
	function register(name, options) {
	  //console.warn('document.registerElement("' + name + '", ', options, ')');
	  // construct a defintion out of options
	  // TODO(sjmiles): probably should clone options instead of mutating it
	  var definition = options || {};
	  if (!name) {
	    throw new Error('document.registerElement: first argument `name` must not be empty');
	  }
	  if (name.indexOf('-') < 0) {
	    throw new Error('document.registerElement: first argument (\'name\') must contain a dash (\'-\'). Argument provided was \'' + String(name) + '\'.');
	  }
	  // prevent registering reserved names
	  if (isReservedTag(name)) {
	    throw new Error('Failed to execute \'registerElement\' on \'Document\': Registration failed for type \'' + String(name) + '\'. The type name is invalid.');
	  }
	  // elements may only be registered once
	  if (getRegisteredDefinition(name)) {
	    throw new Error('DuplicateDefinitionError: a type with name \'' + String(name) + '\' is already registered');
	  }
	  // prototype is optional, default to an extension of HTMLElement
	  if (!definition.prototype) {
	    definition.prototype = Object.create(HTMLElement.prototype);
	  }
	  // record name
	  definition.__name = name.toLowerCase();
	  // ensure extended name is also treated case-insensitively
	  if (definition.extends) {
	    definition.extends = definition.extends.toLowerCase();
	  }
	  // ensure a lifecycle object so we don't have to null test it
	  definition.lifecycle = definition.lifecycle || {};
	  // build a list of ancestral custom elements (for native base detection)
	  // TODO(sjmiles): we used to need to store this, but current code only
	  // uses it in 'resolveTagName': it should probably be inlined
	  definition.ancestry = ancestry(definition.extends);
	  // extensions of native specializations of HTMLElement require localName
	  // to remain native, and use secondary 'is' specifier for extension type
	  resolveTagName(definition);
	  // some platforms require modifications to the user-supplied prototype
	  // chain
	  resolvePrototypeChain(definition);
	  // overrides to implement attributeChanged callback
	  overrideAttributeApi(definition.prototype);
	  // 7.1.5: Register the DEFINITION with DOCUMENT
	  registerDefinition(definition.__name, definition);
	  // 7.1.7. Run custom element constructor generation algorithm with PROTOTYPE
	  // 7.1.8. Return the output of the previous step.
	  definition.ctor = generateConstructor(definition);
	  definition.ctor.prototype = definition.prototype;
	  // force our .constructor to be our actual constructor
	  definition.prototype.constructor = definition.ctor;
	  // if initial parsing is complete
	  if (scope.ready) {
	    // upgrade any pre-existing nodes of this type
	    upgradeDocumentTree(document);
	  }
	  return definition.ctor;
	}

	// attribute watching
	function overrideAttributeApi(prototype) {
	  // overrides to implement callbacks
	  // TODO(sjmiles): should support access via .attributes NamedNodeMap
	  // TODO(sjmiles): preserves user defined overrides, if any
	  if (prototype.setAttribute._polyfilled) {
	    return;
	  }
	  var setAttribute = prototype.setAttribute;
	  prototype.setAttribute = function(name, value) {
	    changeAttribute.call(this, name, value, setAttribute);
	  };
	  var removeAttribute = prototype.removeAttribute;
	  prototype.removeAttribute = function(name) {
	    changeAttribute.call(this, name, null, removeAttribute);
	  };
	  prototype.setAttribute._polyfilled = true;
	}

	// https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/
	// index.html#dfn-attribute-changed-callback
	function changeAttribute(name, value, operation) {
	  name = name.toLowerCase();
	  var oldValue = this.getAttribute(name);
	  operation.apply(this, arguments);
	  var newValue = this.getAttribute(name);
	  if (this.attributeChangedCallback &&
	      (newValue !== oldValue)) {
	    this.attributeChangedCallback(name, oldValue, newValue);
	  }
	}

	function isReservedTag(name) {
	  for (var i = 0; i < reservedTagList.length; i++) {
	    if (name === reservedTagList[i]) {
	      return true;
	    }
	  }
	}

	var reservedTagList = [
	  'annotation-xml', 'color-profile', 'font-face', 'font-face-src',
	  'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph'
	];

	function ancestry(extnds) {
	  var extendee = getRegisteredDefinition(extnds);
	  if (extendee) {
	    return ancestry(extendee.extends).concat([extendee]);
	  }
	  return [];
	}

	function resolveTagName(definition) {
	  // if we are explicitly extending something, that thing is our
	  // baseTag, unless it represents a custom component
	  var baseTag = definition.extends;
	  // if our ancestry includes custom components, we only have a
	  // baseTag if one of them does
	  for (var i=0, a; (a=definition.ancestry[i]); i++) {
	    baseTag = a.is && a.tag;
	  }
	  // our tag is our baseTag, if it exists, and otherwise just our name
	  definition.tag = baseTag || definition.__name;
	  if (baseTag) {
	    // if there is a base tag, use secondary 'is' specifier
	    definition.is = definition.__name;
	  }
	}

	function resolvePrototypeChain(definition) {
	  // if we don't support __proto__ we need to locate the native level
	  // prototype for precise mixing in
	  if (!Object.__proto__) {
	    // default prototype
	    var nativePrototype = HTMLElement.prototype;
	    // work out prototype when using type-extension
	    if (definition.is) {
	      var inst = document.createElement(definition.tag);
	      nativePrototype = Object.getPrototypeOf(inst);
	    }
	    // ensure __proto__ reference is installed at each point on the prototype
	    // chain.
	    // NOTE: On platforms without __proto__, a mixin strategy is used instead
	    // of prototype swizzling. In this case, this generated __proto__ provides
	    // limited support for prototype traversal.
	    var proto = definition.prototype, ancestor;
	    var foundPrototype = false;
	    while (proto) {
	      if (proto == nativePrototype) {
	        foundPrototype = true;
	      }
	      ancestor = Object.getPrototypeOf(proto);
	      if (ancestor) {
	        proto.__proto__ = ancestor;
	      }
	      proto = ancestor;
	    }
	    if (!foundPrototype) {
	      // Note the spec actually allows this, but it results in broken elements
	      // and is difficult to polyfill correctly, so we throw
	      console.warn(definition.tag + ' prototype not found in prototype chain for ' +
	        definition.is);
	    }
	    // cache this in case of mixin
	    definition.native = nativePrototype;
	  }
	}

	// SECTION 4

	function instantiate(definition) {
	  // 4.a.1. Create a new object that implements PROTOTYPE
	  // 4.a.2. Let ELEMENT by this new object
	  //
	  // the custom element instantiation algorithm must also ensure that the
	  // output is a valid DOM element with the proper wrapper in place.
	  //
	  return upgradeWithDefinition(domCreateElement(definition.tag), definition);
	}

	// element registry (maps tag names to definitions)

	var registry = {};

	function getRegisteredDefinition(name) {
	  if (name) {
	    return registry[name.toLowerCase()];
	  }
	}

	function registerDefinition(name, definition) {
	  registry[name] = definition;
	}

	function generateConstructor(definition) {
	  return function() {
	    return instantiate(definition);
	  };
	}

	var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
	function createElementNS(namespace, tag, typeExtension) {
	  // NOTE: we do not support non-HTML elements,
	  // just call createElementNS for non HTML Elements
	  if (namespace === HTML_NAMESPACE) {
	    return createElement(tag, typeExtension);
	  } else {
	    return domCreateElementNS(namespace, tag);
	  }
	}

	function createElement(tag, typeExtension) {
	  // TODO(sjmiles): ignore 'tag' when using 'typeExtension', we could
	  // error check it, or perhaps there should only ever be one argument
	  if (tag) {
	    tag = tag.toLowerCase();
	  }
	  if (typeExtension) {
	    typeExtension = typeExtension.toLowerCase();
	  }
	  var definition = getRegisteredDefinition(typeExtension || tag);
	  if (definition) {
	    if (tag == definition.tag && typeExtension == definition.is) {
	      return new definition.ctor();
	    }
	    // Handle empty string for type extension.
	    if (!typeExtension && !definition.is) {
	      return new definition.ctor();
	    }
	  }
	  var element;
	  if (typeExtension) {
	    element = createElement(tag);
	    element.setAttribute('is', typeExtension);
	    return element;
	  }
	  element = domCreateElement(tag);
	  // Custom tags should be HTMLElements even if not upgraded.
	  if (tag.indexOf('-') >= 0) {
	    implementPrototype(element, HTMLElement);
	  }
	  return element;
	}

	// capture native createElement before we override it
	var domCreateElement = document.createElement.bind(document);
	var domCreateElementNS = document.createElementNS.bind(document);

	// Create a custom 'instanceof'. This is necessary when CustomElements
	// are implemented via a mixin strategy, as for example on IE10.
	var isInstance;
	if (!Object.__proto__ && !useNative) {
	  isInstance = function(obj, ctor) {
	    // Allows instanceof(<div>, HTMLElement.prototype) to work
	    if (obj instanceof ctor) {
	      return true;
	    }
	    var p = obj;
	    while (p) {
	      // NOTE: this is not technically correct since we're not checking if
	      // an object is an instance of a constructor; however, this should
	      // be good enough for the mixin strategy.
	      if (p === ctor.prototype) {
	        return true;
	      }
	      p = p.__proto__;
	    }
	    return false;
	  };
	} else {
	  isInstance = function(obj, base) {
	    return obj instanceof base;
	  };
	}

	// wrap a dom object method that works on nodes such that it forces upgrade
	function wrapDomMethodToForceUpgrade(obj, methodName) {
	  var orig = obj[methodName];
	  obj[methodName] = function() {
	    var n = orig.apply(this, arguments);
	    upgradeAll(n);
	    return n;
	  };
	}

	wrapDomMethodToForceUpgrade(Node.prototype, 'cloneNode');
	wrapDomMethodToForceUpgrade(document, 'importNode');

	// exports
	document.registerElement = register;
	document.createElement = createElement; // override
	document.createElementNS = createElementNS; // override
	scope.registry = registry;
	scope.instanceof = isInstance;
	scope.reservedTagList = reservedTagList;
	scope.getRegisteredDefinition = getRegisteredDefinition;

	// bc
	document.register = document.registerElement;

	});


/***/ },

/***/ 288:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	(function(scope){

	// imports
	var useNative = scope.useNative;
	var initializeModules = scope.initializeModules;

	var isIE = scope.isIE;

	// If native, setup stub api and bail.
	// NOTE: we fire `WebComponentsReady` under native for api compatibility
	if (useNative) {
	  // stub
	  var nop = function() {};

	  // exports
	  scope.watchShadow = nop;
	  scope.upgrade = nop;
	  scope.upgradeAll = nop;
	  scope.upgradeDocumentTree = nop;
	  scope.upgradeSubtree = nop;
	  scope.takeRecords = nop;

	  scope.instanceof = function(obj, base) {
	    return obj instanceof base;
	  };

	} else {
	  // Initialize polyfill modules. Note, polyfill modules are loaded but not
	  // executed; this is a convenient way to control which modules run when
	  // the polyfill is required and allows the polyfill to load even when it's
	  // not needed.
	  initializeModules();
	}

	// imports
	var upgradeDocumentTree = scope.upgradeDocumentTree;
	var upgradeDocument = scope.upgradeDocument;

	// ShadowDOM polyfill wraps elements but some elements like `document`
	// cannot be wrapped so we help the polyfill by wrapping some elements.
	if (!window.wrap) {
	  if (window.ShadowDOMPolyfill) {
	    window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded;
	    window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded;
	  } else {
	    window.wrap = window.unwrap = function(node) {
	      return node;
	    };
	  }
	}

	// eagarly upgrade imported documents
	if (window.HTMLImports) {
	  window.HTMLImports.__importsParsingHook = function(elt) {
	    if (elt.import) {
	      upgradeDocument(wrap(elt.import));
	    }
	  };
	}

	// bootstrap parsing
	function bootstrap() {
	  // one more upgrade to catch out of order registrations
	  upgradeDocumentTree(window.wrap(document));
	  // install upgrade hook if HTMLImports are available
	  // set internal 'ready' flag, now document.registerElement will trigger
	  // synchronous upgrades
	  window.CustomElements.ready = true;
	  // async to ensure *native* custom elements upgrade prior to this
	  // DOMContentLoaded can fire before elements upgrade (e.g. when there's
	  // an external script)
	  // Delay doubly to help workaround
	  // https://code.google.com/p/chromium/issues/detail?id=516550.
	  // CustomElements must use requestAnimationFrame in attachedCallback
	  // to query style/layout data. The WebComponentsReady event is intended
	  // to convey overall readiness, which ideally should be after elements
	  // are attached. Adding a slight extra delay to WebComponentsReady
	  // helps preserve this guarantee.
	  var requestAnimationFrame = window.requestAnimationFrame || function(f) {
	    setTimeout(f, 16);
	  };
	  requestAnimationFrame(function() {
	    setTimeout(function() {
	      // capture blunt profiling data
	      window.CustomElements.readyTime = Date.now();
	      if (window.HTMLImports) {
	        window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime;
	      }
	      // notify the system that we are bootstrapped
	      document.dispatchEvent(
	        new CustomEvent('WebComponentsReady', {bubbles: true})
	      );
	    });
	  });
	}

	// When loading at readyState complete time (or via flag), boot custom elements
	// immediately.
	// If relevant, HTMLImports must already be loaded.
	if (document.readyState === 'complete' || scope.flags.eager) {
	  bootstrap();
	// When loading at readyState interactive time, bootstrap only if HTMLImports
	// are not pending. Also avoid IE as the semantics of this state are unreliable.
	} else if (document.readyState === 'interactive' && !window.attachEvent &&
	    (!window.HTMLImports || window.HTMLImports.ready)) {
	  bootstrap();
	// When loading at other readyStates, wait for the appropriate DOM event to
	// bootstrap.
	} else {
	  var loadEvent = window.HTMLImports && !window.HTMLImports.ready ?
	      'HTMLImportsLoaded' : 'DOMContentLoaded';
	  window.addEventListener(loadEvent, bootstrap);
	}

	})(window.CustomElements);


/***/ },

/***/ 289:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	/*
	 * PLEASE NOTE: This file is duplicated within Polymer. Please keep it in sync!
	 * https://github.com/Polymer/polymer/blob/master/src/system/HTMLImports/base.js
	 */

	/*
		Create polyfill scope and feature detect native support.
	*/
	window.HTMLImports = window.HTMLImports || {flags:{}};

	(function(scope) {

	/**
		Basic setup and simple module executer. We collect modules and then execute
	  the code later, only if it's necessary for polyfilling.
	*/
	var IMPORT_LINK_TYPE = 'import';
	var useNative = Boolean(IMPORT_LINK_TYPE in document.createElement('link'));

	/**
	  Support `currentScript` on all browsers as `document._currentScript.`

	  NOTE: We cannot polyfill `document.currentScript` because it's not possible
	  both to override and maintain the ability to capture the native value.
	  Therefore we choose to expose `_currentScript` both when native imports
	  and the polyfill are in use.
	*/
	// NOTE: ShadowDOMPolyfill intrusion.
	var hasShadowDOMPolyfill = Boolean(window.ShadowDOMPolyfill);
	var wrap = function(node) {
	  return hasShadowDOMPolyfill ? window.ShadowDOMPolyfill.wrapIfNeeded(node) : node;
	};
	var rootDocument = wrap(document);

	var currentScriptDescriptor = {
	  get: function() {
	    var script = window.HTMLImports.currentScript || document.currentScript ||
	        // NOTE: only works when called in synchronously executing code.
	        // readyState should check if `loading` but IE10 is
	        // interactive when scripts run so we cheat.
	        (document.readyState !== 'complete' ?
	        document.scripts[document.scripts.length - 1] : null);
	    return wrap(script);
	  },
	  configurable: true
	};

	Object.defineProperty(document, '_currentScript', currentScriptDescriptor);
	Object.defineProperty(rootDocument, '_currentScript', currentScriptDescriptor);

	/**
	  Add support for the `HTMLImportsLoaded` event and the `HTMLImports.whenReady`
	  method. This api is necessary because unlike the native implementation,
	  script elements do not force imports to resolve. Instead, users should wrap
	  code in either an `HTMLImportsLoaded` handler or after load time in an
	  `HTMLImports.whenReady(callback)` call.

	  NOTE: This module also supports these apis under the native implementation.
	  Therefore, if this file is loaded, the same code can be used under both
	  the polyfill and native implementation.
	 */

	var isIE = /Trident/.test(navigator.userAgent);

	// call a callback when all HTMLImports in the document at call time
	// (or at least document ready) have loaded.
	// 1. ensure the document is in a ready state (has dom), then
	// 2. watch for loading of imports and call callback when done
	function whenReady(callback, doc) {
	  doc = doc || rootDocument;
	  // if document is loading, wait and try again
	  whenDocumentReady(function() {
	    watchImportsLoad(callback, doc);
	  }, doc);
	}

	// call the callback when the document is in a ready state (has dom)
	var requiredReadyState = isIE ? 'complete' : 'interactive';
	var READY_EVENT = 'readystatechange';
	function isDocumentReady(doc) {
	  return (doc.readyState === 'complete' ||
	      doc.readyState === requiredReadyState);
	}

	// call <callback> when we ensure the document is in a ready state
	function whenDocumentReady(callback, doc) {
	  if (!isDocumentReady(doc)) {
	    var checkReady = function() {
	      if (doc.readyState === 'complete' ||
	          doc.readyState === requiredReadyState) {
	        doc.removeEventListener(READY_EVENT, checkReady);
	        whenDocumentReady(callback, doc);
	      }
	    };
	    doc.addEventListener(READY_EVENT, checkReady);
	  } else if (callback) {
	    callback();
	  }
	}

	function markTargetLoaded(event) {
	  event.target.__loaded = true;
	}

	// call <callback> when we ensure all imports have loaded
	function watchImportsLoad(callback, doc) {
	  var imports = doc.querySelectorAll('link[rel=import]');
	  var parsedCount = 0, importCount = imports.length, newImports = [], errorImports = [];
	  function checkDone() {
	    if (parsedCount == importCount && callback) {
	      callback({
	        allImports: imports,
	        loadedImports: newImports,
	        errorImports: errorImports
	      });
	    }
	  }
	  function loadedImport(e) {
	    markTargetLoaded(e);
	    newImports.push(this);
	    parsedCount++;
	    checkDone();
	  }
	  function errorLoadingImport(e) {
	    errorImports.push(this);
	    parsedCount++;
	    checkDone();
	  }
	  if (importCount) {
	    for (var i=0, imp; i<importCount && (imp=imports[i]); i++) {
	      if (isImportLoaded(imp)) {
	        newImports.push(this);
	        parsedCount++;
	        checkDone();
	      } else {
	        imp.addEventListener('load', loadedImport);
	        imp.addEventListener('error', errorLoadingImport);
	      }
	    }
	  } else {
	    checkDone();
	  }
	}

	// NOTE: test for native imports loading is based on explicitly watching
	// all imports (see below).
	// However, we cannot rely on this entirely without watching the entire document
	// for import links. For perf reasons, currently only head is watched.
	// Instead, we fallback to checking if the import property is available
	// and the document is not itself loading.
	function isImportLoaded(link) {
	  return useNative ? link.__loaded ||
	      (link.import && link.import.readyState !== 'loading') :
	      link.__importParsed;
	}

	// TODO(sorvell): Workaround for
	// https://www.w3.org/Bugs/Public/show_bug.cgi?id=25007, should be removed when
	// this bug is addressed.
	// (1) Install a mutation observer to see when HTMLImports have loaded
	// (2) if this script is run during document load it will watch any existing
	// imports for loading.
	//
	// NOTE: The workaround has restricted functionality: (1) it's only compatible
	// with imports that are added to document.head since the mutation observer
	// watches only head for perf reasons, (2) it requires this script
	// to run before any imports have completed loading.
	if (useNative) {
	  new MutationObserver(function(mxns) {
	    for (var i=0, l=mxns.length, m; (i < l) && (m=mxns[i]); i++) {
	      if (m.addedNodes) {
	        handleImports(m.addedNodes);
	      }
	    }
	  }).observe(document.head, {childList: true});

	  function handleImports(nodes) {
	    for (var i=0, l=nodes.length, n; (i<l) && (n=nodes[i]); i++) {
	      if (isImport(n)) {
	        handleImport(n);
	      }
	    }
	  }

	  function isImport(element) {
	    return element.localName === 'link' && element.rel === 'import';
	  }

	  function handleImport(element) {
	    var loaded = element.import;
	    if (loaded) {
	      markTargetLoaded({target: element});
	    } else {
	      element.addEventListener('load', markTargetLoaded);
	      element.addEventListener('error', markTargetLoaded);
	    }
	  }

	  // make sure to catch any imports that are in the process of loading
	  // when this script is run.
	  (function() {
	    if (document.readyState === 'loading') {
	      var imports = document.querySelectorAll('link[rel=import]');
	      for (var i=0, l=imports.length, imp; (i<l) && (imp=imports[i]); i++) {
	        handleImport(imp);
	      }
	    }
	  })();

	}

	// Fire the 'HTMLImportsLoaded' event when imports in document at load time
	// have loaded. This event is required to simulate the script blocking
	// behavior of native imports. A main document script that needs to be sure
	// imports have loaded should wait for this event.
	whenReady(function(detail) {
	  window.HTMLImports.ready = true;
	  window.HTMLImports.readyTime = new Date().getTime();
	  var evt = rootDocument.createEvent("CustomEvent");
	  evt.initCustomEvent("HTMLImportsLoaded", true, true, detail);
	  rootDocument.dispatchEvent(evt);
	});

	// exports
	scope.IMPORT_LINK_TYPE = IMPORT_LINK_TYPE;
	scope.useNative = useNative;
	scope.rootDocument = rootDocument;
	scope.whenReady = whenReady;
	scope.isIE = isIE;

	})(window.HTMLImports);


/***/ },

/***/ 290:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	(function(scope) {

	// world's simplest module initializer
	var modules = [];
	var addModule = function(module) {
		modules.push(module);
	};

	var initializeModules = function() {
		modules.forEach(function(module) {
			module(scope);
		});
	};

	// exports
	scope.addModule = addModule;
	scope.initializeModules = initializeModules;

	})(window.HTMLImports);



/***/ },

/***/ 291:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	window.HTMLImports.addModule(function(scope) {

	var CSS_URL_REGEXP = /(url\()([^)]*)(\))/g;
	var CSS_IMPORT_REGEXP = /(@import[\s]+(?!url\())([^;]*)(;)/g;

	// path fixup: style elements in imports must be made relative to the main
	// document. We fixup url's in url() and @import.
	var path = {

	  resolveUrlsInStyle: function(style, linkUrl) {
	    var doc = style.ownerDocument;
	    var resolver = doc.createElement('a');
	    style.textContent = this.resolveUrlsInCssText(style.textContent, linkUrl, resolver);
	    return style;
	  },

	  resolveUrlsInCssText: function(cssText, linkUrl, urlObj) {
	    var r = this.replaceUrls(cssText, urlObj, linkUrl, CSS_URL_REGEXP);
	    r = this.replaceUrls(r, urlObj, linkUrl, CSS_IMPORT_REGEXP);
	    return r;
	  },

	  replaceUrls: function(text, urlObj, linkUrl, regexp) {
	    return text.replace(regexp, function(m, pre, url, post) {
	      var urlPath = url.replace(/["']/g, '');
	      if (linkUrl) {
	        urlPath = (new URL(urlPath, linkUrl)).href;
	      }
	      urlObj.href = urlPath;
	      urlPath = urlObj.href;
	      return pre + '\'' + urlPath + '\'' + post;
	    });
	  }

	};

	// exports
	scope.path = path;

	});


/***/ },

/***/ 292:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	window.HTMLImports.addModule(function(scope) {

	/*
	  xhr processor.
	*/
	var xhr = {
	  async: true,

	  ok: function(request) {
	    return (request.status >= 200 && request.status < 300)
	        || (request.status === 304)
	        || (request.status === 0);
	  },

	  load: function(url, next, nextContext) {
	    var request = new XMLHttpRequest();
	    if (scope.flags.debug || scope.flags.bust) {
	      url += '?' + Math.random();
	    }
	    request.open('GET', url, xhr.async);
	    request.addEventListener('readystatechange', function(e) {
	      if (request.readyState === 4) {
	        // Servers redirecting an import can add a Location header to help us
	        // polyfill correctly.
	        var redirectedUrl = null;
	        try {
	          var locationHeader = request.getResponseHeader("Location");
	          if (locationHeader) {
	            redirectedUrl = (locationHeader.substr( 0, 1 ) === "/")
	              ? location.origin + locationHeader  // Location is a relative path
	              : locationHeader;                   // Full path
	          }
	        } catch ( e ) {
	            console.error( e.message );
	        }
	        next.call(nextContext, !xhr.ok(request) && request,
	            request.response || request.responseText, redirectedUrl);
	      }
	    });
	    request.send();
	    return request;
	  },

	  loadDocument: function(url, next, nextContext) {
	    this.load(url, next, nextContext).responseType = 'document';
	  }

	};

	// exports
	scope.xhr = xhr;

	});


/***/ },

/***/ 293:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	window.HTMLImports.addModule(function(scope) {

	// imports
	var xhr = scope.xhr;
	var flags = scope.flags;

	// This loader supports a dynamic list of urls
	// and an oncomplete callback that is called when the loader is done.
	// NOTE: The polyfill currently does *not* need this dynamism or the
	// onComplete concept. Because of this, the loader could be simplified
	// quite a bit.
	var Loader = function(onLoad, onComplete) {
	  this.cache = {};
	  this.onload = onLoad;
	  this.oncomplete = onComplete;
	  this.inflight = 0;
	  this.pending = {};
	};

	Loader.prototype = {

	  addNodes: function(nodes) {
	    // number of transactions to complete
	    this.inflight += nodes.length;
	    // commence transactions
	    for (var i=0, l=nodes.length, n; (i<l) && (n=nodes[i]); i++) {
	      this.require(n);
	    }
	    // anything to do?
	    this.checkDone();
	  },

	  addNode: function(node) {
	    // number of transactions to complete
	    this.inflight++;
	    // commence transactions
	    this.require(node);
	    // anything to do?
	    this.checkDone();
	  },

	  require: function(elt) {
	    var url = elt.src || elt.href;
	    // ensure we have a standard url that can be used
	    // reliably for deduping.
	    // TODO(sjmiles): ad-hoc
	    elt.__nodeUrl = url;
	    // deduplication
	    if (!this.dedupe(url, elt)) {
	      // fetch this resource
	      this.fetch(url, elt);
	    }
	  },

	  dedupe: function(url, elt) {
	    if (this.pending[url]) {
	      // add to list of nodes waiting for inUrl
	      this.pending[url].push(elt);
	      // don't need fetch
	      return true;
	    }
	    var resource;
	    if (this.cache[url]) {
	      this.onload(url, elt, this.cache[url]);
	      // finished this transaction
	      this.tail();
	      // don't need fetch
	      return true;
	    }
	    // first node waiting for inUrl
	    this.pending[url] = [elt];
	    // need fetch (not a dupe)
	    return false;
	  },

	  fetch: function(url, elt) {
	    flags.load && console.log('fetch', url, elt);
	    if (!url) {
	      setTimeout(function() {
	        this.receive(url, elt, {error: 'href must be specified'}, null);
	      }.bind(this), 0);
	    } else if (url.match(/^data:/)) {
	      // Handle Data URI Scheme
	      var pieces = url.split(',');
	      var header = pieces[0];
	      var body = pieces[1];
	      if(header.indexOf(';base64') > -1) {
	        body = atob(body);
	      } else {
	        body = decodeURIComponent(body);
	      }
	      setTimeout(function() {
	          this.receive(url, elt, null, body);
	      }.bind(this), 0);
	    } else {
	      var receiveXhr = function(err, resource, redirectedUrl) {
	        this.receive(url, elt, err, resource, redirectedUrl);
	      }.bind(this);
	      xhr.load(url, receiveXhr);
	    }
	  },

	  receive: function(url, elt, err, resource, redirectedUrl) {
	    this.cache[url] = resource;
	    var $p = this.pending[url];
	    for (var i=0, l=$p.length, p; (i<l) && (p=$p[i]); i++) {
	      // If url was redirected, use the redirected location so paths are
	      // calculated relative to that.
	      this.onload(url, p, resource, err, redirectedUrl);
	      this.tail();
	    }
	    this.pending[url] = null;
	  },

	  tail: function() {
	    --this.inflight;
	    this.checkDone();
	  },

	  checkDone: function() {
	    if (!this.inflight) {
	      this.oncomplete();
	    }
	  }

	};

	// exports
	scope.Loader = Loader;

	});


/***/ },

/***/ 294:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	window.HTMLImports.addModule(function(scope) {

	/*
	  Use a mutation observer to call a callback for all added nodes.
	*/
	var Observer = function(addCallback) {
	  this.addCallback = addCallback;
	  this.mo = new MutationObserver(this.handler.bind(this));
	};

	Observer.prototype = {

	  // we track mutations for addedNodes, looking for imports
	  handler: function(mutations) {
	    for (var i=0, l=mutations.length, m; (i<l) && (m=mutations[i]); i++) {
	      if (m.type === 'childList' && m.addedNodes.length) {
	        this.addedNodes(m.addedNodes);
	      }
	    }
	  },

	  addedNodes: function(nodes) {
	    if (this.addCallback) {
	      this.addCallback(nodes);
	    }
	    for (var i=0, l=nodes.length, n, loading; (i<l) && (n=nodes[i]); i++) {
	      if (n.children && n.children.length) {
	        this.addedNodes(n.children);
	      }
	    }
	  },

	  observe: function(root) {
	    this.mo.observe(root, {childList: true, subtree: true});
	  }

	};

	// exports
	scope.Observer = Observer;

	});


/***/ },

/***/ 295:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	window.HTMLImports.addModule(function(scope) {

	// imports
	var path = scope.path;
	var rootDocument = scope.rootDocument;
	var flags = scope.flags;
	var isIE = scope.isIE;
	var IMPORT_LINK_TYPE = scope.IMPORT_LINK_TYPE;
	var IMPORT_SELECTOR = 'link[rel=' + IMPORT_LINK_TYPE + ']';

	// importParser
	// highlander object to manage parsing of imports
	// parses import related elements and ensures proper parse order
	// parse order is enforced by crawling the tree and monitoring which elements
	// have been parsed;
	// elements can be dynamically added to imports. These are maintained in a
	// separate queue and parsed after all other elements.
	var importParser = {

	  // parse selectors for main document elements
	  documentSelectors: IMPORT_SELECTOR,

	  // parse selectors for import document elements
	  importsSelectors: [
	    IMPORT_SELECTOR,
	    'link[rel=stylesheet]:not([type])',
	    'style:not([type])',
	    'script:not([type])',
	    'script[type="application/javascript"]',
	    'script[type="text/javascript"]'
	  ].join(','),

	  map: {
	    link: 'parseLink',
	    script: 'parseScript',
	    style: 'parseStyle'
	  },

	  dynamicElements: [],

	  // try to parse the next import in the tree
	  parseNext: function() {
	    var next = this.nextToParse();
	    if (next) {
	      this.parse(next);
	    }
	  },

	  parse: function(elt) {
	    if (this.isParsed(elt)) {
	      flags.parse && console.log('[%s] is already parsed', elt.localName);
	      return;
	    }
	    var fn = this[this.map[elt.localName]];
	    if (fn) {
	      this.markParsing(elt);
	      fn.call(this, elt);
	    }
	  },

	  // marks an element for dynamic parsing and attempts to parse the next element
	  parseDynamic: function(elt, quiet) {
	    this.dynamicElements.push(elt);
	    if (!quiet) {
	      this.parseNext();
	    }
	  },

	  // only 1 element may be parsed at a time; parsing is async so each
	  // parsing implementation must inform the system that parsing is complete
	  // via markParsingComplete.
	  // To prompt the system to parse the next element, parseNext should then be
	  // called.
	  // Note, parseNext used to be included at the end of markParsingComplete, but
	  // we must not do this so that, for example, we can (1) mark parsing complete
	  // then (2) fire an import load event, and then (3) parse the next resource.
	  markParsing: function(elt) {
	    flags.parse && console.log('parsing', elt);
	    this.parsingElement = elt;
	  },

	  markParsingComplete: function(elt) {
	    elt.__importParsed = true;
	    this.markDynamicParsingComplete(elt);
	    if (elt.__importElement) {
	      elt.__importElement.__importParsed = true;
	      this.markDynamicParsingComplete(elt.__importElement);
	    }
	    this.parsingElement = null;
	    flags.parse && console.log('completed', elt);
	  },

	  markDynamicParsingComplete: function(elt) {
	    var i = this.dynamicElements.indexOf(elt);
	    if (i >= 0) {
	      this.dynamicElements.splice(i, 1);
	    }
	  },

	  parseImport: function(elt) {
	    elt.import = elt.__doc;
	    if (window.HTMLImports.__importsParsingHook) {
	      window.HTMLImports.__importsParsingHook(elt);
	    }
	    if (elt.import) {
	      elt.import.__importParsed = true;
	    }
	    this.markParsingComplete(elt);
	    // fire load event
	    if (elt.__resource && !elt.__error) {
	      elt.dispatchEvent(new CustomEvent('load', {bubbles: false}));
	    } else {
	      elt.dispatchEvent(new CustomEvent('error', {bubbles: false}));
	    }
	    // TODO(sorvell): workaround for Safari addEventListener not working
	    // for elements not in the main document.
	    if (elt.__pending) {
	      var fn;
	      while (elt.__pending.length) {
	        fn = elt.__pending.shift();
	        if (fn) {
	          fn({target: elt});
	        }
	      }
	    }
	    this.parseNext();
	  },

	  parseLink: function(linkElt) {
	    if (nodeIsImport(linkElt)) {
	      this.parseImport(linkElt);
	    } else {
	      // make href absolute
	      linkElt.href = linkElt.href;
	      this.parseGeneric(linkElt);
	    }
	  },

	  parseStyle: function(elt) {
	    // TODO(sorvell): style element load event can just not fire so clone styles
	    var src = elt;
	    elt = cloneStyle(elt);
	    src.__appliedElement = elt;
	    elt.__importElement = src;
	    this.parseGeneric(elt);
	  },

	  parseGeneric: function(elt) {
	    this.trackElement(elt);
	    this.addElementToDocument(elt);
	  },

	  rootImportForElement: function(elt) {
	    var n = elt;
	    while (n.ownerDocument.__importLink) {
	      n = n.ownerDocument.__importLink;
	    }
	    return n;
	  },

	  addElementToDocument: function(elt) {
	    var port = this.rootImportForElement(elt.__importElement || elt);
	    port.parentNode.insertBefore(elt, port);
	  },

	  // tracks when a loadable element has loaded
	  trackElement: function(elt, callback) {
	    var self = this;
	    var done = function(e) {
	      // make sure we don't get multiple load/error signals (FF seems to do
	      // this sometimes when <style> elments change)
	      elt.removeEventListener('load', done);
	      elt.removeEventListener('error', done);
	      if (callback) {
	        callback(e);
	      }
	      self.markParsingComplete(elt);
	      self.parseNext();
	    };
	    elt.addEventListener('load', done);
	    elt.addEventListener('error', done);

	    // NOTE: IE does not fire "load" event for styles that have already loaded
	    // This is in violation of the spec, so we try our hardest to work around it
	    if (isIE && elt.localName === 'style') {
	      var fakeLoad = false;
	      // If there's not @import in the textContent, assume it has loaded
	      if (elt.textContent.indexOf('@import') == -1) {
	        fakeLoad = true;
	      // if we have a sheet, we have been parsed
	      } else if (elt.sheet) {
	        fakeLoad = true;
	        var csr = elt.sheet.cssRules;
	        var len = csr ? csr.length : 0;
	        // search the rules for @import's
	        for (var i = 0, r; (i < len) && (r = csr[i]); i++) {
	          if (r.type === CSSRule.IMPORT_RULE) {
	            // if every @import has resolved, fake the load
	            fakeLoad = fakeLoad && Boolean(r.styleSheet);
	          }
	        }
	      }
	      // dispatch a fake load event and continue parsing
	      if (fakeLoad) {
	        // Fire async, to prevent reentrancy
	        setTimeout(function() {
	          elt.dispatchEvent(new CustomEvent('load', {bubbles: false}));
	        });
	      }
	    }
	  },

	  // NOTE: execute scripts by injecting them and watching for the load/error
	  // event. Inline scripts are handled via dataURL's because browsers tend to
	  // provide correct parsing errors in this case. If this has any compatibility
	  // issues, we can switch to injecting the inline script with textContent.
	  parseScript: function(scriptElt) {
	    var script = document.createElement('script');
	    script.__importElement = scriptElt;
	    script.src = scriptElt.src ? scriptElt.src :
	        generateScriptDataUrl(scriptElt);
	    // keep track of executing script to help polyfill `document.currentScript`
	    scope.currentScript = scriptElt;
	    this.trackElement(script, function(e) {
	      if (script.parentNode) {
	        script.parentNode.removeChild(script);
	      }
	      scope.currentScript = null;
	    });
	    this.addElementToDocument(script);
	  },

	  // determine the next element in the tree which should be parsed
	  // crawl the document tree to find the next unparsed element
	  // then process any dynamically added elements (these should process in 'add'
	  // order.
	  nextToParse: function() {
	    this._mayParse = [];
	    return !this.parsingElement && (this.nextToParseInDoc(rootDocument) ||
	        this.nextToParseDynamic());
	  },

	  nextToParseInDoc: function(doc, link) {
	    // use `marParse` list to avoid looping into the same document again
	    // since it could cause an iloop.
	    if (doc && this._mayParse.indexOf(doc) < 0) {
	      this._mayParse.push(doc);
	      var nodes = doc.querySelectorAll(this.parseSelectorsForNode(doc));
	      for (var i=0, l=nodes.length, n; (i<l) && (n=nodes[i]); i++) {
	        if (!this.isParsed(n)) {
	          if (this.hasResource(n)) {
	            return nodeIsImport(n) ? this.nextToParseInDoc(n.__doc, n) : n;
	          } else {
	            return;
	          }
	        }
	      }
	    }
	    // all nodes have been parsed, ready to parse import, if any
	    return link;
	  },

	  // note dynamically added elements are stored in a separate queue
	  nextToParseDynamic: function() {
	    return this.dynamicElements[0];
	  },

	  // return the set of parse selectors relevant for this node.
	  parseSelectorsForNode: function(node) {
	    var doc = node.ownerDocument || node;
	    return doc === rootDocument ? this.documentSelectors :
	        this.importsSelectors;
	  },

	  isParsed: function(node) {
	    return node.__importParsed;
	  },

	  needsDynamicParsing: function(elt) {
	    return (this.dynamicElements.indexOf(elt) >= 0);
	  },

	  hasResource: function(node) {
	    if (nodeIsImport(node) && (node.__doc === undefined)) {
	      return false;
	    }
	    return true;
	  }

	};

	function nodeIsImport(elt) {
	  return (elt.localName === 'link') && (elt.rel === IMPORT_LINK_TYPE);
	}

	function generateScriptDataUrl(script) {
	  var scriptContent = generateScriptContent(script);
	  return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(scriptContent);
	}

	function generateScriptContent(script) {
	  return script.textContent + generateSourceMapHint(script);
	}

	// calculate source map hint
	function generateSourceMapHint(script) {
	  var owner = script.ownerDocument;
	  owner.__importedScripts = owner.__importedScripts || 0;
	  var moniker = script.ownerDocument.baseURI;
	  var num = owner.__importedScripts ? '-' + owner.__importedScripts : '';
	  owner.__importedScripts++;
	  return '\n//# sourceURL=' + moniker + num + '.js\n';
	}

	// style/stylesheet handling

	// clone style with proper path resolution for main document
	// NOTE: styles are the only elements that require direct path fixup.
	function cloneStyle(style) {
	  var clone = style.ownerDocument.createElement('style');
	  clone.textContent = style.textContent;
	  path.resolveUrlsInStyle(clone);
	  return clone;
	}

	// exports
	scope.parser = importParser;
	scope.IMPORT_SELECTOR = IMPORT_SELECTOR;

	});


/***/ },

/***/ 296:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	window.HTMLImports.addModule(function(scope) {

	// imports
	var flags = scope.flags;
	var IMPORT_LINK_TYPE = scope.IMPORT_LINK_TYPE;
	var IMPORT_SELECTOR = scope.IMPORT_SELECTOR;
	var rootDocument = scope.rootDocument;
	var Loader = scope.Loader;
	var Observer = scope.Observer;
	var parser = scope.parser;

	// importer
	// highlander object to manage loading of imports
	// for any document, importer:
	// - loads any linked import documents (with deduping)
	// - whenever an import is loaded, prompts the parser to try to parse
	// - observes imported documents for new elements (these are handled via the
	// dynamic importer)
	var importer = {

	  documents: {},

	  // nodes to load in the mian document
	  documentPreloadSelectors: IMPORT_SELECTOR,

	  // nodes to load in imports
	  importsPreloadSelectors: [
	    IMPORT_SELECTOR
	  ].join(','),

	  loadNode: function(node) {
	    importLoader.addNode(node);
	  },

	  // load all loadable elements within the parent element
	  loadSubtree: function(parent) {
	    var nodes = this.marshalNodes(parent);
	    // add these nodes to loader's queue
	    importLoader.addNodes(nodes);
	  },

	  marshalNodes: function(parent) {
	    // all preloadable nodes in inDocument
	    return parent.querySelectorAll(this.loadSelectorsForNode(parent));
	  },

	  // find the proper set of load selectors for a given node
	  loadSelectorsForNode: function(node) {
	    var doc = node.ownerDocument || node;
	    return doc === rootDocument ? this.documentPreloadSelectors :
	        this.importsPreloadSelectors;
	  },

	  loaded: function(url, elt, resource, err, redirectedUrl) {
	    flags.load && console.log('loaded', url, elt);
	    // store generic resource
	    // TODO(sorvell): fails for nodes inside <template>.content
	    // see https://code.google.com/p/chromium/issues/detail?id=249381.
	    elt.__resource = resource;
	    elt.__error = err;
	    if (isImportLink(elt)) {
	      var doc = this.documents[url];
	      // if we've never seen a document at this url
	      if (doc === undefined) {
	        // generate an HTMLDocument from data
	        doc = err ? null : makeDocument(resource, redirectedUrl || url);
	        if (doc) {
	          doc.__importLink = elt;
	          // note, we cannot use MO to detect parsed nodes because
	          // SD polyfill does not report these as mutations.
	          this.bootDocument(doc);
	        }
	        // cache document
	        this.documents[url] = doc;
	      }
	      // don't store import record until we're actually loaded
	      // store document resource
	      elt.__doc = doc;
	    }
	    parser.parseNext();
	  },

	  bootDocument: function(doc) {
	    this.loadSubtree(doc);
	    // observe documents for new elements being added
	    this.observer.observe(doc);
	    parser.parseNext();
	  },

	  loadedAll: function() {
	    parser.parseNext();
	  }

	};

	// loader singleton to handle loading imports
	var importLoader = new Loader(importer.loaded.bind(importer),
	    importer.loadedAll.bind(importer));

	// observer singleton to handle observing elements in imports
	// NOTE: the observer has a node added callback and this is set
	// by the dynamic importer module.
	importer.observer = new Observer();

	function isImportLink(elt) {
	  return isLinkRel(elt, IMPORT_LINK_TYPE);
	}

	function isLinkRel(elt, rel) {
	  return elt.localName === 'link' && elt.getAttribute('rel') === rel;
	}

	function hasBaseURIAccessor(doc) {
	  return !! Object.getOwnPropertyDescriptor(doc, 'baseURI');
	}

	function makeDocument(resource, url) {
	  // create a new HTML document
	  var doc = document.implementation.createHTMLDocument(IMPORT_LINK_TYPE);
	  // cache the new document's source url
	  doc._URL = url;
	  // establish a relative path via <base>
	  var base = doc.createElement('base');
	  base.setAttribute('href', url);
	  // add baseURI support to browsers (IE) that lack it.
	  if (!doc.baseURI && !hasBaseURIAccessor(doc)) {
	    // Use defineProperty since Safari throws an exception when using assignment.
	    Object.defineProperty(doc, 'baseURI', {value:url});
	  }
	  // ensure UTF-8 charset
	  var meta = doc.createElement('meta');
	  meta.setAttribute('charset', 'utf-8');

	  doc.head.appendChild(meta);
	  doc.head.appendChild(base);
	  // install html
	  doc.body.innerHTML = resource;
	  // TODO(sorvell): ideally this code is not aware of Template polyfill,
	  // but for now the polyfill needs help to bootstrap these templates
	  if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {
	    HTMLTemplateElement.bootstrap(doc);
	  }
	  return doc;
	}

	// Polyfill document.baseURI for browsers without it.
	if (!document.baseURI) {
	  var baseURIDescriptor = {
	    get: function() {
	      var base = document.querySelector('base');
	      return base ? base.href : window.location.href;
	    },
	    configurable: true
	  };

	  Object.defineProperty(document, 'baseURI', baseURIDescriptor);
	  Object.defineProperty(rootDocument, 'baseURI', baseURIDescriptor);
	}

	// exports
	scope.importer = importer;
	scope.importLoader = importLoader;

	});


/***/ },

/***/ 297:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	window.HTMLImports.addModule(function(scope) {

	// imports
	var parser = scope.parser;
	var importer = scope.importer;

	// dynamic
	// highlander object to manage elements dynamically added to imports
	// for any observed document, dynamic:
	// - tells the importer to load any imports that are added.
	// - tells the parser to parse any added elements that need to be parsed.
	// dynamic importer)
	var dynamic = {
	  // process (load/parse) any nodes added to imported documents.
	  added: function(nodes) {
	    var owner, parsed, loading;
	    for (var i=0, l=nodes.length, n; (i<l) && (n=nodes[i]); i++) {
	      if (!owner) {
	        owner = n.ownerDocument;
	        parsed = parser.isParsed(owner);
	      }
	      // note: the act of loading kicks the parser, so we use parseDynamic's
	      // 2nd argument to control if this added node needs to kick the parser.
	      loading = this.shouldLoadNode(n);
	      if (loading) {
	        importer.loadNode(n);
	      }
	      if (this.shouldParseNode(n) && parsed) {
	        parser.parseDynamic(n, loading);
	      }
	    }
	  },

	  shouldLoadNode: function(node) {
	    return (node.nodeType === 1) && matches.call(node,
	        importer.loadSelectorsForNode(node));
	  },

	  shouldParseNode: function(node) {
	    return (node.nodeType === 1) && matches.call(node,
	        parser.parseSelectorsForNode(node));
	  }

	};

	// let the dynamic element helper tie into the import observer.
	importer.observer.addCallback = dynamic.added.bind(dynamic);

	// x-plat matches
	var matches = HTMLElement.prototype.matches ||
	    HTMLElement.prototype.matchesSelector ||
	    HTMLElement.prototype.webkitMatchesSelector ||
	    HTMLElement.prototype.mozMatchesSelector ||
	    HTMLElement.prototype.msMatchesSelector;

	});


/***/ },

/***/ 298:
/***/ function(module, exports) {

	/**
	 * @license
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	(function(scope){

	// imports
	var initializeModules = scope.initializeModules;
	var isIE = scope.isIE;

	/*
	NOTE: Even when native HTMLImports exists, the following api is available by
	loading the polyfill. This provides api compatibility where the polyfill
	cannot be "correct":

	  * `document._currentScript`
	  * `HTMLImportsLoaded` event
	  * `HTMLImports.whenReady(callback)
	*/
	if (scope.useNative) {
	  return;
	}

	// Initialize polyfill modules. Note, polyfill modules are loaded but not
	// executed; this is a convenient way to control which modules run when
	// the polyfill is required and allows the polyfill to load even when it's
	// not needed.
	initializeModules();

	// imports
	var rootDocument = scope.rootDocument;

	/*
	  Bootstrap the imports machine.
	*/
	function bootstrap() {
	  window.HTMLImports.importer.bootDocument(rootDocument);
	}

	// TODO(sorvell): SD polyfill does *not* generate mutations for nodes added
	// by the parser. For this reason, we must wait until the dom exists to
	// bootstrap.
	if (document.readyState === 'complete' ||
	    (document.readyState === 'interactive' && !window.attachEvent)) {
	  bootstrap();
	} else {
	  document.addEventListener('DOMContentLoaded', bootstrap);
	}

	})(window.HTMLImports);


/***/ },

/***/ 299:
/***/ function(module, exports) {

	var HANDJS = HANDJS || {};

	(function () {
	    // If the user agent already supports Pointer Events, do nothing
	    if (window.PointerEvent)
	        return;

	    // Polyfilling indexOf for old browsers
	    if (!Array.prototype.indexOf) {
	        Array.prototype.indexOf = function (searchElement) {
	            var t = Object(this);
	            var len = t.length >>> 0;
	            if (len === 0) {
	                return -1;
	            }
	            var n = 0;
	            if (arguments.length > 0) {
	                n = Number(arguments[1]);
	                if (n !== n) { // shortcut for verifying if it's NaN
	                    n = 0;
	                } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
	                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
	                }
	            }
	            if (n >= len) {
	                return -1;
	            }
	            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
	            for (; k < len; k++) {
	                if (k in t && t[k] === searchElement) {
	                    return k;
	                }
	            }
	            return -1;
	        };
	    }
	    //Polyfilling forEach for old browsers
	    if (!Array.prototype.forEach) {
	        Array.prototype.forEach = function (method, thisArg) {
	            if (!this || !(method instanceof Function))
	                throw new TypeError();
	            for (var i = 0; i < this.length; i++)
	                method.call(thisArg, this[i], i, this);
	        };
	    }
		// Polyfilling trim for old browsers
		if (!String.prototype.trim) {
			String.prototype.trim = function () {
				return this.replace(/^\s+|\s+$/, '');
			};
		}

	    // Installing Hand.js
	    var supportedEventsNames = ["pointerdown", "pointerup", "pointermove", "pointerover", "pointerout", "pointercancel", "pointerenter", "pointerleave"];
	    var upperCaseEventsNames = ["PointerDown", "PointerUp", "PointerMove", "PointerOver", "PointerOut", "PointerCancel", "PointerEnter", "PointerLeave"];

	    var POINTER_TYPE_TOUCH = "touch";
	    var POINTER_TYPE_PEN = "pen";
	    var POINTER_TYPE_MOUSE = "mouse";

	    var previousTargets = {};

	    var checkPreventDefault = function (node) {
	        while (node && !node.handjs_forcePreventDefault) {
	            node = node.parentNode;
	        }
	        return !!node || window.handjs_forcePreventDefault;
	    };

	    // Touch events
	    var generateTouchClonedEvent = function (sourceEvent, newName, canBubble, target, relatedTarget) {
	        // Considering touch events are almost like super mouse events
	        var evObj;
	        
	        if (document.createEvent) {
	            evObj = document.createEvent('MouseEvents');
	            evObj.initMouseEvent(newName, canBubble, true, window, 1, sourceEvent.screenX, sourceEvent.screenY,
	                sourceEvent.clientX, sourceEvent.clientY, sourceEvent.ctrlKey, sourceEvent.altKey,
	                sourceEvent.shiftKey, sourceEvent.metaKey, sourceEvent.button, relatedTarget || sourceEvent.relatedTarget);
	        }
	        else {
	            evObj = document.createEventObject();
	            evObj.screenX = sourceEvent.screenX;
	            evObj.screenY = sourceEvent.screenY;
	            evObj.clientX = sourceEvent.clientX;
	            evObj.clientY = sourceEvent.clientY;
	            evObj.ctrlKey = sourceEvent.ctrlKey;
	            evObj.altKey = sourceEvent.altKey;
	            evObj.shiftKey = sourceEvent.shiftKey;
	            evObj.metaKey = sourceEvent.metaKey;
	            evObj.button = sourceEvent.button;
	            evObj.relatedTarget = relatedTarget || sourceEvent.relatedTarget;
	        }
	        // offsets
	        if (evObj.offsetX === undefined) {
	            if (sourceEvent.offsetX !== undefined) {

	                // For Opera which creates readonly properties
	                if (Object && Object.defineProperty !== undefined) {
	                    Object.defineProperty(evObj, "offsetX", {
	                        writable: true
	                    });
	                    Object.defineProperty(evObj, "offsetY", {
	                        writable: true
	                    });
	                }

	                evObj.offsetX = sourceEvent.offsetX;
	                evObj.offsetY = sourceEvent.offsetY;
	            } else if (Object && Object.defineProperty !== undefined) {
	                Object.defineProperty(evObj, "offsetX", {
	                    get: function () {
	                        if (this.currentTarget && this.currentTarget.offsetLeft) {
	                            return sourceEvent.clientX - this.currentTarget.offsetLeft;
	                        }
	                        return sourceEvent.clientX;
	                    }
	                });
	                Object.defineProperty(evObj, "offsetY", {
	                    get: function () {
	                        if (this.currentTarget && this.currentTarget.offsetTop) {
	                            return sourceEvent.clientY - this.currentTarget.offsetTop;
	                        }
	                        return sourceEvent.clientY;
	                    }
	                });
	            }
	            else if (sourceEvent.layerX !== undefined) {
	                evObj.offsetX = sourceEvent.layerX - sourceEvent.currentTarget.offsetLeft;
	                evObj.offsetY = sourceEvent.layerY - sourceEvent.currentTarget.offsetTop;
	            }
	        }

	        // adding missing properties

	        if (sourceEvent.isPrimary !== undefined)
	            evObj.isPrimary = sourceEvent.isPrimary;
	        else
	            evObj.isPrimary = true;

	        if (sourceEvent.pressure)
	            evObj.pressure = sourceEvent.pressure;
	        else {
	            var button = 0;

	            if (sourceEvent.which !== undefined)
	                button = sourceEvent.which;
	            else if (sourceEvent.button !== undefined) {
	                button = sourceEvent.button;
	            }
	            evObj.pressure = (button === 0) ? 0 : 0.5;
	        }


	        if (sourceEvent.rotation)
	            evObj.rotation = sourceEvent.rotation;
	        else
	            evObj.rotation = 0;

	        // Timestamp
	        if (sourceEvent.hwTimestamp)
	            evObj.hwTimestamp = sourceEvent.hwTimestamp;
	        else
	            evObj.hwTimestamp = 0;

	        // Tilts
	        if (sourceEvent.tiltX)
	            evObj.tiltX = sourceEvent.tiltX;
	        else
	            evObj.tiltX = 0;

	        if (sourceEvent.tiltY)
	            evObj.tiltY = sourceEvent.tiltY;
	        else
	            evObj.tiltY = 0;

	        // Width and Height
	        if (sourceEvent.height)
	            evObj.height = sourceEvent.height;
	        else
	            evObj.height = 0;

	        if (sourceEvent.width)
	            evObj.width = sourceEvent.width;
	        else
	            evObj.width = 0;

	        // preventDefault
	        evObj.preventDefault = function () {
	            if (sourceEvent.preventDefault !== undefined)
	                sourceEvent.preventDefault();
	        };

	        // stopPropagation
	        if (evObj.stopPropagation !== undefined) {
	            var current = evObj.stopPropagation;
	            evObj.stopPropagation = function () {
	                if (sourceEvent.stopPropagation !== undefined)
	                    sourceEvent.stopPropagation();
	                current.call(this);
	            };
	        }

	        // Pointer values
	        evObj.pointerId = sourceEvent.pointerId;
	        evObj.pointerType = sourceEvent.pointerType;

	        switch (evObj.pointerType) {// Old spec version check
	            case 2:
	                evObj.pointerType = POINTER_TYPE_TOUCH;
	                break;
	            case 3:
	                evObj.pointerType = POINTER_TYPE_PEN;
	                break;
	            case 4:
	                evObj.pointerType = POINTER_TYPE_MOUSE;
	                break;
	        }

	        // Fire event
	        if (target)
	            target.dispatchEvent(evObj);
	        else if (sourceEvent.target) {
	            sourceEvent.target.dispatchEvent(evObj);
	        } else {
	            sourceEvent.srcElement.fireEvent("on" + getMouseEquivalentEventName(newName), evObj); // We must fallback to mouse event for very old browsers
	        }
	    };

	    var generateMouseProxy = function (evt, eventName, canBubble, target, relatedTarget) {
	        evt.pointerId = 1;
	        evt.pointerType = POINTER_TYPE_MOUSE;
	        generateTouchClonedEvent(evt, eventName, canBubble, target, relatedTarget);
	    };

	    var generateTouchEventProxy = function (name, touchPoint, target, eventObject, canBubble, relatedTarget) {
	        var touchPointId = touchPoint.identifier + 2; // Just to not override mouse id

	        touchPoint.pointerId = touchPointId;
	        touchPoint.pointerType = POINTER_TYPE_TOUCH;
	        touchPoint.currentTarget = target;

	        if (eventObject.preventDefault !== undefined) {
	            touchPoint.preventDefault = function () {
	                eventObject.preventDefault();
	            };
	        }

	        generateTouchClonedEvent(touchPoint, name, canBubble, target, relatedTarget);
	    };

	    var checkEventRegistration = function (node, eventName) {
	        return node.__handjsGlobalRegisteredEvents && node.__handjsGlobalRegisteredEvents[eventName];
	    };
	    var findEventRegisteredNode = function (node, eventName) {
	        while (node && !checkEventRegistration(node, eventName))
	            node = node.parentNode;
	        if (node)
	            return node;
	        else if (checkEventRegistration(window, eventName))
	            return window;
	    };

	    var generateTouchEventProxyIfRegistered = function (eventName, touchPoint, target, eventObject, canBubble, relatedTarget) { // Check if user registered this event
	        if (findEventRegisteredNode(target, eventName)) {
	            generateTouchEventProxy(eventName, touchPoint, target, eventObject, canBubble, relatedTarget);
	        }
	    };

	    //var handleOtherEvent = function (eventObject, name, useLocalTarget, checkRegistration) {
	    //    if (eventObject.preventManipulation)
	    //        eventObject.preventManipulation();

	    //    for (var i = 0; i < eventObject.changedTouches.length; ++i) {
	    //        var touchPoint = eventObject.changedTouches[i];

	    //        if (useLocalTarget) {
	    //            previousTargets[touchPoint.identifier] = touchPoint.target;
	    //        }

	    //        if (checkRegistration) {
	    //            generateTouchEventProxyIfRegistered(name, touchPoint, previousTargets[touchPoint.identifier], eventObject, true);
	    //        } else {
	    //            generateTouchEventProxy(name, touchPoint, previousTargets[touchPoint.identifier], eventObject, true);
	    //        }
	    //    }
	    //};

	    var getMouseEquivalentEventName = function (eventName) {
	        return eventName.toLowerCase().replace("pointer", "mouse");
	    };

	    var getPrefixEventName = function (prefix, eventName) {
	        var upperCaseIndex = supportedEventsNames.indexOf(eventName);
	        var newEventName = prefix + upperCaseEventsNames[upperCaseIndex];

	        return newEventName;
	    };

	    var registerOrUnregisterEvent = function (item, name, func, enable) {
	        if (item.__handjsRegisteredEvents === undefined) {
	            item.__handjsRegisteredEvents = [];
	        }

	        if (enable) {
	            if (item.__handjsRegisteredEvents[name] !== undefined) {
	                item.__handjsRegisteredEvents[name]++;
	                return;
	            }

	            item.__handjsRegisteredEvents[name] = 1;
	            item.addEventListener(name, func, false);
	        } else {

	            if (item.__handjsRegisteredEvents.indexOf(name) !== -1) {
	                item.__handjsRegisteredEvents[name]--;

	                if (item.__handjsRegisteredEvents[name] !== 0) {
	                    return;
	                }
	            }
	            item.removeEventListener(name, func);
	            item.__handjsRegisteredEvents[name] = 0;
	        }
	    };

	    var setTouchAware = function (item, eventName, enable) {
	        // Leaving tokens
	        if (!item.__handjsGlobalRegisteredEvents) {
	            item.__handjsGlobalRegisteredEvents = [];
	        }
	        if (enable) {
	            if (item.__handjsGlobalRegisteredEvents[eventName] !== undefined) {
	                item.__handjsGlobalRegisteredEvents[eventName]++;
	                return;
	            }
	            item.__handjsGlobalRegisteredEvents[eventName] = 1;
	        } else {
	            if (item.__handjsGlobalRegisteredEvents[eventName] !== undefined) {
	                item.__handjsGlobalRegisteredEvents[eventName]--;
	                if (item.__handjsGlobalRegisteredEvents[eventName] < 0) {
	                    item.__handjsGlobalRegisteredEvents[eventName] = 0;
	                }
	            }
	        }

	        var nameGenerator;
	        var eventGenerator;
	        if (window.MSPointerEvent) {
	            nameGenerator = function (name) { return getPrefixEventName("MS", name); };
	            eventGenerator = generateTouchClonedEvent;
	        }
	        else {
	            nameGenerator = getMouseEquivalentEventName;
	            eventGenerator = generateMouseProxy;
	        }
	        switch (eventName) {
	            case "pointerenter":
	            case "pointerleave":
	                var targetEvent = nameGenerator(eventName);
	                if (item['on' + targetEvent.toLowerCase()] !== undefined) {
	                    registerOrUnregisterEvent(item, targetEvent, function (evt) { eventGenerator(evt, eventName); }, enable);
	                }
	                break;
	        }
	    };

	    // Intercept addEventListener calls by changing the prototype
	    var interceptAddEventListener = function (root) {
	        var current = root.prototype ? root.prototype.addEventListener : root.addEventListener;

	        var customAddEventListener = function (name, func, capture) {
	            // Branch when a PointerXXX is used
	            if (supportedEventsNames.indexOf(name) !== -1) {
	                setTouchAware(this, name, true);
	            }

	            if (current === undefined) {
	                this.attachEvent("on" + getMouseEquivalentEventName(name), func);
	            } else {
	                current.call(this, name, func, capture);
	            }
	        };

	        if (root.prototype) {
	            root.prototype.addEventListener = customAddEventListener;
	        } else {
	            root.addEventListener = customAddEventListener;
	        }
	    };

	    // Intercept removeEventListener calls by changing the prototype
	    var interceptRemoveEventListener = function (root) {
	        var current = root.prototype ? root.prototype.removeEventListener : root.removeEventListener;

	        var customRemoveEventListener = function (name, func, capture) {
	            // Release when a PointerXXX is used
	            if (supportedEventsNames.indexOf(name) !== -1) {
	                setTouchAware(this, name, false);
	            }

	            if (current === undefined) {
	                this.detachEvent(getMouseEquivalentEventName(name), func);
	            } else {
	                current.call(this, name, func, capture);
	            }
	        };
	        if (root.prototype) {
	            root.prototype.removeEventListener = customRemoveEventListener;
	        } else {
	            root.removeEventListener = customRemoveEventListener;
	        }
	    };

	    // Hooks
	    interceptAddEventListener(window);
	    interceptAddEventListener(window.HTMLElement || window.Element);
	    interceptAddEventListener(document);
	    if (!navigator.isCocoonJS){
	        interceptAddEventListener(HTMLBodyElement);
	        interceptAddEventListener(HTMLDivElement);
	        interceptAddEventListener(HTMLImageElement);
	        interceptAddEventListener(HTMLUListElement);
	        interceptAddEventListener(HTMLAnchorElement);
	        interceptAddEventListener(HTMLLIElement);
	        interceptAddEventListener(HTMLTableElement);
	        if (window.HTMLSpanElement) {
	            interceptAddEventListener(HTMLSpanElement);
	        }
	    }
	    if (window.HTMLCanvasElement) {
	        interceptAddEventListener(HTMLCanvasElement);
	    }
	    if (!navigator.isCocoonJS && window.SVGElement) {
	        interceptAddEventListener(SVGElement);
	    }

	    interceptRemoveEventListener(window);
	    interceptRemoveEventListener(window.HTMLElement || window.Element);
	    interceptRemoveEventListener(document);
	    if (!navigator.isCocoonJS){
	        interceptRemoveEventListener(HTMLBodyElement);
	        interceptRemoveEventListener(HTMLDivElement);
	        interceptRemoveEventListener(HTMLImageElement);
	        interceptRemoveEventListener(HTMLUListElement);
	        interceptRemoveEventListener(HTMLAnchorElement);
	        interceptRemoveEventListener(HTMLLIElement);
	        interceptRemoveEventListener(HTMLTableElement);
	        if (window.HTMLSpanElement) {
	            interceptRemoveEventListener(HTMLSpanElement);
	        }
	    }
	    if (window.HTMLCanvasElement) {
	        interceptRemoveEventListener(HTMLCanvasElement);
	    }
	    if (!navigator.isCocoonJS && window.SVGElement) {
	        interceptRemoveEventListener(SVGElement);
	    }

	    // Prevent mouse event from being dispatched after Touch Events action
	    var touching = false;
	    var touchTimer = -1;

	    function setTouchTimer() {
	        touching = true;
	        clearTimeout(touchTimer);
	        touchTimer = setTimeout(function () {
	            touching = false;
	        }, 700);
	        // 1. Mobile browsers dispatch mouse events 300ms after touchend
	        // 2. Chrome for Android dispatch mousedown for long-touch about 650ms
	        // Result: Blocking Mouse Events for 700ms.
	    }

	    function getFirstCommonNode(x, y) {
	        while (x) {
	            if (x.contains(y))
	                return x;
	            x = x.parentNode;
	        }
	        return null;
	    }

	    //generateProxy receives a node to dispatch the event
	    function dispatchPointerEnter(currentTarget, relatedTarget, generateProxy) {
	        var commonParent = getFirstCommonNode(currentTarget, relatedTarget);
	        var node = currentTarget;
	        var nodelist = [];
	        while (node && node !== commonParent) {//target range: this to the direct child of parent relatedTarget
	            if (checkEventRegistration(node, "pointerenter")) //check if any parent node has pointerenter
	                nodelist.push(node);
	            node = node.parentNode;
	        }
	        while (nodelist.length > 0)
	            generateProxy(nodelist.pop());
	    }

	    //generateProxy receives a node to dispatch the event
	    function dispatchPointerLeave(currentTarget, relatedTarget, generateProxy) {
	        var commonParent = getFirstCommonNode(currentTarget, relatedTarget);
	        var node = currentTarget;
	        while (node && node !== commonParent) {//target range: this to the direct child of parent relatedTarget
	            if (checkEventRegistration(node, "pointerleave"))//check if any parent node has pointerleave
	                generateProxy(node);
	            node = node.parentNode;
	        }
	    }
	    
	    // Handling events on window to prevent unwanted super-bubbling
	    // All mouse events are affected by touch fallback
	    function applySimpleEventTunnels(nameGenerator, eventGenerator) {
	        ["pointerdown", "pointermove", "pointerup", "pointerover", "pointerout"].forEach(function (eventName) {
	            window.addEventListener(nameGenerator(eventName), function (evt) {
	                if (!touching && findEventRegisteredNode(evt.target, eventName))
	                    eventGenerator(evt, eventName, true);
	            });
	        });
	        if (window['on' + nameGenerator("pointerenter").toLowerCase()] === undefined)
	            window.addEventListener(nameGenerator("pointerover"), function (evt) {
	                if (touching)
	                    return;
	                var foundNode = findEventRegisteredNode(evt.target, "pointerenter");
	                if (!foundNode || foundNode === window)
	                    return;
	                else if (!foundNode.contains(evt.relatedTarget)) {
	                    dispatchPointerEnter(foundNode, evt.relatedTarget, function (targetNode) {
	                        eventGenerator(evt, "pointerenter", false, targetNode, evt.relatedTarget);
	                    });
	                }
	            });
	        if (window['on' + nameGenerator("pointerleave").toLowerCase()] === undefined)
	            window.addEventListener(nameGenerator("pointerout"), function (evt) {
	                if (touching)
	                    return;
	                var foundNode = findEventRegisteredNode(evt.target, "pointerleave");
	                if (!foundNode || foundNode === window)
	                    return;
	                else if (!foundNode.contains(evt.relatedTarget)) {
	                    dispatchPointerLeave(foundNode, evt.relatedTarget, function (targetNode) {
	                        eventGenerator(evt, "pointerleave", false, targetNode, evt.relatedTarget);
	                    });
	                }
	            });
	    }

	    (function () {
	        if (window.MSPointerEvent) {
	            //IE 10
	            applySimpleEventTunnels(
	                function (name) { return getPrefixEventName("MS", name); },
	                generateTouchClonedEvent);
	        }
	        else {
	            applySimpleEventTunnels(getMouseEquivalentEventName, generateMouseProxy);

	            // Handling move on window to detect pointerleave/out/over
	            if (window.ontouchstart !== undefined) {
	                window.addEventListener('touchstart', function (eventObject) {
	                    for (var i = 0; i < eventObject.changedTouches.length; ++i) {
	                        var touchPoint = eventObject.changedTouches[i];
	                        previousTargets[touchPoint.identifier] = touchPoint.target;

	                        generateTouchEventProxyIfRegistered("pointerover", touchPoint, touchPoint.target, eventObject, true);

	                        //pointerenter should not be bubbled
	                        dispatchPointerEnter(touchPoint.target, null, function (targetNode) {
	                            generateTouchEventProxy("pointerenter", touchPoint, targetNode, eventObject, false);
	                        });

	                        generateTouchEventProxyIfRegistered("pointerdown", touchPoint, touchPoint.target, eventObject, true);
	                    }
	                    setTouchTimer();
	                });

	                window.addEventListener('touchend', function (eventObject) {
	                    for (var i = 0; i < eventObject.changedTouches.length; ++i) {
	                        var touchPoint = eventObject.changedTouches[i];
	                        var currentTarget = previousTargets[touchPoint.identifier];

	                        generateTouchEventProxyIfRegistered("pointerup", touchPoint, currentTarget, eventObject, true);
	                        generateTouchEventProxyIfRegistered("pointerout", touchPoint, currentTarget, eventObject, true);

	                        //pointerleave should not be bubbled
	                        dispatchPointerLeave(currentTarget, null, function (targetNode) {
	                            generateTouchEventProxy("pointerleave", touchPoint, targetNode, eventObject, false);
	                        });
	                    }
	                    setTouchTimer();
	                });

	                window.addEventListener('touchmove', function (eventObject) {
	                    for (var i = 0; i < eventObject.changedTouches.length; ++i) {
	                        var touchPoint = eventObject.changedTouches[i];
	                        var newTarget = document.elementFromPoint(touchPoint.clientX, touchPoint.clientY);
	                        var currentTarget = previousTargets[touchPoint.identifier];

	                        // If force preventDefault
	                        if (currentTarget && checkPreventDefault(currentTarget) === true)
	                            eventObject.preventDefault();

	                        generateTouchEventProxyIfRegistered("pointermove", touchPoint, currentTarget, eventObject, true);
	                        if (!navigator.isCocoonJS){
	                            var newTarget = document.elementFromPoint(touchPoint.clientX, touchPoint.clientY);
	                            if (currentTarget === newTarget) {
	                                continue; // We can skip this as the pointer is effectively over the current target
	                            }

	                            if (currentTarget) {
	                                // Raise out
	                                generateTouchEventProxyIfRegistered("pointerout", touchPoint, currentTarget, eventObject, true, newTarget);

	                                // Raise leave
	                                if (!currentTarget.contains(newTarget)) { // Leave must be called if the new target is not a child of the current
	                                    dispatchPointerLeave(currentTarget, newTarget, function (targetNode) {
	                                        generateTouchEventProxy("pointerleave", touchPoint, targetNode, eventObject, false, newTarget);
	                                    });
	                                }
	                            }

	                            if (newTarget) {
	                                // Raise over
	                                generateTouchEventProxyIfRegistered("pointerover", touchPoint, newTarget, eventObject, true, currentTarget);

	                                // Raise enter
	                                if (!newTarget.contains(currentTarget)) { // Leave must be called if the new target is not the parent of the current
	                                    dispatchPointerEnter(newTarget, currentTarget, function (targetNode) {
	                                        generateTouchEventProxy("pointerenter", touchPoint, targetNode, eventObject, false, currentTarget);
	                                    })
	                                }
	                            }
	                            previousTargets[touchPoint.identifier] = newTarget;
	                        }
	                    }
	                    setTouchTimer();
	                });

	                window.addEventListener('touchcancel', function (eventObject) {
	                    for (var i = 0; i < eventObject.changedTouches.length; ++i) {
	                        var touchPoint = eventObject.changedTouches[i];

	                        generateTouchEventProxyIfRegistered("pointercancel", touchPoint, previousTargets[touchPoint.identifier], eventObject, true);
	                    }
	                });
	            }
	        }
	    })();
	    

	    // Extension to navigator
	    if (navigator.pointerEnabled === undefined) {

	        // Indicates if the browser will fire pointer events for pointing input
	        navigator.pointerEnabled = true;

	        // IE
	        if (navigator.msPointerEnabled) {
	            navigator.maxTouchPoints = navigator.msMaxTouchPoints;
	        }
	    }
	})();

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function () {

	/*** Variables ***/

	  var win = window,
	    doc = document,
	    attrProto = {
	      setAttribute: Element.prototype.setAttribute,
	      removeAttribute: Element.prototype.removeAttribute
	    },
	    hasShadow = Element.prototype.createShadowRoot,
	    container = doc.createElement('div'),
	    noop = function(){},
	    trueop = function(){ return true; },
	    regexReplaceCommas = /,/g,
	    regexCamelToDash = /([a-z])([A-Z])/g,
	    regexPseudoParens = /\(|\)/g,
	    regexPseudoCapture = /:(\w+)\u276A(.+?(?=\u276B))|:(\w+)/g,
	    regexDigits = /(\d+)/g,
	    keypseudo = {
	      action: function (pseudo, event) {
	        return pseudo.value.match(regexDigits).indexOf(String(event.keyCode)) > -1 == (pseudo.name == 'keypass') || null;
	      }
	    },
	    /*
	      - The prefix object generated here is added to the xtag object as xtag.prefix later in the code
	      - Prefix provides a variety of prefix variations for the browser in which your code is running
	      - The 4 variations of prefix are as follows:
	        * prefix.dom: the correct prefix case and form when used on DOM elements/style properties
	        * prefix.lowercase: a lowercase version of the prefix for use in various user-code situations
	        * prefix.css: the lowercase, dashed version of the prefix
	        * prefix.js: addresses prefixed APIs present in global and non-Element contexts
	    */
	    prefix = (function () {
	      var styles = win.getComputedStyle(doc.documentElement, ''),
	          pre = (Array.prototype.slice
	            .call(styles)
	            .join('')
	            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	          )[1];
	      return {
	        dom: pre == 'ms' ? 'MS' : pre,
	        lowercase: pre,
	        css: '-' + pre + '-',
	        js: pre == 'ms' ? pre : pre[0].toUpperCase() + pre.substr(1)
	      };
	    })(),
	    matchSelector = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype[prefix.lowercase + 'MatchesSelector'];

	  var issetCustomEvent = false;
	  var customEvent;
	  try {
	    customEvent = doc.createEvent('CustomEvent');
	    issetCustomEvent = true;
	  } catch(e) {
	    customEvent = doc.createEvent('Event');
	  }

	/*** Functions ***/

	// Utilities

	  /*
	    This is an enhanced typeof check for all types of objects. Where typeof would normaly return
	    'object' for many common DOM objects (like NodeLists and HTMLCollections).
	    - For example: typeOf(document.children) will correctly return 'htmlcollection'
	  */
	  var typeCache = {},
	      typeString = typeCache.toString,
	      typeRegexp = /\s([a-zA-Z]+)/;
	  function typeOf(obj) {
	    var type = typeString.call(obj);
	    return typeCache[type] || (typeCache[type] = type.match(typeRegexp)[1].toLowerCase());
	  }

	  function clone(item, type){
	    var fn = clone[type || typeOf(item)];
	    return fn ? fn(item) : item;
	  }
	    clone.object = function(src){
	      var obj = {};
	      for (var key in src) obj[key] = clone(src[key]);
	      return obj;
	    };
	    clone.array = function(src){
	      var i = src.length, array = new Array(i);
	      while (i--) array[i] = clone(src[i]);
	      return array;
	    };

	  /*
	    The toArray() method allows for conversion of any object to a true array. For types that
	    cannot be converted to an array, the method returns a 1 item array containing the passed-in object.
	  */
	  var unsliceable = { 'undefined': 1, 'null': 1, 'number': 1, 'boolean': 1, 'string': 1, 'function': 1 };
	  function toArray(obj){
	    return unsliceable[typeOf(obj)] ? [obj] : Array.prototype.slice.call(obj, 0);
	  }

	// DOM

	  var str = '';
	  function query(element, selector){
	    return (selector || str).length ? toArray(element.querySelectorAll(selector)) : [];
	  }

	// Pseudos

	  function parsePseudo(fn){fn();}

	// Mixins

	  function mergeOne(source, key, current){
	    var type = typeOf(current);
	    if (type == 'object' && typeOf(source[key]) == 'object') xtag.merge(source[key], current);
	    else source[key] = clone(current, type);
	    return source;
	  }

	  function mergeMixin(tag, original, mixin, name) {
	    var key, keys = {};
	    for (var z in original) keys[z.split(':')[0]] = z;
	    for (z in mixin) {
	      key = keys[z.split(':')[0]];
	      if (typeof original[key] == 'function') {
	        if (!key.match(':mixins')) {
	          original[key + ':mixins'] = original[key];
	          delete original[key];
	          key = key + ':mixins';
	        }
	        original[key].__mixin__ = xtag.applyPseudos(z + (z.match(':mixins') ? '' : ':mixins'), mixin[z], tag.pseudos, original[key].__mixin__);
	      }
	      else {
	        original[z] = mixin[z];
	        delete original[key];
	      }
	    }
	  }

	  var uniqueMixinCount = 0;
	  function addMixin(tag, original, mixin){
	    for (var z in mixin){
	      original[z + ':__mixin__(' + (uniqueMixinCount++) + ')'] = xtag.applyPseudos(z, mixin[z], tag.pseudos);
	    }
	  }

	  function resolveMixins(mixins, output){
	    var index = mixins.length;
	    while (index--){
	      output.unshift(mixins[index]);
	      if (xtag.mixins[mixins[index]].mixins) resolveMixins(xtag.mixins[mixins[index]].mixins, output);
	    }
	    return output;
	  }

	  function applyMixins(tag) {
	    resolveMixins(tag.mixins, []).forEach(function(name){
	      var mixin = xtag.mixins[name];
	      for (var type in mixin) {
	        var item = mixin[type],
	            original = tag[type];
	        if (!original) tag[type] = item;
	        else {
	          switch (type){
	            case 'mixins': break;
	            case 'events': addMixin(tag, original, item); break;
	            case 'accessors':
	            case 'prototype':
	              for (var z in item) {
	                if (!original[z]) original[z] = item[z];
	                else mergeMixin(tag, original[z], item[z], name);
	              }
	              break;
	            default: mergeMixin(tag, original, item, name);
	          }
	        }
	      }
	    });
	    return tag;
	  }

	// Events

	  function delegateAction(pseudo, event) {
	    var match,
	        target = event.target,
	        root = event.currentTarget;
	    while (!match && target && target != root) {
	      if (target.tagName && matchSelector.call(target, pseudo.value)) match = target;
	      target = target.parentNode;
	    }
	    if (!match && root.tagName && matchSelector.call(root, pseudo.value)) match = root;
	    return match ? pseudo.listener = pseudo.listener.bind(match) : null;
	  }

	  function touchFilter(event){
	    return event.button === 0;
	  }

	  function writeProperty(key, event, base, desc){
	    if (desc) event[key] = base[key];
	    else Object.defineProperty(event, key, {
	      writable: true,
	      enumerable: true,
	      value: base[key]
	    });
	  }

	  var skipProps = {};
	  for (var z in customEvent) skipProps[z] = 1;
	  function inheritEvent(event, base){
	    var desc = Object.getOwnPropertyDescriptor(event, 'target');
	    for (var z in base) {
	      if (!skipProps[z]) writeProperty(z, event, base, desc);
	    }
	    event.baseEvent = base;
	  }

	// Accessors

	  function modAttr(element, attr, name, value, method){
	    attrProto[method].call(element, name, attr && attr.boolean ? '' : value);
	  }

	  function syncAttr(element, attr, name, value, method){
	    if (attr && (attr.property || attr.selector)) {
	      var nodes = attr.property ? [element.xtag[attr.property]] : attr.selector ? xtag.query(element, attr.selector) : [],
	          index = nodes.length;
	      while (index--) nodes[index][method](name, value);
	    }
	  }

	  function attachProperties(tag, prop, z, accessor, attr, name){
	    var key = z.split(':'), type = key[0];
	    if (type == 'get') {
	      key[0] = prop;
	      tag.prototype[prop].get = xtag.applyPseudos(key.join(':'), accessor[z], tag.pseudos, accessor[z]);
	    }
	    else if (type == 'set') {
	      key[0] = prop;
	      var setter = tag.prototype[prop].set = xtag.applyPseudos(key.join(':'), attr ? function(value){
	        var old, method = 'setAttribute';
	        if (attr.boolean){
	          value = !!value;
	          old = this.hasAttribute(name);
	          if (!value) method = 'removeAttribute';
	        }
	        else {
	          value = attr.validate ? attr.validate.call(this, value) : value;
	          old = this.getAttribute(name);
	        }
	        modAttr(this, attr, name, value, method);
	        accessor[z].call(this, value, old);
	        syncAttr(this, attr, name, value, method);
	      } : accessor[z] ? function(value){
	        accessor[z].call(this, value);
	      } : null, tag.pseudos, accessor[z]);

	      if (attr) attr.setter = accessor[z];
	    }
	    else tag.prototype[prop][z] = accessor[z];
	  }

	  function parseAccessor(tag, prop){
	    tag.prototype[prop] = {};
	    var accessor = tag.accessors[prop],
	        attr = accessor.attribute,
	        name;

	    if (attr) {
	      name = attr.name = (attr ? (attr.name || prop.replace(regexCamelToDash, '$1-$2')) : prop).toLowerCase();
	      attr.key = prop;
	      tag.attributes[name] = attr;
	    }

	    for (var z in accessor) attachProperties(tag, prop, z, accessor, attr, name);

	    if (attr) {
	      if (!tag.prototype[prop].get) {
	        var method = (attr.boolean ? 'has' : 'get') + 'Attribute';
	        tag.prototype[prop].get = function(){
	          return this[method](name);
	        };
	      }
	      if (!tag.prototype[prop].set) tag.prototype[prop].set = function(value){
	        value = attr.boolean ? !!value : attr.validate ? attr.validate.call(this, value) : value;
	        var method = attr.boolean ? (value ? 'setAttribute' : 'removeAttribute') : 'setAttribute';
	        modAttr(this, attr, name, value, method);
	        syncAttr(this, attr, name, value, method);
	      };
	    }
	  }

	  var unwrapComment = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;
	  function parseMultiline(fn){
	    return typeof fn == 'function' ? unwrapComment.exec(fn.toString())[1] : fn;
	  }

	/*** X-Tag Object Definition ***/

	  var xtag = {
	    tags: {},
	    defaultOptions: {
	      pseudos: [],
	      mixins: [],
	      events: {},
	      methods: {},
	      accessors: {},
	      lifecycle: {},
	      attributes: {},
	      'prototype': {
	        xtag: {
	          get: function(){
	            return this.__xtag__ ? this.__xtag__ : (this.__xtag__ = { data: {} });
	          }
	        }
	      }
	    },
	    register: function (name, options) {
	      var _name;
	      if (typeof name == 'string') _name = name.toLowerCase();
	      else throw 'First argument must be a Custom Element string name';
	      xtag.tags[_name] = options || {};

	      var basePrototype = options.prototype;
	      delete options.prototype;
	      var tag = xtag.tags[_name].compiled = applyMixins(xtag.merge({}, xtag.defaultOptions, options));
	      var proto = tag.prototype;
	      var lifecycle = tag.lifecycle;

	      for (var z in tag.events) tag.events[z] = xtag.parseEvent(z, tag.events[z]);
	      for (z in lifecycle) lifecycle[z.split(':')[0]] = xtag.applyPseudos(z, lifecycle[z], tag.pseudos, lifecycle[z]);
	      for (z in tag.methods) proto[z.split(':')[0]] = { value: xtag.applyPseudos(z, tag.methods[z], tag.pseudos, tag.methods[z]), enumerable: true };
	      for (z in tag.accessors) parseAccessor(tag, z);

	      if (tag.shadow) tag.shadow = tag.shadow.nodeName ? tag.shadow : xtag.createFragment(tag.shadow);
	      if (tag.content) tag.content = tag.content.nodeName ? tag.content.innerHTML : parseMultiline(tag.content);
	      var created = lifecycle.created;
	      var finalized = lifecycle.finalized;
	      proto.createdCallback = {
	        enumerable: true,
	        value: function(){
	          var element = this;
	          if (tag.shadow && hasShadow) this.createShadowRoot().appendChild(tag.shadow.cloneNode(true));
	          if (tag.content) this.appendChild(document.createElement('div')).outerHTML = tag.content;
	          var output = created ? created.apply(this, arguments) : null;
	          xtag.addEvents(this, tag.events);
	          for (var name in tag.attributes) {
	            var attr = tag.attributes[name],
	                hasAttr = this.hasAttribute(name),
	                hasDefault = attr.def !== undefined;
	            if (hasAttr || attr.boolean || hasDefault) {
	              this[attr.key] = attr.boolean ? hasAttr : !hasAttr && hasDefault ? attr.def : this.getAttribute(name);
	            }
	          }
	          tag.pseudos.forEach(function(obj){
	            obj.onAdd.call(element, obj);
	          });
	          this.xtagComponentReady = true;
	          if (finalized) finalized.apply(this, arguments);
	          return output;
	        }
	      };

	      var inserted = lifecycle.inserted;
	      var removed = lifecycle.removed;
	      if (inserted || removed) {
	        proto.attachedCallback = { value: function(){
	          if (removed) this.xtag.__parentNode__ = this.parentNode;
	          if (inserted) return inserted.apply(this, arguments);
	        }, enumerable: true };
	      }
	      if (removed) {
	        proto.detachedCallback = { value: function(){
	          var args = toArray(arguments);
	          args.unshift(this.xtag.__parentNode__);
	          var output = removed.apply(this, args);
	          delete this.xtag.__parentNode__;
	          return output;
	        }, enumerable: true };
	      }
	      if (lifecycle.attributeChanged) proto.attributeChangedCallback = { value: lifecycle.attributeChanged, enumerable: true };

	      proto.setAttribute = {
	        writable: true,
	        enumerable: true,
	        value: function (name, value){
	          var old;
	          var _name = name.toLowerCase();
	          var attr = tag.attributes[_name];
	          if (attr) {
	            old = this.getAttribute(_name);
	            value = attr.boolean ? '' : attr.validate ? attr.validate.call(this, value) : value;
	          }
	          modAttr(this, attr, _name, value, 'setAttribute');
	          if (attr) {
	            if (attr.setter) attr.setter.call(this, attr.boolean ? true : value, old);
	            syncAttr(this, attr, _name, value, 'setAttribute');
	          }
	        }
	      };

	      proto.removeAttribute = {
	        writable: true,
	        enumerable: true,
	        value: function (name){
	          var _name = name.toLowerCase();
	          var attr = tag.attributes[_name];
	          var old = this.hasAttribute(_name);
	          modAttr(this, attr, _name, '', 'removeAttribute');
	          if (attr) {
	            if (attr.setter) attr.setter.call(this, attr.boolean ? false : undefined, old);
	            syncAttr(this, attr, _name, '', 'removeAttribute');
	          }
	        }
	      };

	      var definition = {};
	      var instance = basePrototype instanceof win.HTMLElement;
	      var extended = tag['extends'] && (definition['extends'] = tag['extends']);

	      if (basePrototype) Object.getOwnPropertyNames(basePrototype).forEach(function(z){
	        var prop = proto[z];
	        var desc = instance ? Object.getOwnPropertyDescriptor(basePrototype, z) : basePrototype[z];
	        if (prop) {
	          for (var y in desc) {
	            if (typeof desc[y] == 'function' && prop[y]) prop[y] = xtag.wrap(desc[y], prop[y]);
	            else prop[y] = desc[y];
	          }
	        }
	        proto[z] = prop || desc;
	      });

	      definition['prototype'] = Object.create(
	        extended ? Object.create(doc.createElement(extended).constructor).prototype : win.HTMLElement.prototype,
	        proto
	      );

	      return doc.registerElement(_name, definition);
	    },

	    /* Exposed Variables */

	    mixins: {},
	    prefix: prefix,
	    captureEvents: { focus: 1, blur: 1, scroll: 1, DOMMouseScroll: 1 },
	    customEvents: {
	      animationstart: {
	        attach: [prefix.dom + 'AnimationStart']
	      },
	      animationend: {
	        attach: [prefix.dom + 'AnimationEnd']
	      },
	      transitionend: {
	        attach: [prefix.dom + 'TransitionEnd']
	      },
	      move: {
	        attach: ['pointermove']
	      },
	      enter: {
	        attach: ['pointerenter']
	      },
	      leave: {
	        attach: ['pointerleave']
	      },
	      scrollwheel: {
	        attach: ['DOMMouseScroll', 'mousewheel'],
	        condition: function(event){
	          event.delta = event.wheelDelta ? event.wheelDelta / 40 : Math.round(event.detail / 3.5 * -1);
	          return true;
	        }
	      },
	      tap: {
	        attach: ['pointerdown', 'pointerup'],
	        condition: function(event, custom){
	          if (event.type == 'pointerdown') {
	            custom.startX = event.clientX;
	            custom.startY = event.clientY;
	          }
	          else if (event.button === 0 &&
	                   Math.abs(custom.startX - event.clientX) < 10 &&
	                   Math.abs(custom.startY - event.clientY) < 10) return true;
	        }
	      },
	      tapstart: {
	        attach: ['pointerdown'],
	        condition: touchFilter
	      },
	      tapend: {
	        attach: ['pointerup'],
	        condition: touchFilter
	      },
	      tapmove: {
	        attach: ['pointerdown'],
	        condition: function(event, custom){
	          if (event.type == 'pointerdown') {
	            var listener = custom.listener.bind(this);
	            if (!custom.tapmoveListeners) custom.tapmoveListeners = xtag.addEvents(document, {
	              pointermove: listener,
	              pointerup: listener,
	              pointercancel: listener
	            });
	          }
	          else if (event.type == 'pointerup' || event.type == 'pointercancel') {
	            xtag.removeEvents(document, custom.tapmoveListeners);
	            custom.tapmoveListeners = null;
	          }
	          return true;
	        }
	      },
	      taphold: {
	        attach: ['pointerdown', 'pointerup'],
	        condition: function(event, custom){
	          if (event.type == 'pointerdown') {
	            (custom.pointers = custom.pointers || {})[event.pointerId] = setTimeout(
	              xtag.fireEvent.bind(null, this, 'taphold'),
	              custom.duration || 1000
	            );
	          }
	          else if (event.type == 'pointerup') {
	            if (custom.pointers) {
	              clearTimeout(custom.pointers[event.pointerId]);
	              delete custom.pointers[event.pointerId];
	            }
	          }
	          else return true;
	        }
	      }
	    },
	    pseudos: {
	      __mixin__: {},
	      mixins: {
	        onCompiled: function(fn, pseudo){
	          var mixin = pseudo.source && pseudo.source.__mixin__ || pseudo.source;
	          if (mixin) switch (pseudo.value) {
	            case null: case '': case 'before': return function(){
	              mixin.apply(this, arguments);
	              return fn.apply(this, arguments);
	            };
	            case 'after': return function(){
	              var returns = fn.apply(this, arguments);
	              mixin.apply(this, arguments);
	              return returns;
	            };
	            case 'none': return fn;
	          }
	          else return fn;
	        }
	      },
	      keypass: keypseudo,
	      keyfail: keypseudo,
	      delegate: {
	        action: delegateAction
	      },
	      preventable: {
	        action: function (pseudo, event) {
	          return !event.defaultPrevented;
	        }
	      },
	      duration: {
	        onAdd: function(pseudo){
	          pseudo.source.duration = Number(pseudo.value);
	        }
	      },
	      capture: {
	        onCompiled: function(fn, pseudo){
	          if (pseudo.source) pseudo.source.capture = true;
	        }
	      }
	    },

	    /* UTILITIES */

	    clone: clone,
	    typeOf: typeOf,
	    toArray: toArray,

	    wrap: function (original, fn) {
	      return function(){
	        var output = original.apply(this, arguments);
	        fn.apply(this, arguments);
	        return output;
	      };
	    },
	    /*
	      Recursively merges one object with another. The first argument is the destination object,
	      all other objects passed in as arguments are merged from right to left, conflicts are overwritten
	    */
	    merge: function(source, k, v){
	      if (typeOf(k) == 'string') return mergeOne(source, k, v);
	      for (var i = 1, l = arguments.length; i < l; i++){
	        var object = arguments[i];
	        for (var key in object) mergeOne(source, key, object[key]);
	      }
	      return source;
	    },

	    /*
	      ----- This should be simplified! -----
	      Generates a random ID string
	    */
	    uid: function(){
	      return Math.random().toString(36).substr(2,10);
	    },

	    /* DOM */

	    query: query,

	    skipTransition: function(element, fn, bind){
	      var prop = prefix.js + 'TransitionProperty';
	      element.style[prop] = element.style.transitionProperty = 'none';
	      var callback = fn ? fn.call(bind || element) : null;
	      return xtag.skipFrame(function(){
	        element.style[prop] = element.style.transitionProperty = '';
	        if (callback) callback.call(bind || element);
	      });
	    },

	    requestFrame: (function(){
	      var raf = win.requestAnimationFrame ||
	                win[prefix.lowercase + 'RequestAnimationFrame'] ||
	                function(fn){ return win.setTimeout(fn, 20); };
	      return function(fn){ return raf(fn); };
	    })(),

	    cancelFrame: (function(){
	      var cancel = win.cancelAnimationFrame ||
	                   win[prefix.lowercase + 'CancelAnimationFrame'] ||
	                   win.clearTimeout;
	      return function(id){ return cancel(id); };
	    })(),

	    skipFrame: function(fn){
	      var id = xtag.requestFrame(function(){ id = xtag.requestFrame(fn); });
	      return id;
	    },

	    matchSelector: function (element, selector) {
	      return matchSelector.call(element, selector);
	    },

	    set: function (element, method, value) {
	      element[method] = value;
	      if (window.CustomElements) CustomElements.upgradeAll(element);
	    },

	    innerHTML: function(el, html){
	      xtag.set(el, 'innerHTML', html);
	    },

	    hasClass: function (element, klass) {
	      return element.className.split(' ').indexOf(klass.trim())>-1;
	    },

	    addClass: function (element, klass) {
	      var list = element.className.trim().split(' ');
	      klass.trim().split(' ').forEach(function (name) {
	        if (!~list.indexOf(name)) list.push(name);
	      });
	      element.className = list.join(' ').trim();
	      return element;
	    },

	    removeClass: function (element, klass) {
	      var classes = klass.trim().split(' ');
	      element.className = element.className.trim().split(' ').filter(function (name) {
	        return name && !~classes.indexOf(name);
	      }).join(' ');
	      return element;
	    },

	    toggleClass: function (element, klass) {
	      return xtag[xtag.hasClass(element, klass) ? 'removeClass' : 'addClass'].call(null, element, klass);
	    },

	    /*
	      Runs a query on only the children of an element
	    */
	    queryChildren: function (element, selector) {
	      var id = element.id,
	          attr = '#' + (element.id = id || 'x_' + xtag.uid()) + ' > ',
	          parent = element.parentNode || !container.appendChild(element);
	      selector = attr + (selector + '').replace(regexReplaceCommas, ',' + attr);
	      var result = element.parentNode.querySelectorAll(selector);
	      if (!id) element.removeAttribute('id');
	      if (!parent) container.removeChild(element);
	      return toArray(result);
	    },

	    /*
	      Creates a document fragment with the content passed in - content can be
	      a string of HTML, an element, or an array/collection of elements
	    */
	    createFragment: function(content) {
	      var template = document.createElement('template');
	      if (content) {
	        if (content.nodeName) toArray(arguments).forEach(function(e){
	          template.content.appendChild(e);
	        });
	        else template.innerHTML = parseMultiline(content);
	      }
	      return document.importNode(template.content, true);
	    },

	    /*
	      Removes an element from the DOM for more performant node manipulation. The element
	      is placed back into the DOM at the place it was taken from.
	    */
	    manipulate: function(element, fn){
	      var next = element.nextSibling,
	          parent = element.parentNode,
	          returned = fn.call(element) || element;
	      if (next) parent.insertBefore(returned, next);
	      else parent.appendChild(returned);
	    },

	    /* PSEUDOS */

	    applyPseudos: function(key, fn, target, source) {
	      var listener = fn,
	          pseudos = {};
	      if (key.match(':')) {
	        var matches = [],
	            valueFlag = 0;
	        key.replace(regexPseudoParens, function(match){
	          if (match == '(') return ++valueFlag == 1 ? '\u276A' : '(';
	          return !--valueFlag ? '\u276B' : ')';
	        }).replace(regexPseudoCapture, function(z, name, value, solo){
	          matches.push([name || solo, value]);
	        });
	        var i = matches.length;
	        while (i--) parsePseudo(function(){
	          var name = matches[i][0],
	              value = matches[i][1];
	          if (!xtag.pseudos[name]) throw "pseudo not found: " + name + " " + value;
	          value = (value === '' || typeof value == 'undefined') ? null : value;
	          var pseudo = pseudos[i] = Object.create(xtag.pseudos[name]);
	          pseudo.key = key;
	          pseudo.name = name;
	          pseudo.value = value;
	          pseudo['arguments'] = (value || '').split(',');
	          pseudo.action = pseudo.action || trueop;
	          pseudo.source = source;
	          pseudo.onAdd = pseudo.onAdd || noop;
	          pseudo.onRemove = pseudo.onRemove || noop;
	          var original = pseudo.listener = listener;
	          listener = function(){
	            var output = pseudo.action.apply(this, [pseudo].concat(toArray(arguments)));
	            if (output === null || output === false) return output;
	            output = pseudo.listener.apply(this, arguments);
	            pseudo.listener = original;
	            return output;
	          };
	          if (!target) pseudo.onAdd.call(fn, pseudo);
	          else target.push(pseudo);
	        });
	      }
	      for (var z in pseudos) {
	        if (pseudos[z].onCompiled) listener = pseudos[z].onCompiled(listener, pseudos[z]) || listener;
	      }
	      return listener;
	    },

	    removePseudos: function(target, pseudos){
	      pseudos.forEach(function(obj){
	        obj.onRemove.call(target, obj);
	      });
	    },

	  /*** Events ***/

	    parseEvent: function(type, fn) {
	      var pseudos = type.split(':'),
	          key = pseudos.shift(),
	          custom = xtag.customEvents[key],
	          event = xtag.merge({
	            type: key,
	            stack: noop,
	            condition: trueop,
	            capture: xtag.captureEvents[key],
	            attach: [],
	            _attach: [],
	            pseudos: '',
	            _pseudos: [],
	            onAdd: noop,
	            onRemove: noop
	          }, custom || {});
	      event.attach = toArray(event.base || event.attach);
	      event.chain = key + (event.pseudos.length ? ':' + event.pseudos : '') + (pseudos.length ? ':' + pseudos.join(':') : '');
	      var stack = xtag.applyPseudos(event.chain, fn, event._pseudos, event);
	      event.stack = function(e){
	        e.currentTarget = e.currentTarget || this;
	        var detail = e.detail || {};
	        if (!detail.__stack__) return stack.apply(this, arguments);
	        else if (detail.__stack__ == stack) {
	          e.stopPropagation();
	          e.cancelBubble = true;
	          return stack.apply(this, arguments);
	        }
	      };
	      event.listener = function(e){
	        var args = toArray(arguments),
	            output = event.condition.apply(this, args.concat([event]));
	        if (!output) return output;
	        // The second condition in this IF is to address the following Blink regression: https://code.google.com/p/chromium/issues/detail?id=367537
	        // Remove this when affected browser builds with this regression fall below 5% marketshare
	        if (e.type != key && (e.baseEvent && e.type != e.baseEvent.type)) {
	          xtag.fireEvent(e.target, key, {
	            baseEvent: e,
	            detail: output !== true && (output.__stack__ = stack) ? output : { __stack__: stack }
	          });
	        }
	        else return event.stack.apply(this, args);
	      };
	      event.attach.forEach(function(name) {
	        event._attach.push(xtag.parseEvent(name, event.listener));
	      });
	      return event;
	    },

	    addEvent: function (element, type, fn, capture) {
	      var event = typeof fn == 'function' ? xtag.parseEvent(type, fn) : fn;
	      event._pseudos.forEach(function(obj){
	        obj.onAdd.call(element, obj);
	      });
	      event._attach.forEach(function(obj) {
	        xtag.addEvent(element, obj.type, obj);
	      });
	      event.onAdd.call(element, event, event.listener);
	      element.addEventListener(event.type, event.stack, capture || event.capture);
	      return event;
	    },

	    addEvents: function (element, obj) {
	      var events = {};
	      for (var z in obj) {
	        events[z] = xtag.addEvent(element, z, obj[z]);
	      }
	      return events;
	    },

	    removeEvent: function (element, type, event) {
	      event = event || type;
	      event.onRemove.call(element, event, event.listener);
	      xtag.removePseudos(element, event._pseudos);
	      event._attach.forEach(function(obj) {
	        xtag.removeEvent(element, obj);
	      });
	      element.removeEventListener(event.type, event.stack, false);
	    },

	    removeEvents: function(element, obj){
	      for (var z in obj) xtag.removeEvent(element, obj[z]);
	    },

	    fireEvent: function(element, type, options){
	      options = options || {};

	      var event;
	      var bubbles = options.bubbles !== false;
	      var cancelable = options.cancelable !== false;

	      if (issetCustomEvent) {
	        event = doc.createEvent('CustomEvent');
	        event.initCustomEvent(type, bubbles, cancelable, options.detail);

	      } else {
	        event = doc.createEvent('Event');
	        event.initEvent(type, bubbles, cancelable);
	        event.detail = options.detail;
	      }

	      if (options.baseEvent) inheritEvent(event, options.baseEvent);

	      element.dispatchEvent(event);
	    }
	  };

	  if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (xtag), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  else if (typeof module !== 'undefined' && module.exports) module.exports = xtag;
	  else win.xtag = xtag;

	  doc.addEventListener('WebComponentsReady', function(){
	    xtag.fireEvent(doc.body, 'DOMComponentsLoaded');
	  }, false);

	})();


/***/ }

/******/ })
});
;