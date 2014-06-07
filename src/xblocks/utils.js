/* global xblocks, global */
(function(global, xblocks, undefined) {
    'use strict';

    /**
     * @namespace
     */
    xblocks.utils = {};

    xblocks.utils.REG_TYPE_EXTRACT = /\s([a-zA-Z]+)/;

    xblocks.utils.support = {
        template: ('content' in global.document.createElement('template'))
    };

    /**
     * Generate unique string
     * @returns {string}
     */
    xblocks.utils.uid = function() {
        return Math.floor((1 + Math.random()) * 0x10000000 + Date.now()).toString(36);
    };

    /**
     * @returns {object}
     */
    xblocks.utils.extend = function() {
        var options;
        var name;
        var src;
        var copy;
        var copyIsArray;
        var clone;
        var target = arguments[0] || {};
        var i = 1;
        var length = arguments.length;
        var deep = false;

        if (typeof target === 'boolean') {
            deep = target;

            target = arguments[i] || {};
            i++;
        }

        if (typeof target !== 'object' && xblocks.utils.type(target) !== 'function') {
            target = {};
        }

        if ( i === length ) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) !== null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if ( deep && copy && ( xblocks.utils.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && xblocks.utils.isPlainObject(src) ? src : {};
                        }

                        target[name] = xblocks.utils.extend( deep, clone, copy );

                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    };

    /**
     * @param {*} param
     * @returns {string}
     */
    xblocks.utils.type = function(param) {
        return Object.prototype.toString.call(param).match(xblocks.utils.REG_TYPE_EXTRACT)[1].toLowerCase();
    };

    /**
     * @param {*} obj
     * @returns {boolean}
     */
    xblocks.utils.isPlainObject = function(obj) {
        if (xblocks.utils.type(obj) !== 'object' || obj.nodeType || xblocks.utils.isWindow(obj)) {
            return false;
        }

        if (obj.constructor && !obj.constructor.prototype.hasOwnProperty('isPrototypeOf')) {
            return false;
        }

        return true;
    };

    xblocks.utils.isWindow = function(obj) {
        return obj !== null && obj === obj.window;
    };

    /**
     * @param {*} x
     * @param {*} y
     * @returns {boolean}
     */
    xblocks.utils.equals = function(x, y) {
        if (x === y) {
            return true;
        }

        if (!(x instanceof Object) || !(y instanceof Object)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        var p;
        for (p in x) {
            if (x.hasOwnProperty(p)) {
                if (!y.hasOwnProperty(p)) {
                    return false;
                }

                if (x[p] === y[p]) {
                    continue;
                }

                if (typeof(x[p]) !== 'object') {
                    return false;
                }

                if (!xblocks.utils.equals(x[p], y[p])) {
                    return false;
                }
            }
        }

        for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                return false;
            }
        }

        return true;
    };

    /**
     * @param {*} obj
     * @returns {boolean}
     */
    xblocks.utils.isEmptyObject = function(obj) {
        if (xblocks.utils.type(obj) === 'object') {
            var name;
            for (name in obj) {
                return false;
            }
        }

        return true;
    };

    /**
     * @param {object} from
     * @param {function} [callback]
     * @returns {object}
     */
    xblocks.utils.filterObject = function(from, callback) {
        var out = {};

        Object.keys(from).forEach(function(property) {
            var descr = Object.getOwnPropertyDescriptor(from, property);
            if (callback && callback(property, descr)) {
                Object.defineProperty(out, property, descr);
            }
        });

        return out;
    };

    /**
     * @param {object} from
     * @param {function} [callback]
     * @returns {object}
     */
    xblocks.utils.mapObject = function(from, callback) {
        var out = {};

        Object.keys(from).forEach(function(property) {
            var descr = Object.getOwnPropertyDescriptor(from, property);
            var map = callback && callback(property, descr);
            if (xblocks.utils.type(map) === 'object') {
                Object.defineProperty(out, map.name, map.descr);
            }
        });

        return out;
    };

    /**
     * @param {function} callback
     * @param {*} args
     * @returns {function}
     */
    xblocks.utils.lazyCall = function(callback, args) {
        callback._args = (callback._args || []).concat(args);

        if (!callback._timer) {
            // setImmediate bad work in IE 10
            callback._timer = global.setTimeout(function() {
                callback._timer = 0;
                callback(callback._args.splice(0, callback._args.length));
            }, 0);
        }

        return callback;
    };

    /**
     * @param {string} methodName
     * @returns {boolean}
     */
    xblocks.utils.pristine = function(methodName) {
        var method = global[methodName];

        if (!methodName || !method) {
            return false;
        }

        if (!(new RegExp("^[\\$_a-z][\\$\\w]*$",'i')).test(methodName)) {
            return false;
        }

        if (typeof method !== 'function' && typeof method !== 'object') {
            return false;
        }

        var re = new RegExp("function\\s+" + methodName + "\\(\\s*\\)\\s*{\\s*\\[native code\\]\\s*}");

        if (!re.test(method)) {
            return false;
        }

        if (typeof method === 'function') {
            if (!method.valueOf || method.valueOf() !== method) {
                return false;
            }
        }

        return true;
    };

    /**
     * @constructor
     */
    xblocks.utils.CustomEvent = (function() {
        if (!xblocks.utils.pristine('CustomEvent')) {
            var CustomEvent = function(event, params) {
                params = xblocks.utils.extend({
                    bubbles: false,
                    cancelable: false,
                    detail: undefined

                }, params || {});

                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            };

            CustomEvent.prototype = global.Event.prototype;

            return CustomEvent;

        } else {
            return global.CustomEvent;
        }
    }());

    xblocks.utils.dispatchEvent = function(element, name, params) {
        element.dispatchEvent(new xblocks.utils.CustomEvent(name, params));
    };

}(global, xblocks));
