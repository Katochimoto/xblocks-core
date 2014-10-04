/* global xblocks, global */
/* jshint strict: false */

xblocks.dom.index = function(selector, element, context) {
    return Array.prototype.indexOf.call((context || global.document).querySelectorAll(selector), element);
};
