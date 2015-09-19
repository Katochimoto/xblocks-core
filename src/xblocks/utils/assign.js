'use strict';

var mergeBase = require('utils/mergeBase');

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
module.exports = function () {
    return mergeBase.call(this, utilsAssignCheckCopy, arguments);
};

function utilsAssignCheckCopy() {
    return true;
}
