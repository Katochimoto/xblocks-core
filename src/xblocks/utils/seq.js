/* global xblocks */
/* jshint strict: false */

/**
 * @param {*} param
 * @returns {string}
 */
xblocks.utils.seq = (function() {
    var i = 0;
    return function() {
        return ++i;
    };
}());
