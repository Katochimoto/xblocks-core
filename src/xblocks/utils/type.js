/* global xblocks, global */
/* jshint strict: false */

/**
 * @param {*} param
 * @returns {string}
 */
xblocks.utils.type = function(param) {
    return Object.prototype.toString.call(param).match(xblocks.utils.REG_TYPE_EXTRACT)[1].toLowerCase();
};
