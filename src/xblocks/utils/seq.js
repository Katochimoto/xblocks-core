/* global xblocks */
/* jshint strict: false */

/**
 * @returns {number}
 */
xblocks.utils.seq = (function() {
    var i = 0;
    return function() {
        return ++i;
    };
}());
