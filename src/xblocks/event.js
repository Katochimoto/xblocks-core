/* global xblocks, global */
/* jshint strict: false */

/**
 * @namespace
 */
xblocks.event = xblocks.event || {};

/**
 * @constructor
 */
xblocks.event.Custom = (function() {
    if (!xblocks.utils.pristine('CustomEvent')) {
        var CustomEvent = function(event, params) {
            params = params || {};
            var evt = global.document.createEvent('CustomEvent');
            evt.initCustomEvent(event, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
            return evt;
        };

        CustomEvent.prototype = global.Event.prototype;

        return CustomEvent;

    } else {
        return global.CustomEvent;
    }
}());

/**
 * @param {HTMLElement} element
 * @param {string} name
 * @param {object} params
 */
xblocks.event.dispatch = function(element, name, params) {
    element.dispatchEvent(new xblocks.event.Custom(name, params));
};
