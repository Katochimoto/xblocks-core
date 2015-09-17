'use strict';

var mergeBase = require('./mergeBase');

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
module.exports = function () {
    return mergeBase.call(this, utilsMergeCheckCopy, arguments);
};

function utilsMergeCheckCopy(value) {
    return (value !== undefined);
}
