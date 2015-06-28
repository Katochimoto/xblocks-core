/* global xblocks, _utilsMerge */
/* jshint strict: false */

var _utilsAssignCheckCopy = function() {
    return true;
};

/**
 * Combining objects with undefined params
 *
 * @example
 * xblocks.utils.assign({}, { a: 1, b: undefined }, { a: undefined, c: undefined })
 * // { a: undefined, b: undefined, c: undefined }
 *
 * @returns {object}
 */
xblocks.utils.assign = function() {
    return _utilsMerge.call(this, _utilsAssignCheckCopy, arguments);
};
