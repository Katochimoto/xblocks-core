/* global xblocks, global */
/* jshint strict: false */

/**
 * @param {*} param
 * @returns {string}
 */
xblocks.utils.type = function(param) {
    if (param === null) {
        return 'null';
    }

    if (typeof(param) === 'undefined') {
        return 'undefined';
    }

    return Object.prototype.toString.call(param).match(xblocks.utils.REG_TYPE_EXTRACT)[1].toLowerCase();
};
