/* global xblocks, global, CustomEventCommon */
/* jshint strict: false */

/**
 * @namespace
 */
xblocks.event = xblocks.event || {};

/**
 * @constructor
 */
xblocks.event.Custom = (function() {
    if (xblocks.utils.pristine('CustomEvent')) {
        return global.CustomEvent;
    }

    return (function() {
        /*! borschik:include:../polyfills/CustomEventCommon.js */
        return CustomEventCommon;
    }());
}());

/**
 * @param {HTMLElement} element
 * @param {string} name
 * @param {object} params
 */
xblocks.event.dispatch = function(element, name, params) {
    element.dispatchEvent(new xblocks.event.Custom(name, params));
};
