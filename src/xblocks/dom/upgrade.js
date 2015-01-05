/* global xblocks, global, __noop */
/* jshint strict: false */

xblocks.dom.upgrade = (function() {
    if (global.CustomElements && typeof(global.CustomElements.upgrade) === 'function') {
        return global.CustomElements.upgrade;

    } else {
        return __noop;
    }
}());
