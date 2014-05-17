(function(xblocks) {

    xblocks.uid = function() {
        return Math.floor((1 + Math.random()) * 0x10000000 + Date.now()).toString(36);
    };

    xblocks.noop = function() {};

    xblocks.merge = function() {
        var length = arguments.length;
        var i = 1;
        var target = arguments[0] || {};
        var deep = false;

        if (xblocks.type(target) === 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++;
        }

        if (xblocks.type(target) !== 'object' && xblocks.type(target) !== 'function') {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        Array.prototype.slice.call(arguments, i).filter(function(arg) {
            return arg !== null;

        }).forEach(function(options) {
            Object.keys(options).forEach(function(property) {
                var descr = Object.getOwnPropertyDescriptor(options, property);

                if (deep && xblocks.type(descr.value) === 'object') {
                    var src = target[property];
                    var clone = src && xblocks.isPlainObject(src) ? src : {};
                    descr.value = xblocks.merge(deep, clone, descr.value);
                }

                Object.defineProperty(target, property, descr);
            });
        });

        return target;
    };

    /**
     * @param {*} param
     * @returns {string}
     */
    xblocks.type = function(param) {
        return ({}).toString.call(param).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };

    /**
     * @param {*} obj
     * @returns {boolean}
     */
    xblocks.isPlainObject = function(obj) {
        if (xblocks.type(obj) !== 'object' || obj.nodeType || xblocks.isWindow(obj)) {
            return false;
        }

        if (obj.constructor && !obj.constructor.prototype.hasOwnProperty('isPrototypeOf')) {
            return false;
        }

        return true;
    };

    xblocks.isWindow = function(obj) {
        return obj != null && obj === obj.window;
    };

    /**
     * @param {*} x
     * @param {*} y
     * @returns {boolean}
     */
    xblocks.equals = function(x, y) {
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

            if (!xblocks.equals(x[p], y[p])) {
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
    xblocks.isEmptyObject = function(obj) {
        if (xblocks.type(obj) !== 'object') {
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
    xblocks.filterObject = function(from, callback) {
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
    xblocks.mapObject = function(from, callback) {
        var out = {};

        Object.keys(from).forEach(function(property) {
            var descr = Object.getOwnPropertyDescriptor(from, property);
            var map = callback && callback(property, descr);
            if (xblocks.type(map) === 'object') {
                Object.defineProperty(out, map.name, map.descr);
            }
        });

        return out;
    };

}(xblocks));
