(function(xblocks) {

    /**
     * @namespace
     */
    xblocks.utils = {};

    xblocks.utils.REG_TYPE_EXTRACT = /\s([a-zA-Z]+)/;

    xblocks.utils.support = {
        template: ('content' in document.createElement('template'))
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
    xblocks.utils.merge = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if ( typeof target === 'boolean' ) {
            deep = target;

            target = arguments[ i ] || {};
            i++;
        }

        if ( typeof target !== 'object' && xblocks.utils.type(target) !== 'function' ) {
            target = {};
        }

        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    if ( target === copy ) {
                        continue;
                    }

                    if ( deep && copy && ( xblocks.utils.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && xblocks.utils.isPlainObject(src) ? src : {};
                        }

                        target[ name ] = xblocks.utils.merge( deep, clone, copy );

                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
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
        return ({}).toString.call(param).match(xblocks.utils.REG_TYPE_EXTRACT)[1].toLowerCase();
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
        return obj != null && obj === obj.window;
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

        for (var p in x) {
            if (!x.hasOwnProperty(p)) {
                continue;
            }

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
        if (xblocks.utils.type(obj) !== 'object') {
            return true;
        }

        var name;
        for (name in obj) {
            return false;
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

}(xblocks));
