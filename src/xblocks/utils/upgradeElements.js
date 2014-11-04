/* global xblocks, global */
/* jshint strict: false */

xblocks.utils.upgradeElements = (function() {
    if (global.CustomElements && typeof(global.CustomElements.upgradeAll) === 'function') {
        return global.CustomElements.upgradeAll;

    } else {
        return function() {};
    }
}());
