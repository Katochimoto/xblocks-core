'use strict';

var type = require('./type');

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
