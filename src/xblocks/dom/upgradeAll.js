/* global xblocks, global, __noop */
/* jshint strict: false */

xblocks.dom.upgradeAll = (function() {
    if (global.CustomElements && typeof(global.CustomElements.upgradeAll) === 'function') {
        return global.CustomElements.upgradeAll;

    } else {
        return __noop;
    }
}());
