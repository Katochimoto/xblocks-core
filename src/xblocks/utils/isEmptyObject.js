/* global xblocks, global */
/* jshint strict: false */

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
