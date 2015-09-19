'use strict';

var type = require('utils/type');

/**
 * @param {*} x
 * @param {*} y
 * @returns {boolean}
 * @private
 */
var equal = {
    'array': function (x, y) {
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

    'object': function (x, y) {
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

    'date': function (x, y) {
        return x.getTime() === y.getTime();
    },

    'regexp': function (x, y) {
        return x.toString() === y.toString();
    },

    'function': function (x, y) {
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

    /* eslint eqeqeq:0 */
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
