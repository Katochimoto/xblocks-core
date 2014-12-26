/* global xblocks, global */
/* jshint strict: false */

xblocks.dom.upgradeElement = (function() {
    if (global.CustomElements && typeof(global.CustomElements.upgrade) === 'function') {
        return global.CustomElements.upgrade;

    } else {
        return function() {};
    }
}());
